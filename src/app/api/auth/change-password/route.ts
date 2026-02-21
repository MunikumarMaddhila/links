import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth-utils";

/**
 * POST /api/auth/change-password
 * Purpose: Change user password
 * Requires: Valid authentication token
 */
export async function POST(request: NextRequest) {
  try {
    // Verify token before allowing password change
    const { token, error } = verifyToken(request);
    if (error) {
      return error;
    }

    const body = await request.json();
    const { currentPassword, newPassword, confirmPassword } = body;

    // Validate input
    if (!currentPassword || !newPassword || !confirmPassword) {
      return NextResponse.json(
        { message: "All password fields are required" },
        { status: 400 }
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { message: "New passwords do not match" },
        { status: 400 }
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { message: "Password must be at least 8 characters long" },
        { status: 400 }
      );
    }

    console.log("[Auth.changePassword] Password change requested");

    // TODO: Integrate with your backend API
    // 1. Verify current password against stored password in backend
    // 2. Update password in backend
    // For now, return a mock success response
    return NextResponse.json(
      {
        message: "Password changed successfully"
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Auth.changePassword] Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
