import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { Patient } from '@/lib/models';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await connectToDatabase();
    const patients = await Patient.find({ clinicId: id })
      .select('fullName email phone')
      .sort({ fullName: 1 })
      .lean();
    return NextResponse.json(patients);
  } catch (error) {
    console.error('GET /api/clinics/[id]/patients error:', error);
    return NextResponse.json({ error: 'Failed to fetch patients' }, { status: 500 });
  }
}
