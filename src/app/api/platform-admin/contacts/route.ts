import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { PlatformContact } from "@/models/platform-admin/PlatformContact";

/* GET ALL CONTACTS */
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

/* CREATE CONTACT */
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const body = await request.json();

    const {
      name,
      email,
      phone,
      company,
      subject,
      message,
    } = body;

    // Required fields
    if (!name || !email || !phone || !subject || !company || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, email, phone, company, subject and message are required",
        },
        { status: 400 }
      );
    }

    const contact = await PlatformContact.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim() || "",
      company: company.trim() || "",
      subject: subject.trim(),
      message: message.trim(),

      // Set by server
      source: "Website",
      status: "New",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Contact message sent successfully",
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