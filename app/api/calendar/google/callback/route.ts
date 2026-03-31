import { NextRequest, NextResponse } from "next/server";
import { exchangeCode, saveTokens } from "@/lib/calendar/google-calendar";

/**
 * GET /api/calendar/google/callback
 * Callback do Google OAuth para calendário
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state"); // userId
  const error = searchParams.get("error");

  if (error) {
    return NextResponse.redirect(
      new URL(`/agenda?error=google_denied`, request.url)
    );
  }

  if (!code || !state) {
    return NextResponse.redirect(
      new URL(`/agenda?error=missing_params`, request.url)
    );
  }

  try {
    const tokens = await exchangeCode(code);

    if (!tokens.access_token || !tokens.refresh_token) {
      return NextResponse.redirect(
        new URL(`/agenda?error=no_tokens`, request.url)
      );
    }

    await saveTokens(
      state, // userId
      tokens.access_token,
      tokens.refresh_token,
      new Date(tokens.expiry_date || Date.now() + 3600 * 1000),
    );

    return NextResponse.redirect(
      new URL(`/agenda?success=google_connected`, request.url)
    );
  } catch (err) {
    console.error("Erro ao trocar código OAuth:", err);
    return NextResponse.redirect(
      new URL(`/agenda?error=exchange_failed`, request.url)
    );
  }
}
