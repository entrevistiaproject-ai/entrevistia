import { NextResponse } from 'next/server';
import { db } from '@/db/client';
import { entrevistas } from '@/db/schema';

export async function GET() {
  try {
    const lista = await db.select().from(entrevistas).limit(10);

    const info = lista.map(e => ({
      id: e.id,
      titulo: e.titulo,
      slug: e.slug,
      status: e.status,
      link: e.slug ? `http://localhost:3000/entrevista/${e.slug}` : null,
    }));

    return NextResponse.json({
      total: lista.length,
      entrevistas: info,
      comSlug: lista.filter(e => e.slug).length,
      semSlug: lista.filter(e => !e.slug).length,
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
