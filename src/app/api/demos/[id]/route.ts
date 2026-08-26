import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Contact } from "@/models/Contact";

const VALID_DEMO_STATUSES = [
  "Requested",
  "Confirmed",
  "Completed",
  "Cancelled",
  "No Show",
] as const;

type DemoStatus = (typeof VALID_DEMO_STATUSES)[number];

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

// UPDATE demo status
export async function PATCH(
  request: NextRequest,
  context: RouteContext
) {
  try {
    await connectToDatabase();

    const { id } = await context.params;
    const body = await request.json();

    const demoStatus = body.demoStatus as DemoStatus;

    // Validate demo status
    if (!VALID_DEMO_STATUSES.includes(demoStatus)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid demo status.",
        },
        { status: 400 }
      );
    }

    // Update only demoStatus.
    // This avoids re-validating old Contact fields.
    const demo = await Contact.findByIdAndUpdate(
      id,
      {
        $set: {
          demoStatus,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!demo) {
      return NextResponse.json(
        {
          success: false,
          message: "Demo request not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Demo status updated successfully.",
        demo,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating demo status:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update demo status.",
      },
      { status: 500 }
    );
  }
}