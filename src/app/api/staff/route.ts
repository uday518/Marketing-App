import { NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { User } from '@/lib/models';

const staffSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['manager', 'dentist', 'receptionist'], { message: 'Invalid role' }),
});

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (session.user.role !== 'owner') {
    return NextResponse.json({ error: 'Only the clinic admin can view staff' }, { status: 403 });
  }

  await connectToDatabase();

  const staff = await User.find({
    clinicId: session.user.clinicId,
    role: { $ne: 'owner' },
  })
    .select('name email role createdAt')
    .sort({ createdAt: 1 })
    .lean();

  return NextResponse.json({ staff });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (session.user.role !== 'owner') {
    return NextResponse.json(
      { error: 'Only the clinic admin can create staff accounts' },
      { status: 403 },
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = staffSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? 'Invalid input' },
      { status: 400 },
    );
  }

  const { name, email, password, role } = parsed.data;

  await connectToDatabase();

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    return NextResponse.json(
      { error: 'A user with this email already exists' },
      { status: 409 },
    );
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    passwordHash,
    role,
    clinicId: session.user.clinicId,
  });

  return NextResponse.json({ id: user._id.toString() }, { status: 201 });
}