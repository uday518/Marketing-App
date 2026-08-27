import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { Appointment, Patient, User } from '@/lib/models';

const appointmentSchema = z.object({
    patientId: z.string().min(1, 'Patient is required'),

    dentistId: z
        .string()
        .optional()
        .nullable()
        .default(null),

    dateTime: z.coerce.date({
        message: 'Valid appointment date and time is required',
    }),

    status: z
        .enum([
            'scheduled',
            'checked-in',
            'in-room',
            'completed',
            'cancelled',
            'no-show',
        ])
        .default('scheduled'),

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

        const appointments = await Appointment.find({
            clinicId: session.user.clinicId,
        })
            .populate('patientId', 'fullName phone email')
            .populate('dentistId', 'name email role')
            .sort({ dateTime: 1 })
            .lean();

        return NextResponse.json(appointments);
    } catch (error) {
        console.error('GET /api/appointments error:', error);

        return NextResponse.json(
            { error: 'Failed to fetch appointments' },
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

        const parsed = appointmentSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                {
                    error:
                        parsed.error.issues[0]?.message ??
                        'Invalid appointment data',
                },
                { status: 400 },
            );
        }

        const {
            patientId,
            dentistId,
            dateTime,
            status,
            notes,
        } = parsed.data;

        await connectToDatabase();

        // Make sure the patient belongs to this clinic.
        const patient = await Patient.findOne({
            _id: patientId,
            clinicId: session.user.clinicId,
        });

        if (!patient) {
            return NextResponse.json(
                { error: 'Patient not found in this clinic' },
                { status: 404 },
            );
        }

        // If a dentist was selected, make sure they belong
        // to this clinic and actually have the dentist role.
        if (dentistId) {
            const dentist = await User.findOne({
                _id: dentistId,
                clinicId: session.user.clinicId,
                role: 'dentist',
            });

            if (!dentist) {
                return NextResponse.json(
                    { error: 'Dentist not found in this clinic' },
                    { status: 404 },
                );
            }
        }

        const appointment = await Appointment.create({
            patientId,
            dentistId: dentistId || null,
            clinicId: session.user.clinicId,
            dateTime,
            status,
            notes,
        });

        const populatedAppointment = await Appointment.findById(
            appointment._id,
        )
            .populate('patientId', 'fullName phone email')
            .populate('dentistId', 'name email role')
            .lean();

        return NextResponse.json(
            populatedAppointment,
            { status: 201 },
        );
    } catch (error) {
        console.error('POST /api/appointments error:', error);

        return NextResponse.json(
            { error: 'Failed to create appointment' },
            { status: 500 },
        );
    }
}