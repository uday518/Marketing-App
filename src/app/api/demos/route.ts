import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { ContactMessage } from "@/lib/models";

// GET all demo requests
export async function GET() {
  try {
    await connectToDatabase();

    const demos = await ContactMessage.find({
      preferredDate: { $exists: true, $ne: null },
      preferredTime: { $exists: true, $ne: "" },
    }).sort({
      createdAt: -1,
    });

    return NextResponse.json(
      {
        success: true,
        demos,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching demo requests:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch demo requests",
      },
      { status: 500 }
    );
  }
}