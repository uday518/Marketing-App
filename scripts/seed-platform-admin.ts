import "dotenv/config";
import bcrypt from "bcryptjs";

import { connectToDatabase } from "../src/lib/db";
import { PlatformAdmin } from "../src/models/Platform-Admin";

async function seedPlatformAdmin() {
  try {
    await connectToDatabase();

    const name = process.env.PLATFORM_ADMIN_NAME;
    const email = process.env.PLATFORM_ADMIN_EMAIL?.toLowerCase().trim();
    const password = process.env.PLATFORM_ADMIN_PASSWORD;

    if (!name || !email || !password) {
      throw new Error(
        "Missing PLATFORM_ADMIN_NAME, PLATFORM_ADMIN_EMAIL or PLATFORM_ADMIN_PASSWORD in .env",
      );
    }

    if (password.length < 8) {
      throw new Error(
        "PLATFORM_ADMIN_PASSWORD must be at least 8 characters",
      );
    }

    const existingAdmin = await PlatformAdmin.findOne({ email });

    if (existingAdmin) {
      console.log(`Platform admin already exists: ${email}`);

      await PlatformAdmin.updateOne(
        { _id: existingAdmin._id },
        {
          $set: {
            name,
            isActive: true,
          },
        },
      );

      console.log("Existing platform admin has been activated.");
      return;
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const admin = await PlatformAdmin.create({
      name,
      email,
      passwordHash,
      role: "super_admin",
      isActive: true,
    });

    console.log("=================================");
    console.log("Platform admin created successfully");
    console.log("=================================");
    console.log(`ID:    ${admin._id}`);
    console.log(`Name:  ${admin.name}`);
    console.log(`Email: ${admin.email}`);
    console.log(`Role:  ${admin.role}`);
    console.log("=================================");
  } catch (error) {
    console.error("Failed to seed platform admin:");

    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }

    process.exitCode = 1;
  } finally {
    // Give mongoose a moment to finish pending operations
    await new Promise((resolve) => setTimeout(resolve, 100));
    process.exit();
  }
}

seedPlatformAdmin();