import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Lead } from "@/models/platform-admin/Leads";
import mongoose from "mongoose";

interface RouteParams {
  params: Promise<{ id: string }>;
}

/* ----------------------------------------
   GET SINGLE LEAD
---------------------------------------- */

export async function GET(
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
          message: "Invalid lead ID",
        },
        { status: 400 }
      );
    }

    const lead = await Lead.findById(id).lean();

    if (!lead) {
      return NextResponse.json(
        {
          success: false,
          message: "Lead not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: lead,
    });
  } catch (error) {
    console.error("Failed to fetch lead:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch lead",
      },
      { status: 500 }
    );
  }
}

/* ----------------------------------------
   PATCH LEAD
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
          message: "Invalid lead ID",
        },
        { status: 400 }
      );
    }

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

    const updateData: Record<string, unknown> = {};

    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    if (phone !== undefined) updateData.phone = phone;
    if (company !== undefined) updateData.company = company;
    if (clinicSize !== undefined) {
      updateData.clinicSize = clinicSize;
    }
    if (source !== undefined) updateData.source = source;
    if (status !== undefined) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;

    const lead = await Lead.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    ).lean();

    if (!lead) {
      return NextResponse.json(
        {
          success: false,
          message: "Lead not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Lead updated successfully",
      data: lead,
    });
  } catch (error) {
    console.error("Failed to update lead:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update lead",
      },
      { status: 500 }
    );
  }
}

/* ----------------------------------------
   DELETE LEAD
---------------------------------------- */

export async function DELETE(
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
          message: "Invalid lead ID",
        },
        { status: 400 }
      );
    }

    const lead = await Lead.findByIdAndDelete(id);

    if (!lead) {
      return NextResponse.json(
        {
          success: false,
          message: "Lead not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Lead deleted successfully",
    });
  } catch (error) {
    console.error("Failed to delete lead:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete lead",
      },
      { status: 500 }
    );
  }
}