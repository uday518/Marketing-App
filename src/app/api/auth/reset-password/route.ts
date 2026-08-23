import { NextResponse } from 'next/server';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { connectToDatabase } from '@/lib/db';
import { PasswordResetToken, User } from '@/lib/models';
import { strongPassword } from '@/lib/validations';

const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Token is required'),
  password: strongPassword,
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = resetPasswordSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? 'Invalid input' },
      { status: 400 },
    );
  }

  await connectToDatabase();

  const tokenHash = crypto.createHash('sha256').update(parsed.data.token).digest('hex');
  const record = await PasswordResetToken.findOne({
    tokenHash,
    expiresAt: { $gt: new Date() },
  });

  if (!record) {
    return NextResponse.json(
      { error: 'This reset link is invalid or has expired.' },
      { status: 400 },
    );
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, 10);
  await User.updateOne(
    { _id: record.userId },
    { passwordHash, passwordChangedAt: new Date() },
  );
  await PasswordResetToken.deleteOne({ _id: record._id });

  return NextResponse.json({ message: 'Password updated. You can now sign in.' });
}