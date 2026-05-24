import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getAdminDb } from '@/lib/firebaseAdmin';

const leadSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(160).optional().or(z.literal('')),
  phone: z.string().trim().min(7).max(40).optional().or(z.literal('')),
  projectType: z.string().trim().min(2).max(120),
  message: z.string().trim().min(5).max(2000),
  budget: z.string().trim().max(100).optional(),
}).refine(data => (data.email && data.email.length > 0) || (data.phone && data.phone.length > 0), {
  message: "Debe proporcionar al menos un Email o un número de WhatsApp",
  path: ["email"],
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const lead = leadSchema.parse(body);
    const db = getAdminDb();

    const doc = await db.collection('leads').add({
      ...lead,
      source: 'jv-studio-web',
      status: 'new',
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true, id: doc.id });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ ok: false, error: 'Datos inválidos', issues: error.issues }, { status: 400 });
    }

    const message = error instanceof Error ? error.message : 'Error interno';
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
