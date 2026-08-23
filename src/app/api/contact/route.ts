import { NextResponse } from 'next/server';
import { z } from 'zod';
import { connectToDatabase } from '@/lib/db';
import { ContactMessage } from '@/lib/models';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Enter a valid email'),
  phone: z.string().optional().default(''),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? 'Invalid input' },
      { status: 400 },
    );
  }

  await connectToDatabase();

  const message = await ContactMessage.create(parsed.data);

  console.log(`[contact] new message from ${message.email} (${message.subject})`);
  // TODO: forward this to the clinic inbox (e.g. Resend / email provider)

  return NextResponse.json({ ok: true }, { status: 201 });
}