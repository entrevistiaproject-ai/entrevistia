import { getDB } from "@/lib/db";
import { googleCalendarTokens } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_CALENDAR_API = "https://www.googleapis.com/calendar/v3";

const SCOPES = [
  "https://www.googleapis.com/auth/calendar",
  "https://www.googleapis.com/auth/calendar.events",
];

function getClientId() {
  return process.env.GOOGLE_CALENDAR_CLIENT_ID || process.env.AUTH_GOOGLE_ID || "";
}

function getClientSecret() {
  return process.env.GOOGLE_CALENDAR_CLIENT_SECRET || process.env.AUTH_GOOGLE_SECRET || "";
}

function getRedirectUri() {
  return `${process.env.NEXTAUTH_URL}/api/calendar/google/callback`;
}

/**
 * Gera URL de autorização para Google Calendar
 */
export function getAuthUrl(state: string): string {
  const params = new URLSearchParams({
    client_id: getClientId(),
    redirect_uri: getRedirectUri(),
    response_type: "code",
    scope: SCOPES.join(" "),
    access_type: "offline",
    prompt: "consent",
    state,
  });

  return `${GOOGLE_AUTH_URL}?${params.toString()}`;
}

/**
 * Troca o código de autorização por tokens
 */
export async function exchangeCode(code: string): Promise<{
  access_token: string;
  refresh_token: string;
  expiry_date: number;
}> {
  const response = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: getClientId(),
      client_secret: getClientSecret(),
      redirect_uri: getRedirectUri(),
      grant_type: "authorization_code",
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Google OAuth error: ${data.error_description || data.error}`);
  }

  return {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expiry_date: Date.now() + data.expires_in * 1000,
  };
}

/**
 * Renova o access token usando o refresh token
 */
async function refreshAccessToken(refreshToken: string): Promise<{
  access_token: string;
  expiry_date: number;
}> {
  const response = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      refresh_token: refreshToken,
      client_id: getClientId(),
      client_secret: getClientSecret(),
      grant_type: "refresh_token",
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Token refresh error: ${data.error_description || data.error}`);
  }

  return {
    access_token: data.access_token,
    expiry_date: Date.now() + data.expires_in * 1000,
  };
}

/**
 * Salva tokens do Google Calendar no banco
 */
export async function saveTokens(
  userId: string,
  accessToken: string,
  refreshToken: string,
  expiresAt: Date,
  email?: string
) {
  const db = getDB();

  const [existing] = await db
    .select()
    .from(googleCalendarTokens)
    .where(eq(googleCalendarTokens.userId, userId));

  if (existing) {
    await db
      .update(googleCalendarTokens)
      .set({ accessToken, refreshToken, expiresAt, email, updatedAt: new Date() })
      .where(eq(googleCalendarTokens.userId, userId));
  } else {
    await db.insert(googleCalendarTokens).values({
      userId,
      accessToken,
      refreshToken,
      expiresAt,
      email,
    });
  }
}

/**
 * Obtém um access token válido para o usuário
 */
async function getValidAccessToken(userId: string): Promise<string | null> {
  const db = getDB();

  const [tokens] = await db
    .select()
    .from(googleCalendarTokens)
    .where(eq(googleCalendarTokens.userId, userId));

  if (!tokens) return null;

  // Se o token expirou, renova
  if (tokens.expiresAt < new Date()) {
    try {
      const refreshed = await refreshAccessToken(tokens.refreshToken);
      await saveTokens(
        userId,
        refreshed.access_token,
        tokens.refreshToken,
        new Date(refreshed.expiry_date),
        tokens.email ?? undefined
      );
      return refreshed.access_token;
    } catch {
      // Token inválido - remove do banco
      await db.delete(googleCalendarTokens).where(eq(googleCalendarTokens.userId, userId));
      return null;
    }
  }

  return tokens.accessToken;
}

/**
 * Faz uma requisição autenticada à Google Calendar API
 */
