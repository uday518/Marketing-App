import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { User } from '@/lib/models';

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (session.user.role !== 'owner') {
    return NextResponse.json({ error: 'Only the clinic admin can remove staff' }, { status: 403 });
  }

  const { id } = await params;

  if (!mongoose.isValidObjectId(id)) {
    return NextResponse.json({ error: 'Invalid staff id' }, { status: 400 });
  }

  await connectToDatabase();

  const target = await User.findOne({ _id: id, clinicId: session.user.clinicId });

  if (!target) {
    return NextResponse.json({ error: 'Staff member not found' }, { status: 404 });
  }
  if (target.role === 'owner') {
    return NextResponse.json({ error: 'You cannot remove the clinic admin' }, { status: 400 });
  }

  await User.deleteOne({ _id: id });

  return NextResponse.json({ ok: true });
}