import { NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/db';
import { Patient } from '@/models/Patient';
import { strongPassword } from '@/lib/validations';

const patientRegisterSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Enter a valid email'),
  phone: z.string().optional().default(''),
  password: strongPassword,
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = patientRegisterSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? 'Invalid input' },
      { status: 400 },
    );
  }

  const { fullName, email, phone, password } = parsed.data;

  await connectToDatabase();

  const existing = await Patient.findOne({ email: email.toLowerCase() }).select('+password');

  if (existing) {
    if (existing.password) {
      return NextResponse.json(
        { error: 'An account already exists for this email' },
        { status: 409 },
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);
    existing.password = passwordHash;
    if (fullName) existing.fullName = fullName;
    if (phone) existing.phone = phone;
    await existing.save();

    return NextResponse.json(
      { id: existing._id.toString(), linked: true },
      { status: 201 },
    );
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const patient = await Patient.create({
    fullName,
    email,
    phone,
    password: passwordHash,
  });

  return NextResponse.json(
    { id: patient._id.toString(), linked: false },
    { status: 201 },
  );
}