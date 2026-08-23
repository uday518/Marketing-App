import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { Patient } from '@/lib/models';

const patientSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  dob: z
    .string()
    .optional()
    .nullable()
    .transform((value) => (value ? new Date(value) : null)),
  phone: z.string().default(''),
  email: z.string().email('Enter a valid email').or(z.literal('')).default(''),
  address: z.string().default(''),
  medicalHistory: z
    .array(z.object({ condition: z.string(), notes: z.string().optional().default('') }))
    .default([]),
  insurance: z.string().default(''),
  clinicId: z.string().optional().nullable().default(null),
});

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await connectToDatabase();
  const patients = await Patient.find().sort({ createdAt: -1 }).lean();

  return NextResponse.json(patients);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = patientSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? 'Invalid input' },
      { status: 400 },
    );
  }

  await connectToDatabase();
  const patient = await Patient.create(parsed.data);

  return NextResponse.json(patient, { status: 201 });
}
