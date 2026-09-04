import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/db";
import { PlatformContact } from "@/models/platform-admin/PlatformContact";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

/* ----------------------------------------
   GET SINGLE CONTACT
---------------------------------------- */

export async function GET(
  _request: NextRequest,
  { params }: RouteParams
) {
  try {
    await connectToDatabase();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid contact ID",
        },
        { status: 400 }
      );
    }

    const contact = await PlatformContact.findById(id).lean();

    if (!contact) {
      return NextResponse.json(
        {
          success: false,
          message: "Contact not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: contact,
    });
  } catch (error) {
    console.error("Failed to fetch contact:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch contact",
      },
      { status: 500 }
    );
  }
}

/* ----------------------------------------
   UPDATE CONTACT
---------------------------------------- */

export async function PATCH(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    await connectToDatabase();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid contact ID",
        },
        { status: 400 }
      );
    }

    const body = await request.json();

    const allowedFields = [
      "name",
      "email",
      "phone",
      "company",
      "source",
      "status",
      "notes",
    ];

    const updateData: Record<string, unknown> = {};

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    const contact = await PlatformContact.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    ).lean();

    if (!contact) {
      return NextResponse.json(
        {
          success: false,
          message: "Contact not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Contact updated successfully",
      data: contact,
    });
  } catch (error) {
    console.error("Failed to update contact:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update contact",
      },
      { status: 500 }
    );
  }
}

/* ----------------------------------------
   DELETE CONTACT
---------------------------------------- */

export async function DELETE(
  _request: NextRequest,
  { params }: RouteParams
) {
  try {
    await connectToDatabase();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid contact ID",
        },
        { status: 400 }
      );
    }

    const contact = await PlatformContact.findByIdAndDelete(id);

    if (!contact) {
      return NextResponse.json(
        {
          success: false,
          message: "Contact not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Contact deleted successfully",
      data: contact,
    });
  } catch (error) {
    console.error("Failed to delete contact:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete contact",
      },
      { status: 500 }
    );
  }
}