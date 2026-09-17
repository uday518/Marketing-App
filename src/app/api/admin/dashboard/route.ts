import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import {
  Appointment,
  Encounter,
  Patient,
  QueueEntry,
} from "@/lib/models";

export async function GET() {
  try {
    // 1. Check authentication
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 },
      );
    }

    // 2. Patient accounts should use /portal
    if (session.user.role === "patient") {
      return NextResponse.json(
        { message: "Patient dashboard is not available here" },
        { status: 403 },
      );
    }

    // 3. Clinic ID is required
    const clinicId = session.user.clinicId;
    
    console.log("DASHBOARD SESSION:", {
  userId: session.user.id,
  role: session.user.role,
  clinicId: session.user.clinicId,
});

    if (!clinicId) {
      return NextResponse.json(
        { message: "Clinic ID not found in session" },
        { status: 400 },
      );
    }

    // 4. Connect to MongoDB
    await connectToDatabase();

    // 5. Today's date range
    const now = new Date();

    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);

    // 6. Get patients first
    // Encounter does not have clinicId, so we use patient IDs.
    const clinicPatients = await Patient.find({
      clinicId,
    }).select("_id");

    const patientIds = clinicPatients.map((patient) => patient._id);

    // 7. Fetch dashboard data
    const [
      totalPatients,
      todayAppointments,
      waitingQueue,
      clinicalEncounters,
      todaySchedule,
      upcomingAppointments,
    ] = await Promise.all([
      // Total patients in this clinic
      Patient.countDocuments({
        clinicId,
      }),

      // Today's appointments
      Appointment.countDocuments({
        clinicId,
        dateTime: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      }),

      // Waiting queue
      QueueEntry.countDocuments({
        clinicId,
        status: "waiting",
      }),

      // Clinical encounters for patients belonging to this clinic
      Encounter.countDocuments({
        patientId: {
          $in: patientIds,
        },
      }),

      // Today's schedule
      Appointment.find({
        clinicId,
        dateTime: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
        status: {
          $nin: ["cancelled", "completed", "no-show"],
        },
      })
        .sort({ dateTime: 1 })
        .limit(10)
        .lean(),

      // Upcoming appointments
      Appointment.find({
        clinicId,
        dateTime: {
          $gte: now,
        },
        status: {
          $nin: ["cancelled", "completed", "no-show"],
        },
      })
        .sort({ dateTime: 1 })
        .limit(10)
        .lean(),
    ]);

    // 8. Collect patient IDs from appointments
    const appointmentPatientIds = [
      ...todaySchedule,
      ...upcomingAppointments,
    ]
      .map((appointment) => appointment.patientId?.toString())
      .filter(Boolean);

    // Remove duplicates
    const uniquePatientIds = [...new Set(appointmentPatientIds)];

    // 9. Fetch patient names
    const appointmentPatients = await Patient.find({
      _id: { $in: uniquePatientIds },
    })
      .select("_id fullName")
      .lean();

    const patientNameMap = new Map(
      appointmentPatients.map((patient) => [
        patient._id.toString(),
        patient.fullName,
      ]),
    );

    // 10. Format appointments for the UI
    const formatAppointment = (appointment: any) => ({
      id: appointment._id.toString(),
      time: new Date(appointment.dateTime).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      patientName:
        patientNameMap.get(appointment.patientId?.toString()) ||
        "Unknown Patient",
      type: "Appointment",
      status: appointment.status || "Confirmed",
    });

    const formattedTodaySchedule = todaySchedule.map(formatAppointment);
    const formattedUpcomingAppointments =
      upcomingAppointments.map(formatAppointment);

    // 11. Return dashboard data
    return NextResponse.json({
      stats: {
        totalPatients,
        todayAppointments,
        waitingQueue,
        clinicalEncounters,
      },

      todaySchedule: formattedTodaySchedule,

      upcomingAppointments: formattedUpcomingAppointments,
    });
  } catch (error) {
    console.error("Dashboard API error:", error);

    return NextResponse.json(
      {
        message: "Failed to load dashboard data",
      },
      { status: 500 },
    );
  }
}