import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { Clinic } from '@/models/Clinic';
import { Patient } from '@/models/Patient';
import { User } from '@/models/User';

const updateClinicSchema = z.object({
  name: z.string().min(1, 'Clinic name is required').trim(),

  locations: z
    .array(
      z.object({
        name: z.string().default(''),
        address: z.string().default(''),
        city: z.string().default(''),
      }),
    )
    .default([]),
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

    const clinic = await Clinic.findById(
      session.user.clinicId,
    ).lean();

    if (!clinic) {
      return NextResponse.json(
        { error: 'Clinic not found' },
        { status: 404 },
      );
    }

    const [staffCount, patientCount] = await Promise.all([
      User.countDocuments({
        clinicId: session.user.clinicId,
        role: { $ne: 'owner' },
      }),

      Patient.countDocuments({
        clinicId: session.user.clinicId,
      }),
    ]);

    return NextResponse.json({
      id: clinic._id.toString(),
      name: clinic.name,
      locations: clinic.locations,
      staffCount,
      patientCount,
      createdAt: clinic.createdAt,
    });
  } catch (error) {
    console.error('GET /api/clinic error:', error);

    return NextResponse.json(
      { error: 'Failed to fetch clinic information' },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
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

    // Only clinic owner/manager should edit clinic settings
    if (
      session.user.role !== 'owner' &&
      session.user.role !== 'manager'
    ) {
      return NextResponse.json(
        { error: 'You do not have permission to update clinic settings' },
        { status: 403 },
      );
    }

    const body = await request.json().catch(() => null);

    const parsed = updateClinicSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error:
            parsed.error.issues[0]?.message ??
            'Invalid clinic data',
        },
        { status: 400 },
      );
    }

    await connectToDatabase();

    const clinic = await Clinic.findOneAndUpdate(
      {
        _id: session.user.clinicId,
      },
      {
        $set: {
          name: parsed.data.name,
          locations: parsed.data.locations,
        },
      },
      {
        new: true,
        runValidators: true,
      },
    ).lean();

    if (!clinic) {
      return NextResponse.json(
        { error: 'Clinic not found' },
        { status: 404 },
      );
    }

    return NextResponse.json({
      id: clinic._id.toString(),
      name: clinic.name,
      locations: clinic.locations,
      updatedAt: clinic.updatedAt,
    });
  } catch (error) {
    console.error('PATCH /api/clinic error:', error);

    return NextResponse.json(
      { error: 'Failed to update clinic' },
      { status: 500 },
    );
  }
}