import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Lead } from "@/models/platform-admin/Leads";

export async function GET() {
  try {
    await connectToDatabase();

    const leads = await Lead.find({})
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: leads,
    });
  } catch (error) {
    console.error("Failed to fetch leads:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch leads",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const body = await request.json();

    const {
      name,
      email,
      phone,
      company,
      clinicSize,
      source,
      status,
      notes,
    } = body;

    if (
      !name ||
      !email ||
      !phone ||
      !company ||
      !clinicSize
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "All required fields must be provided",
        },
        { status: 400 }
      );
    }

    const lead = await Lead.create({
      name,
      email,
      phone,
      company,
      clinicSize,
      source: source || "Website",
      status: status || "New",
      notes: notes || "",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Lead created successfully",
        data: lead,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create lead:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create lead",
      },
      { status: 500 }
    );
  }
}