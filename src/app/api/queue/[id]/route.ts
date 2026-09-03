import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { QueueEntry } from '@/lib/models';

const updateQueueSchema = z.object({
    status: z.enum([
        'waiting',
        'in-room',
        'completed',
    ]),
});

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
                { error: 'Invalid queue entry id' },
                { status: 400 },
            );
        }

        const body = await request.json().catch(() => null);

        const parsed =
            updateQueueSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                {
                    error:
                        parsed.error.issues[0]?.message ??
                        'Invalid queue status',
                },
                { status: 400 },
            );
        }

        await connectToDatabase();

        const entry = await QueueEntry.findOne({
            _id: id,
            clinicId: session.user.clinicId,
        });

        if (!entry) {
            return NextResponse.json(
                { error: 'Queue entry not found' },
                { status: 404 },
            );
        }

        const { status } = parsed.data;

        entry.status = status;

        if (status === 'in-room') {
            entry.calledAt = new Date();
        }

        if (status === 'completed') {
            entry.completedAt = new Date();
        }

        await entry.save();

        const updatedEntry =
            await QueueEntry.findById(entry._id)
                .populate(
                    'patientId',
                    'fullName phone email',
                )
                .populate(
                    'appointmentId',
                    'dateTime status notes',
                )
                .lean();

        return NextResponse.json(updatedEntry);
    } catch (error) {
        console.error(
            'PATCH /api/queue/[id] error:',
            error,
        );

        return NextResponse.json(
            { error: 'Failed to update queue entry' },
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
                { error: 'Invalid queue entry id' },
                { status: 400 },
            );
        }

        await connectToDatabase();

        const entry =
            await QueueEntry.findOneAndUpdate(
                {
                    _id: id,
                    clinicId: session.user.clinicId,
                },
                {
                    $set: {
                        status: 'completed',
                        completedAt: new Date(),
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
                .lean();

        if (!entry) {
            return NextResponse.json(
                { error: 'Queue entry not found' },
                { status: 404 },
            );
        }

        return NextResponse.json({
            message: 'Patient removed from queue',
            entry,
        });
    } catch (error) {
        console.error(
            'DELETE /api/queue/[id] error:',
            error,
        );

        return NextResponse.json(
            { error: 'Failed to remove patient from queue' },
            { status: 500 },
        );
    }
}