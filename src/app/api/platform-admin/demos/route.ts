import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { DemoRequest } from "@/models/platform-admin/DemoRequest";
import { Lead } from "@/models/platform-admin/Leads";

export async function GET() {
  try {
    await connectToDatabase();

    const demos = await DemoRequest.find({})
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: demos,
    });
  } catch (error) {
    console.error("Failed to fetch demo requests:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch demo requests",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const body = await request.json();

    const {
      name,
      email,
      phone,
      company,
      clinicSize,
      preferredDate,
      preferredTime,
      notes,
    } = body;

    if (
      !name ||
      !email ||
      !phone ||
      !company ||
      !clinicSize ||
      !preferredDate ||
      !preferredTime
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "All required fields must be provided.",
        },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // 1. Find existing Lead by email
    // --------------------------------------------------

    let lead = await Lead.findOne({
      email: email.toLowerCase().trim(),
    });

    // --------------------------------------------------
    // 2. Create Lead if it doesn't exist
    // --------------------------------------------------

    if (!lead) {
      lead = await Lead.create({
        name,
        email,
        phone,
        company,
        clinicSize,
        source: "Website",
        status: "New",
        notes: notes || "",
      });
    }

    // --------------------------------------------------
    // 3. Create Demo Request linked to Lead
    // --------------------------------------------------

    const demoRequest = await DemoRequest.create({
      name,
      email,
      phone,
      company,
      clinicSize,
      preferredDate,
      preferredTime,
      notes: notes || "",
      leadId: lead._id,
      status: "Requested",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Demo request submitted successfully.",
        data: demoRequest,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Demo request POST error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create demo request.",
      },
      { status: 500 }
    );
  }
}