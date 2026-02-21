import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth-utils";

/**
 * PATCH /api/users/settings/notifications
 * Purpose: Update user notification preferences
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
    const { emailNotifications, weeklyReport, marketingEmails } = body;

    console.log("[Users.notifications] Updating notification settings:", {
      emailNotifications,
      weeklyReport,
      marketingEmails
    });

    // TODO: Integrate with your backend API
    // Send notification preferences to backend
    // For now, return a mock success response
    const updatedSettings = {
      emailNotifications: emailNotifications ?? true,
      weeklyReport: weeklyReport ?? true,
      marketingEmails: marketingEmails ?? false,
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json(
      {
        message: "Notification settings updated successfully",
        settings: updatedSettings
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Users.notifications] Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
