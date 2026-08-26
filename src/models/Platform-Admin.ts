import mongoose, {
  Schema,
  type InferSchemaType,
  type Model,
} from "mongoose";

export type PlatformAdminRole = "super_admin" | "support";

const platformAdminSchema = new Schema(
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
      index: true,
    },

    passwordHash: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      enum: ["super_admin", "support"],
      default: "super_admin",
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },

    lastLoginAt: {
      type: Date,
      default: null,
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

export type PlatformAdminDoc =
  InferSchemaType<typeof platformAdminSchema>;

export const PlatformAdmin: Model<PlatformAdminDoc> =
  mongoose.models.PlatformAdmin ||
  mongoose.model<PlatformAdminDoc>(
    "PlatformAdmin",
    platformAdminSchema,
  );