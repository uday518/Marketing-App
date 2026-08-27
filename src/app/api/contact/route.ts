import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Contact } from "@/models/Contact";

// GET all contacts
export async function GET() {
  try {
    await connectToDatabase();

    const contacts = await Contact.find().sort({
      createdAt: -1,
    });

    return NextResponse.json(
      {
        success: true,
        contacts,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching contacts:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch contacts",
      },
      { status: 500 }
    );
  }
}

// CREATE a new contact / demo request
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const body = await request.json();

    // Validate required fields
    if (
      !body.name ||
      !body.email ||
      !body.phone ||
      !body.company ||
      !body.clinicSize ||
      !body.preferredDate ||
      !body.preferredTime
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Name, email, phone, clinic name, clinic size, preferred date and preferred time are required.",
        },
        { status: 400 }
      );
    }

    // Validate preferred date
    const preferredDate = new Date(body.preferredDate);

    if (Number.isNaN(preferredDate.getTime())) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid preferred date.",
        },
        { status: 400 }
      );
    }

    // Create contact
    const contact = await Contact.create({
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone.trim(),
      company: body.company.trim(),
      clinicSize: body.clinicSize.trim(),

      type: "Lead",
      status: "Active",

      preferredDate,
      preferredTime: body.preferredTime.trim(),

      // New demo requests always start here.
      // Do not take this value from the frontend.
      demoStatus: "Requested",

      notes: body.notes?.trim() || "",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Demo request submitted successfully.",
        contact,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating contact:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create contact.",
      },
      { status: 500 }
    );
  }
}