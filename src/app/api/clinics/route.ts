import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { Clinic } from '@/lib/models';

export async function GET() {
  try {
    await connectToDatabase();
    const clinics = await Clinic.find({}).select('name').sort({ name: 1 }).lean();
    return NextResponse.json(clinics);
  } catch (error) {
    console.error('GET /api/clinics error:', error);
    return NextResponse.json({ error: 'Failed to fetch clinics' }, { status: 500 });
  }
}
