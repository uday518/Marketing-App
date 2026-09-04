import mongoose, { Schema, Document, Model } from "mongoose";

export type ContactStatus =
  | "New"
  | "Contacted"
  | "Active"
  | "Inactive"
  | "Converted";

export interface IPlatformContact extends Document {
  name: string;
  email: string;
  phone: string;
  company?: string;
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
      trim: true,
      default: "",
    },

    source: {
      type: String,
      default: "Manual",
      trim: true,
    },

    status: {
      type: String,
      enum: ["New", "Contacted", "Active", "Inactive", "Converted"],
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