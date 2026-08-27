import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { User } from '@/models/User';
import { strongPassword } from '@/lib/validations';

const updateStaffSchema = z.object({
  name: z.string().min(1, 'Name is required').trim().optional(),

  email: z
    .string()
    .email('Enter a valid email')
    .trim()
    .optional(),

  role: z
    .enum(['manager', 'dentist', 'receptionist'], {
      message: 'Invalid role',
    })
    .optional(),

  password: strongPassword.optional(),
});

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 },
    );
  }

  if (session.user.role !== 'owner') {
    return NextResponse.json(
      {
        error: 'Only the clinic admin can edit staff',
      },
      { status: 403 },
    );
  }

  if (!session.user.clinicId) {
    return NextResponse.json(
      {
        error: 'No clinic associated with this account',
      },
      { status: 403 },
    );
  }

  const { id } = await params;

  if (!mongoose.isValidObjectId(id)) {
    return NextResponse.json(
      { error: 'Invalid staff id' },
      { status: 400 },
    );
  }

  const body = await request.json().catch(() => null);

  const parsed = updateStaffSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error:
          parsed.error.issues[0]?.message ??
          'Invalid input',
      },
      { status: 400 },
    );
  }

  await connectToDatabase();

  const target = await User.findOne({
    _id: id,
    clinicId: session.user.clinicId,
  });

  if (!target) {
    return NextResponse.json(
      { error: 'Staff member not found' },
      { status: 404 },
    );
  }

  // Don't allow the owner account to be modified
  // through the staff management endpoint.
  if (target.role === 'owner') {
    return NextResponse.json(
      {
        error: 'The clinic admin cannot be modified here',
      },
      { status: 400 },
    );
  }

  const { name, email, role, password } = parsed.data;

  if (email) {
    const normalizedEmail = email.toLowerCase().trim();

    const existing = await User.findOne({
      email: normalizedEmail,
      _id: { $ne: id },
    });

    if (existing) {
      return NextResponse.json(
        {
          error: 'A user with this email already exists',
        },
        { status: 409 },
      );
    }

    target.email = normalizedEmail;
  }

  if (name !== undefined) {
    target.name = name;
  }

  if (role !== undefined) {
    target.role = role;
  }

  if (password) {
    target.passwordHash = await bcrypt.hash(password, 10);
    target.passwordChangedAt = new Date();
  }

  await target.save();

  return NextResponse.json({
    id: target._id.toString(),
    name: target.name,
    email: target.email,
    role: target.role,
  });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 },
    );
  }

  if (session.user.role !== 'owner') {
    return NextResponse.json(
      {
        error: 'Only the clinic admin can remove staff',
      },
      { status: 403 },
    );
  }

  if (!session.user.clinicId) {
    return NextResponse.json(
      {
        error: 'No clinic associated with this account',
      },
      { status: 403 },
    );
  }

  const { id } = await params;

  if (!mongoose.isValidObjectId(id)) {
    return NextResponse.json(
      { error: 'Invalid staff id' },
      { status: 400 },
    );
  }

  await connectToDatabase();

  const target = await User.findOne({
    _id: id,
    clinicId: session.user.clinicId,
  });

  if (!target) {
    return NextResponse.json(
      { error: 'Staff member not found' },
      { status: 404 },
    );
  }

  if (target.role === 'owner') {
    return NextResponse.json(
      {
        error: 'You cannot remove the clinic admin',
      },
      { status: 400 },
    );
  }

  await User.deleteOne({
    _id: id,
    clinicId: session.user.clinicId,
  });

  return NextResponse.json({
    ok: true,
  });
}