import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import mongoose from 'mongoose';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { Patient } from '@/lib/models';

const updatePatientSchema = z.object({
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

type RouteContext = {
    params: Promise<{ id: string }>;
};

async function getAuthorizedPatient(id: string) {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        return {
            error: NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 },
            ),
        };
    }

    if (!session.user.clinicId) {
        return {
            error: NextResponse.json(
                { error: 'No clinic associated with this account' },
                { status: 403 },
            ),
        };
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return {
            error: NextResponse.json(
                { error: 'Invalid patient ID' },
                { status: 400 },
            ),
        };
    }

    await connectToDatabase();

    const patient = await Patient.findOne({
        _id: id,
        clinicId: session.user.clinicId,
    });

    if (!patient) {
        return {
            error: NextResponse.json(
                { error: 'Patient not found' },
                { status: 404 },
            ),
        };
    }

    return { session, patient };
}

export async function GET(
    _request: Request,
    context: RouteContext,
) {
    try {
        const { id } = await context.params;

        const result = await getAuthorizedPatient(id);

        if ('error' in result) {
            return result.error;
        }

        return NextResponse.json(result.patient);
    } catch (error) {
        console.error('GET /api/patients/[id] error:', error);

        return NextResponse.json(
            { error: 'Failed to fetch patient' },
            { status: 500 },
        );
    }
}

export async function PATCH(
    request: Request,
    context: RouteContext,
) {
    try {
        const { id } = await context.params;

        const result = await getAuthorizedPatient(id);

        if ('error' in result) {
            return result.error;
        }

        const body = await request.json().catch(() => null);

        const parsed = updatePatientSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                {
                    error:
                        parsed.error.issues[0]?.message ?? 'Invalid input',
                },
                { status: 400 },
            );
        }

        result.patient.set(parsed.data);

        await result.patient.save();

        return NextResponse.json(result.patient);
    } catch (error) {
        console.error('PATCH /api/patients/[id] error:', error);

        return NextResponse.json(
            { error: 'Failed to update patient' },
            { status: 500 },
        );
    }
}

export async function DELETE(
    _request: Request,
    context: RouteContext,
) {
    try {
        const { id } = await context.params;

        const result = await getAuthorizedPatient(id);

        if ('error' in result) {
            return result.error;
        }

        await Patient.deleteOne({
            _id: result.patient._id,
            clinicId: result.session.user.clinicId,
        });

        return NextResponse.json({
            success: true,
            message: 'Patient deleted successfully',
        });
    } catch (error) {
        console.error('DELETE /api/patients/[id] error:', error);

        return NextResponse.json(
            { error: 'Failed to delete patient' },
            { status: 500 },
        );
    }
}