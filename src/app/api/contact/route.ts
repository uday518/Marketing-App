import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { ContactMessage } from "@/lib/models";

// GET all contact messages
export async function GET() {
  try {
    await connectToDatabase();

    const contacts = await ContactMessage.find().sort({
      createdAt: -1,
    });

    return NextResponse.json(contacts, { status: 200 });
  } catch (error) {
    console.error("Error fetching contacts:", error);

    return NextResponse.json(
      { error: "Failed to fetch contacts" },
      { status: 500 }
    );
  }
}

// CREATE a new contact message
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const body = await request.json();

    if (!body.name || !body.email || !body.subject || !body.message) {
      return NextResponse.json(
        { error: "Name, email, subject, and message are required." },
        { status: 400 }
      );
    }

    const contact = await ContactMessage.create({
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone?.trim() || "",
      subject: body.subject.trim(),
      message: body.message.trim(),
    });

    return NextResponse.json(contact, { status: 201 });
  } catch (error) {
    console.error("Error creating contact:", error);

    return NextResponse.json(
      { error: "Failed to create contact message." },
      { status: 500 }
    );
  }
}
