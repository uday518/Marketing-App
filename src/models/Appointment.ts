import mongoose, {
    Schema,
    type InferSchemaType,
    type Model,
} from 'mongoose';

const appointmentSchema = new Schema(
    {
        patientId: {
            type: Schema.Types.ObjectId,
            ref: 'Patient',
            required: true,
            index: true,
        },

        dentistId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            default: null,
            index: true,
        },

        clinicId: {
            type: Schema.Types.ObjectId,
            ref: 'Clinic',
            required: true,
            index: true,
        },

        dateTime: {
            type: Date,
            required: true,
            index: true,
        },

        status: {
            type: String,
            enum: [
                'scheduled',
                'checked-in',
                'in-room',
                'completed',
                'cancelled',
                'no-show',
            ],
            default: 'scheduled',
            index: true,
        },

        notes: {
            type: String,
            default: '',
            trim: true,
        },
    },
    {
        timestamps: true,
    },
);

export type AppointmentDoc =
    InferSchemaType<typeof appointmentSchema>;

export const Appointment: Model<AppointmentDoc> =
    mongoose.models.Appointment ||
    mongoose.model<AppointmentDoc>(
        'Appointment',
        appointmentSchema,
    );