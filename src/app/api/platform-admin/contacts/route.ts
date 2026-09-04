import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { PlatformContact } from "@/models/platform-admin/PlatformContact";

/* ----------------------------------------
   GET ALL CONTACTS
---------------------------------------- */

export async function GET() {
  try {
    await connectToDatabase();

    const contacts = await PlatformContact.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: contacts,
    });
  } catch (error) {
    console.error("Failed to fetch contacts:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch contacts",
      },
      { status: 500 }
    );
  }
}

/* ----------------------------------------
   CREATE CONTACT
---------------------------------------- */

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const body = await request.json();

    const {
      name,
      email,
      phone,
      company,
      source,
      status,
      notes,
    } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, email and phone are required",
        },
        { status: 400 }
      );
    }

    const contact = await PlatformContact.create({
      name,
      email,
      phone,
      company,
      source: source || "Manual",
      status: status || "New",
      notes,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Contact created successfully",
        data: contact,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create contact:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create contact",
      },
      { status: 500 }
    );
  }
}