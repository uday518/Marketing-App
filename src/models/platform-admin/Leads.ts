import mongoose, { Schema, Document, Model } from "mongoose";

export interface ILead extends Document {
  name: string;
  email: string;
  phone: string;
  company: string;
  clinicSize: string;

  source: string;

  status:
    | "New"
    | "Contacted"
    | "Qualified"
    | "Demo Scheduled"
    | "Demo Completed"
    | "Proposal"
    | "Converted"
    | "Lost";

  notes?: string;

  createdAt: Date;
  updatedAt: Date;
}

const leadSchema = new Schema<ILead>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },

    clinicSize: {
      type: String,
      required: true,
      trim: true,
    },

    source: {
      type: String,
      required: true,
      trim: true,
      default: "Website",
    },

    status: {
      type: String,
      enum: [
        "New",
        "Contacted",
        "Qualified",
        "Demo Scheduled",
        "Demo Completed",
        "Proposal",
        "Converted",
        "Lost",
      ],
      default: "New",
      required: true,
    },

    notes: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Lead: Model<ILead> =
  mongoose.models.Lead ||
  mongoose.model<ILead>("Lead", leadSchema);