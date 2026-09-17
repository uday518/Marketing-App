import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { Patient, TreatmentPlan } from '@/lib/models';

const treatmentPlanSchema = z.object({
  patientId: z.string().min(1, 'Patient is required'),

  title: z.string().min(1, 'Treatment title is required'),

  status: z
    .enum(['draft', 'in-progress', 'accepted', 'completed'])
    .default('draft'),

  items: z
    .array(
      z.object({
        procedure: z.string().min(1, 'Procedure is required'),
        cost: z.coerce.number().min(0).default(0),
        priority: z.coerce.number().int().min(1).default(1),
      }),
    )
    .default([]),

  notes: z.string().default(''),
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

    if (!session.user.clinicId) {
      return NextResponse.json(
        { error: 'No clinic associated with this account' },
        { status: 403 },
      );
    }

    await connectToDatabase();

    const treatmentPlans = await TreatmentPlan.find({
      clinicId: session.user.clinicId,
    })
      .populate('patientId', 'fullName phone email')
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(treatmentPlans);
  } catch (error) {
    console.error('GET /api/treatment-plans error:', error);

    return NextResponse.json(
      { error: 'Failed to fetch treatment plans' },
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

    if (!session.user.clinicId) {
      return NextResponse.json(
        { error: 'No clinic associated with this account' },
        { status: 403 },
      );
    }

    const body = await request.json().catch(() => null);

    const parsed = treatmentPlanSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error:
            parsed.error.issues[0]?.message ??
            'Invalid treatment plan data',
        },
        { status: 400 },
      );
    }

    const {
      patientId,
      title,
      status,
      items,
      notes,
    } = parsed.data;

    const clinicId = session.user.clinicId;

    await connectToDatabase();

    // Make sure the patient belongs to this clinic.
    const patient = await Patient.findOne({
      _id: patientId,
      clinicId,
    });

    if (!patient) {
      return NextResponse.json(
        { error: 'Patient not found in this clinic' },
        { status: 404 },
      );
    }

    const treatmentPlan = await TreatmentPlan.create({
      patientId,
      clinicId,
      title,
      status,
      items,
      notes,
    });

    const populatedTreatmentPlan = await TreatmentPlan.findById(
      treatmentPlan._id,
    )
      .populate('patientId', 'fullName phone email')
      .lean();

    return NextResponse.json(
      populatedTreatmentPlan,
      { status: 201 },
    );
  } catch (error) {
    console.error('POST /api/treatment-plans error:', error);

    return NextResponse.json(
      { error: 'Failed to create treatment plan' },
      { status: 500 },
    );
  }
}