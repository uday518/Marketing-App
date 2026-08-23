import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { Clinic, Patient, User } from '@/lib/models';

export async function GET() {
  // 1. Check if user is logged in
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 2. Connect to MongoDB
  await connectToDatabase();

  // 3. Get the clinic this user belongs to
  const clinic = await Clinic.findById(session.user.clinicId).lean();

  if (!clinic) {
    return NextResponse.json({ error: 'Clinic not found' }, { status: 404 });
  }

  // 4. Count staff and patients in this clinic
  const [staffCount, patientCount] = await Promise.all([
    User.countDocuments({ clinicId: session.user.clinicId, role: { $ne: 'owner' } }),
    Patient.countDocuments({ clinicId: session.user.clinicId }),
  ]);

  // 5. Return clinic data
  return NextResponse.json({
    id: clinic._id.toString(),
    name: clinic.name,
    staffCount,
    patientCount,
    createdAt: clinic.createdAt,
  });
}