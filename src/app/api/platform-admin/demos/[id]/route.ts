import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/db";
import { DemoRequest } from "@/models/platform-admin/DemoRequest";
import { Lead } from "@/models/platform-admin/Leads";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

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
          message: "Invalid demo request ID",
        },
        { status: 400 }
      );
    }

    const demo = await DemoRequest.findById(id).lean();

    if (!demo) {
      return NextResponse.json(
        {
          success: false,
          message: "Demo request not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: demo,
    });
  } catch (error) {
    console.error("Failed to fetch demo request:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch demo request",
      },
      { status: 500 }
    );
  }
}

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
          message: "Invalid demo request ID",
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
      "clinicSize",
      "preferredDate",
      "preferredTime",
      "status",
      "notes",
    ];

    const updateData: Record<string, unknown> = {};

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    const updatedDemo = await DemoRequest.findByIdAndUpdate(
      id,
      updateData,
      {
        returnDocument: "after",
        runValidators: true,
      }
    );

    if (!updatedDemo) {
      return NextResponse.json(
        {
          success: false,
          message: "Demo request not found",
        },
        { status: 404 }
      );
    }

    /*
      ----------------------------------------
      UPDATE CONNECTED LEAD STATUS
      ----------------------------------------
    */

    if (updatedDemo.leadId) {
      const leadStatusMap: Record<string, string> = {
        Requested: "New",
        Confirmed: "Demo Scheduled",
        Completed: "Demo Completed",
        Cancelled: "Lost",
        "No Show": "Lost",
      };

      const leadStatus = leadStatusMap[updatedDemo.status];

      if (leadStatus) {
        await Lead.findByIdAndUpdate(
          updatedDemo.leadId,
          {
            status: leadStatus,
          },
          {
            returnDocument: "after",
          }
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: "Demo request updated successfully",
      data: updatedDemo,
    });
  } catch (error) {
    console.error("Failed to update demo request:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update demo request",
      },
      { status: 500 }
    );
  }
}

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
          message: "Invalid demo request ID",
        },
        { status: 400 }
      );
    }

    const demo = await DemoRequest.findByIdAndDelete(id);

    if (!demo) {
      return NextResponse.json(
        {
          success: false,
          message: "Demo request not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Demo request deleted successfully",
      data: demo,
    });
  } catch (error) {
    console.error("Failed to delete demo request:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete demo request",
      },
      { status: 500 }
    );
  }
}