import mongoose, { Schema, Document, Model } from "mongoose";

export type ContactStatus =
  | "New"
  | "Contacted"
  | "Resolved"
  | "Closed";

export interface IPlatformContact extends Document {
  name: string;
  email: string;
  phone: string;
  company?: string;
  subject: string;
  message: string;
  source: string;
  status: ContactStatus;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PlatformContactSchema = new Schema<IPlatformContact>(
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

    subject: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    source: {
      type: String,
      default: "Website",
      trim: true,
    },

    status: {
      type: String,
      enum: ["New", "Contacted", "Resolved", "Closed"],
      default: "New",
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

export const PlatformContact: Model<IPlatformContact> =
  mongoose.models.PlatformContact ||
  mongoose.model<IPlatformContact>(
    "PlatformContact",
    PlatformContactSchema
  );