import { NextResponse } from "next/server";
import { clearAdminCookie } from "@/lib/auth/admin-auth";

export async function POST() {
  try {
    await clearAdminCookie();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro no logout admin:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
