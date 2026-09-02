import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { Patient } from '@/models/Patient';
import { Clinic } from '@/models/Clinic';

const patientSchema = z.object({
  fullName: z.string().min(1, 'Full name is required').trim(),

  dob: z
    .string()
    .optional()
    .nullable()
    .transform((value) => (value ? new Date(value) : null)),

  phone: z.string().default(''),

  email: z
    .string()
    .email('Enter a valid email')
    .or(z.literal(''))
    .default(''),

  address: z.string().default(''),

  medicalHistory: z
    .array(
      z.object({
        condition: z.string(),
        notes: z.string().optional().default(''),
      }),
    )
    .default([]),

  insurance: z.string().default(''),
});

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 },
      );
    }

    await connectToDatabase();

    let clinicId = session.user.clinicId;
    if (!clinicId) {
      let fromDb = await Clinic.findOne().lean();
      if (!fromDb) {
        fromDb = await Clinic.create({ name: 'Default Test Clinic' });
      }
      clinicId = fromDb._id.toString();
    }

    const patients = await Patient.find({
      clinicId: clinicId,
    })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(patients);
  } catch (error) {
    console.error('GET /api/patients error:', error);

    return NextResponse.json(
      { error: 'Failed to fetch patients' },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 },
      );
    }

    const body = await request.json().catch(() => null);

    const parsed = patientSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error:
            parsed.error.issues[0]?.message ?? 'Invalid input',
        },
        { status: 400 },
      );
    }

    await connectToDatabase();

    let clinicId = session.user.clinicId;
    if (!clinicId) {
      let fromDb = await Clinic.findOne().lean();
      if (!fromDb) {
        fromDb = await Clinic.create({ name: 'Default Test Clinic' });
      }
      clinicId = fromDb._id.toString();
    }

    const patient = await Patient.create({
      ...parsed.data,
      clinicId: clinicId,
    });

    return NextResponse.json(patient, { status: 201 });
  } catch (error) {
    console.error('POST /api/patients error:', error);

    return NextResponse.json(
      { error: 'Failed to create patient' },
      { status: 500 },
    );
  }
}