import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth-utils";

/**
 * PATCH /api/weekly_report
 * Purpose: Toggle weekly report emails on/off
 * Request body: { enabled: boolean }
 * Requires: Valid authentication token
 */
export async function PATCH(request: NextRequest) {
  try {
    // Verify token before allowing settings update
    const { token, error } = verifyToken(request);
    if (error) {
      return error;
    }

    const body = await request.json();
    const { enabled } = body;

    // Validate input
    if (typeof enabled !== "boolean") {
      return NextResponse.json(
        { message: "enabled must be a boolean value" },
        { status: 400 }
      );
    }

    console.log("[Weekly Report] Updating weekly report preference:", { enabled });

    // TODO: Save to database - Update user's weekly_report preference
    const updatedSettings = {
      userId: "user-123", // TODO: Extract from JWT token
      weeklyReportEnabled: enabled,
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json(
      {
        message: "Weekly report preference updated successfully",
        data: updatedSettings
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Weekly Report] Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/weekly_report
 * Purpose: Get current weekly report status
 * Requires: Valid authentication token
 */
export async function GET(request: NextRequest) {
  try {
    // Verify token
    const { token, error } = verifyToken(request);
    if (error) {
      return error;
    }

    console.log("[Weekly Report] Fetching weekly report status");

    // TODO: Fetch from database
    const settings = {
      userId: "user-123", // TODO: Extract from JWT token
      weeklyReportEnabled: true,
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json(
      {
        message: "Weekly report status retrieved successfully",
        data: settings
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Weekly Report] Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
