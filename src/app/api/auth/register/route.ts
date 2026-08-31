import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";

import { connectToDatabase } from "@/lib/db";
import { Clinic, User } from "@/lib/models";
import { strongPassword } from "@/lib/validations";

const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name is too long"),

    clinicName: z
      .string()
      .trim()
      .min(2, "Clinic name must be at least 2 characters")
      .max(150, "Clinic name is too long"),

    email: z
      .string()
      .trim()
      .email("Enter a valid email")
      .transform((email) => email.toLowerCase()),

    password: strongPassword,

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);

    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error:
            parsed.error.issues[0]?.message ??
            "Invalid input",
        },
        { status: 400 },
      );
    }

    const {
      name,
      clinicName,
      email,
      password,
    } = parsed.data;

    await connectToDatabase();

    // -----------------------------------------------
    // Check if email already exists
    // -----------------------------------------------

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        {
          error: "An account with this email already exists",
        },
        { status: 409 },
      );
    }

    // -----------------------------------------------
    // Hash password
    // -----------------------------------------------

    const passwordHash = await bcrypt.hash(password, 12);

    // -----------------------------------------------
    // Create clinic
    // -----------------------------------------------

    const clinic = await Clinic.create({
      name: clinicName,
    });

    try {
      // ---------------------------------------------
      // Create clinic owner
      // ---------------------------------------------

      const user = await User.create({
        name,
        email,
        passwordHash,
        role: "owner",
        clinicId: clinic._id,
      });

      return NextResponse.json(
        {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          clinicId: clinic._id.toString(),
        },
        { status: 201 },
      );
    } catch (userError) {
      // ---------------------------------------------
      // Roll back clinic if user creation fails
      // ---------------------------------------------

      await Clinic.deleteOne({
        _id: clinic._id,
      });

      throw userError;
    }
  } catch (error) {
    console.error("CLINIC_REGISTER_ERROR:", error);

    return NextResponse.json(
      {
        error:
          "Unable to create clinic account. Please try again.",
      },
      { status: 500 },
    );
  }
}