async function calendarFetch(
  userId: string,
  path: string,
  options: RequestInit = {}
): Promise<Response> {
  const accessToken = await getValidAccessToken(userId);
  if (!accessToken) {
    throw new Error("Google Calendar não conectado");
  }

  return fetch(`${GOOGLE_CALENDAR_API}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
}

/**
 * Verifica se o usuário tem Google Calendar conectado
 */
export async function isCalendarConnected(userId: string): Promise<boolean> {
  const db = getDB();
  const [tokens] = await db
    .select({ id: googleCalendarTokens.id })
    .from(googleCalendarTokens)
    .where(eq(googleCalendarTokens.userId, userId));
  return !!tokens;
}

/**
 * Desconecta o Google Calendar
 */
export async function disconnectCalendar(userId: string): Promise<void> {
  const db = getDB();
  await db.delete(googleCalendarTokens).where(eq(googleCalendarTokens.userId, userId));
}

export interface CalendarEvent {
  summary: string;
  description?: string;
  start: Date;
  end: Date;
  timeZone?: string;
  location?: string;
  attendees?: string[];
  meetLink?: boolean;
}

/**
 * Cria um evento no Google Calendar
 */
export async function createEvent(
  userId: string,
  event: CalendarEvent
): Promise<{ eventId: string; meetLink?: string } | null> {
  const timeZone = event.timeZone || "America/Sao_Paulo";

  const body: Record<string, unknown> = {
    summary: event.summary,
    description: event.description,
    start: { dateTime: event.start.toISOString(), timeZone },
    end: { dateTime: event.end.toISOString(), timeZone },
    location: event.location,
    attendees: event.attendees?.map((email) => ({ email })),
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 1440 },
        { method: "popup", minutes: 60 },
        { method: "popup", minutes: 15 },
      ],
    },
  };

  if (event.meetLink) {
    body.conferenceData = {
      createRequest: {
        requestId: `entrevistia-${Date.now()}`,
        conferenceSolutionKey: { type: "hangoutsMeet" },
      },
    };
  }

  try {
    const conferenceParam = event.meetLink ? "&conferenceDataVersion=1" : "";
    const response = await calendarFetch(
      userId,
      `/calendars/primary/events?sendUpdates=all${conferenceParam}`,
      { method: "POST", body: JSON.stringify(body) }
    );

    if (!response.ok) return null;

    const data = await response.json();
    const videoEntry = data.conferenceData?.entryPoints?.find(
      (e: { entryPointType: string }) => e.entryPointType === "video"
    );

    return {
      eventId: data.id,
      meetLink: videoEntry?.uri,
    };
  } catch {
    return null;
  }
}

/**
 * Atualiza um evento no Google Calendar
 */
export async function updateEvent(
  userId: string,
  eventId: string,
  event: Partial<CalendarEvent>
): Promise<boolean> {
  const timeZone = event.timeZone || "America/Sao_Paulo";
  const body: Record<string, unknown> = {};

  if (event.summary) body.summary = event.summary;
  if (event.description !== undefined) body.description = event.description;
  if (event.location !== undefined) body.location = event.location;
  if (event.start) body.start = { dateTime: event.start.toISOString(), timeZone };
  if (event.end) body.end = { dateTime: event.end.toISOString(), timeZone };
  if (event.attendees) body.attendees = event.attendees.map((email) => ({ email }));

  try {
    const response = await calendarFetch(
      userId,
      `/calendars/primary/events/${eventId}?sendUpdates=all`,
      { method: "PATCH", body: JSON.stringify(body) }
    );
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Cancela um evento no Google Calendar
 */
export async function deleteEvent(userId: string, eventId: string): Promise<boolean> {
  try {
    const response = await calendarFetch(
      userId,
      `/calendars/primary/events/${eventId}?sendUpdates=all`,
      { method: "DELETE" }
    );
    return response.ok || response.status === 404;
  } catch {
    return false;
  }
}

/**
 * Busca horários ocupados do calendário
 */
export async function getFreeBusy(
  userId: string,
  timeMin: Date,
  timeMax: Date
): Promise<{ start: string; end: string }[]> {
  try {
    const response = await calendarFetch(userId, "/freeBusy", {
      method: "POST",
      body: JSON.stringify({
        timeMin: timeMin.toISOString(),
        timeMax: timeMax.toISOString(),
        items: [{ id: "primary" }],
      }),
    });

    if (!response.ok) return [];

    const data = await response.json();
    return (data.calendars?.primary?.busy || []) as { start: string; end: string }[];
  } catch {
    return [];
  }
}
