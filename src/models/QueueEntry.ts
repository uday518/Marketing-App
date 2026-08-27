import mongoose, {
    Schema,
    type InferSchemaType,
    type Model,
} from 'mongoose';

const queueEntrySchema = new Schema(
    {
        clinicId: {
            type: Schema.Types.ObjectId,
            ref: 'Clinic',
            required: true,
            index: true,
        },

        patientId: {
            type: Schema.Types.ObjectId,
            ref: 'Patient',
            required: true,
            index: true,
        },

        appointmentId: {
            type: Schema.Types.ObjectId,
            ref: 'Appointment',
            default: null,
            index: true,
        },

        status: {
            type: String,
            enum: [
                'waiting',
                'in-room',
                'completed',
            ],
            default: 'waiting',
            index: true,
        },

        joinedAt: {
            type: Date,
            default: Date.now,
            index: true,
        },

        calledAt: {
            type: Date,
            default: null,
        },

        completedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    },
);

export type QueueEntryDoc =
    InferSchemaType<typeof queueEntrySchema>;

export const QueueEntry: Model<QueueEntryDoc> =
    mongoose.models.QueueEntry ||
    mongoose.model<QueueEntryDoc>(
        'QueueEntry',
        queueEntrySchema,
    );