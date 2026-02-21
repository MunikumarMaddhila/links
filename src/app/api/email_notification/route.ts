import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth-utils";

/**
 * PATCH /api/email_notification
 * Purpose: Toggle email notifications on/off
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

    console.log("[Email Notification] Updating email notifications:", { enabled });

    // TODO: Save to database - Update user's email_notification preference
    const updatedSettings = {
      userId: "user-123", // TODO: Extract from JWT token
      emailNotificationEnabled: enabled,
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json(
      {
        message: "Email notification preference updated successfully",
        data: updatedSettings
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Email Notification] Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/email_notification
 * Purpose: Get current email notification status
 * Requires: Valid authentication token
 */
export async function GET(request: NextRequest) {
  try {
    // Verify token
    const { token, error } = verifyToken(request);
    if (error) {
      return error;
    }

    console.log("[Email Notification] Fetching email notification status");

    // TODO: Fetch from database
    const settings = {
      userId: "user-123", // TODO: Extract from JWT token
      emailNotificationEnabled: true,
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json(
      {
        message: "Email notification status retrieved successfully",
        data: settings
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Email Notification] Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
