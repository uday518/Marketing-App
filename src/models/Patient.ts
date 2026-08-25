import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";
const patientSchema = new Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
        },

        dob: {
            type: Date,
            default: null,
        },

        phone: {
            type: String,
            default: "",
            trim: true,
        },

        email: {
            type: String,
            default: "",
            lowercase: true,
            trim: true,
        },

        address: {
            type: String,
            default: "",
            trim: true,
        },

        medicalHistory: [
            {
                condition: {
                    type: String,
                    default: "",
                },
                notes: {
                    type: String,
                    default: "",
                },
            },
        ],

        insurance: {
            type: String,
            default: "",
            trim: true,
        },

        clinicId: {
            type: Schema.Types.ObjectId,
            ref: "Clinic",
            required: true,
            index: true,
        },
    },
    {
        timestamps: true,
    }
);

export type PatientDoc = InferSchemaType<typeof patientSchema>;

export const Patient: Model<PatientDoc> =
    mongoose.models.Patient ||
    mongoose.model<PatientDoc>("Patient", patientSchema);