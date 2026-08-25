import mongoose, {
    Schema,
    type InferSchemaType,
    type Model,
} from 'mongoose';

const clinicSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        locations: [
            {
                name: {
                    type: String,
                    default: '',
                    trim: true,
                },

                address: {
                    type: String,
                    default: '',
                    trim: true,
                },

                city: {
                    type: String,
                    default: '',
                    trim: true,
                },
            },
        ],
    },
    {
        timestamps: true,
    },
);

export type ClinicDoc = InferSchemaType<typeof clinicSchema>;

export const Clinic: Model<ClinicDoc> =
    mongoose.models.Clinic ||
    mongoose.model<ClinicDoc>('Clinic', clinicSchema);