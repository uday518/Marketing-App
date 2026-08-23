import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { z } from 'zod';
import { connectToDatabase } from '@/lib/db';
import { PasswordResetToken, User } from '@/lib/models';

const forgotPasswordSchema = z.object({
  email: z.string().email('Enter a valid email'),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = forgotPasswordSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? 'Invalid input' },
      { status: 400 },
    );
  }

  await connectToDatabase();

  const user = await User.findOne({ email: parsed.data.email.toLowerCase() });

  if (user) {
    const token = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await PasswordResetToken.create({ userId: user._id, tokenHash, expiresAt });

    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

    // TODO: send a real email here (e.g. Resend). Logging to the server
    // console so the flow is testable before an email provider is added.
    console.log(`[forgot-password] Reset link for ${user.email}: ${resetUrl}`);
  }

  // Always return the same message so attackers can't discover which
  // emails are registered.
  return NextResponse.json({
    message: 'If an account exists for that email, a reset link has been sent.',
  });
}