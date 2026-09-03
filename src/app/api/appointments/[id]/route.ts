import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import mongoose from 'mongoose';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { Appointment, Patient, User } from '@/lib/models';

const updateAppointmentSchema = z.object({
    patientId: z
        .string()
        .min(1)
        .optional(),

    dentistId: z
        .string()
        .nullable()
        .optional(),

    dateTime: z
        .coerce
        .date()
        .optional(),

    status: z
        .enum([
            'scheduled',
            'checked-in',
            'in-room',
            'completed',
            'cancelled',
            'no-show',
        ])
        .optional(),

    notes: z
        .string()
        .optional(),
});

export async function GET(
    _request: Request,
    {
        params,
    }: {
        params: Promise<{ id: string }>;
    },
) {
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

        const { id } = await params;

        if (!mongoose.isValidObjectId(id)) {
            return NextResponse.json(
                { error: 'Invalid appointment id' },
                { status: 400 },
            );
        }

        await connectToDatabase();

        const appointment = await Appointment.findOne({
            _id: id,
            clinicId: session.user.clinicId,
        })
            .populate('patientId', 'fullName phone email dob')
            .populate('dentistId', 'name email role')
            .lean();

        if (!appointment) {
            return NextResponse.json(
                { error: 'Appointment not found' },
                { status: 404 },
            );
        }

        return NextResponse.json(appointment);
    } catch (error) {
        console.error(
            'GET /api/appointments/[id] error:',
            error,
        );

        return NextResponse.json(
            { error: 'Failed to fetch appointment' },
            { status: 500 },
        );
    }
}

export async function PATCH(
    request: Request,
    {
        params,
    }: {
        params: Promise<{ id: string }>;
    },
) {
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

        const { id } = await params;

        if (!mongoose.isValidObjectId(id)) {
            return NextResponse.json(
                { error: 'Invalid appointment id' },
                { status: 400 },
            );
        }

        const body = await request.json().catch(() => null);

        const parsed =
            updateAppointmentSchema.safeParse(body);

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

        await connectToDatabase();

        const appointment = await Appointment.findOne({
            _id: id,
            clinicId: session.user.clinicId,
        });

        if (!appointment) {
            return NextResponse.json(
                { error: 'Appointment not found' },
                { status: 404 },
            );
        }

        const {
            patientId,
            dentistId,
            dateTime,
            status,
            notes,
        } = parsed.data;

        // Validate patient if being changed.
        if (patientId !== undefined) {
            const patient = await Patient.findOne({
                _id: patientId,
                clinicId: session.user.clinicId,
            });

            if (!patient) {
                return NextResponse.json(
                    {
                        error: 'Patient not found in this clinic',
                    },
                    { status: 404 },
                );
            }

            appointment.patientId = patient._id;
        }

        // Validate dentist if being changed.
        if (dentistId !== undefined) {
            if (dentistId === null) {
                appointment.dentistId = null;
            } else {
                const dentist = await User.findOne({
                    _id: dentistId,
                    clinicId: session.user.clinicId,
                    role: 'dentist',
                });

                if (!dentist) {
                    return NextResponse.json(
                        {
                            error: 'Dentist not found in this clinic',
                        },
                        { status: 404 },
                    );
                }

                appointment.dentistId = dentist._id;
            }
        }

        if (dateTime !== undefined) {
            appointment.dateTime = dateTime;
        }

        if (status !== undefined) {
            appointment.status = status;
        }

        if (notes !== undefined) {
            appointment.notes = notes;
        }

        await appointment.save();

        const updatedAppointment =
            await Appointment.findById(appointment._id)
                .populate(
                    'patientId',
                    'fullName phone email',
                )
                .populate(
                    'dentistId',
                    'name email role',
                )
                .lean();

        return NextResponse.json(updatedAppointment);
    } catch (error) {
        console.error(
            'PATCH /api/appointments/[id] error:',
            error,
        );

        return NextResponse.json(
            { error: 'Failed to update appointment' },
            { status: 500 },
        );
    }
}

export async function DELETE(
    _request: Request,
    {
        params,
    }: {
        params: Promise<{ id: string }>;
    },
) {
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

        const { id } = await params;

        if (!mongoose.isValidObjectId(id)) {
            return NextResponse.json(
                { error: 'Invalid appointment id' },
                { status: 400 },
            );
        }

        await connectToDatabase();

        const appointment =
            await Appointment.findOneAndUpdate(
                {
                    _id: id,
                    clinicId: session.user.clinicId,
                },
                {
                    $set: {
                        status: 'cancelled',
                    },
                },
                {
                    new: true,
                },
            )
                .populate(
                    'patientId',
                    'fullName phone email',
                )
                .populate(
                    'dentistId',
                    'name email role',
                )
                .lean();

        if (!appointment) {
            return NextResponse.json(
                { error: 'Appointment not found' },
                { status: 404 },
            );
        }

        return NextResponse.json({
            message: 'Appointment cancelled successfully',
            appointment,
        });
    } catch (error) {
        console.error(
            'DELETE /api/appointments/[id] error:',
            error,
        );

        return NextResponse.json(
            { error: 'Failed to cancel appointment' },
            { status: 500 },
        );
    }
}