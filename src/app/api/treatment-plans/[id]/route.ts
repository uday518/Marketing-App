import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { Patient, TreatmentPlan } from "@/lib/models";

const updateTreatmentPlanSchema = z.object({
  status: z.enum(["in-progress", "completed"]),
});

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    if (!session.user.clinicId) {
      return NextResponse.json(
        { error: "No clinic associated with this account" },
        { status: 403 }
      );
    }

    const { id } = await params;

    await connectToDatabase();

    const treatmentPlan = await TreatmentPlan.findOne({
      _id: id,
      clinicId: session.user.clinicId,
    })
      .populate("patientId", "fullName phone email")
      .lean();

    if (!treatmentPlan) {
      return NextResponse.json(
        { error: "Treatment plan not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(treatmentPlan);
  } catch (error) {
    console.error("GET /api/treatment-plans/[id] error:", error);

    return NextResponse.json(
      { error: "Failed to fetch treatment plan" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    if (!session.user.clinicId) {
      return NextResponse.json(
        { error: "No clinic associated with this account" },
        { status: 403 }
      );
    }

    const { id } = await params;

    const body = await request.json().catch(() => null);

    const parsed = updateTreatmentPlanSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error:
            parsed.error.issues[0]?.message ??
            "Invalid treatment plan update",
        },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const treatmentPlan = await TreatmentPlan.findOne({
      _id: id,
      clinicId: session.user.clinicId,
    });

    if (!treatmentPlan) {
      return NextResponse.json(
        { error: "Treatment plan not found" },
        { status: 404 }
      );
    }

    // Only allow moving an in-progress plan to completed.
    if (
      treatmentPlan.status !== "in-progress" ||
      parsed.data.status !== "completed"
    ) {
      return NextResponse.json(
        {
          error:
            "Only an in-progress treatment plan can be marked as completed",
        },
        { status: 400 }
      );
    }

    treatmentPlan.status = "completed";

    await treatmentPlan.save();

    const updatedTreatmentPlan = await TreatmentPlan.findById(
      treatmentPlan._id
    )
      .populate("patientId", "fullName phone email")
      .lean();

    return NextResponse.json(updatedTreatmentPlan);
  } catch (error) {
    console.error("PATCH /api/treatment-plans/[id] error:", error);

    return NextResponse.json(
      { error: "Failed to update treatment plan" },
      { status: 500 }
    );
  }
}