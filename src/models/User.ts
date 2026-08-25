import mongoose, {
    Schema,
    type InferSchemaType,
    type Model,
} from 'mongoose';

export type UserRole =
    | 'owner'
    | 'manager'
    | 'dentist'
    | 'receptionist';

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        passwordHash: {
            type: String,
            required: true,
        },

        role: {
            type: String,
            enum: [
                'owner',
                'manager',
                'dentist',
                'receptionist',
            ],
            default: 'owner',
        },

        clinicId: {
            type: Schema.Types.ObjectId,
            ref: 'Clinic',
            default: null,
            index: true,
        },

        passwordChangedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    },
);

export type UserDoc = InferSchemaType<typeof userSchema>;

export const User: Model<UserDoc> =
    mongoose.models.User ||
    mongoose.model<UserDoc>('User', userSchema);