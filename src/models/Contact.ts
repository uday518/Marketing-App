import mongoose, { Schema, Document, Model } from "mongoose";

export interface IContact extends Document {
  name: string;
  email: string;
  phone: string;
  company: string;
  clinicSize: string;

  type: "Clinic Owner" | "Lead";
  status: "Active" | "Inactive";

  preferredDate: Date;
  preferredTime: string;

  demoStatus:
    | "Requested"
    | "Confirmed"
    | "Completed"
    | "Cancelled"
    | "No Show";

  notes?: string;

  createdAt: Date;
  updatedAt: Date;
}

const contactSchema = new Schema<IContact>(
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

    type: {
      type: String,
      enum: ["Clinic Owner", "Lead"],
      default: "Lead",
      required: true,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
      required: true,
    },

    preferredDate: {
      type: Date,
      required: true,
    },

    preferredTime: {
      type: String,
      required: true,
      trim: true,
    },

    demoStatus: {
      type: String,
      enum: [
        "Requested",
        "Confirmed",
        "Completed",
        "Cancelled",
        "No Show",
      ],
      default: "Requested",
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

export const Contact: Model<IContact> =
  mongoose.models.Contact ||
  mongoose.model<IContact>("Contact", contactSchema);