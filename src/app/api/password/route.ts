import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth-utils";

/**
 * PATCH /api/password
 * Purpose: Change user password
 * Request body: { currentPassword: string, newPassword: string, confirmPassword: string }
 * Requires: Valid authentication token
 */
export async function PATCH(request: NextRequest) {
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
        { message: "All fields (currentPassword, newPassword, confirmPassword) are required" },
        { status: 400 }
      );
    }

    // Check if new passwords match
    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { message: "New password and confirm password do not match" },
        { status: 400 }
      );
    }

    // Validate password strength
    if (newPassword.length < 8) {
      return NextResponse.json(
        { message: "New password must be at least 8 characters long" },
        { status: 400 }
      );
    }

    // Check if new password is different from current
    if (currentPassword === newPassword) {
      return NextResponse.json(
        { message: "New password must be different from current password" },
        { status: 400 }
      );
    }

    console.log("[Password Change] Password change request initiated");

    // TODO: Integrate with backend
    // 1. Verify current password matches user's stored password
    // 2. Hash and update new password in database
    // 3. Log this security event
    // 4. Optionally invalidate all other sessions

    const result = {
      userId: "user-123", // TODO: Extract from JWT token
      message: "Password changed successfully",
      changedAt: new Date().toISOString()
    };

    return NextResponse.json(
      {
        message: "Password changed successfully",
        data: result
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Password Change] Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/password
 * Purpose: Change user password (alternative endpoint)
 * Request body: { currentPassword: string, newPassword: string, confirmPassword: string }
 * Requires: Valid authentication token
 */
export async function POST(request: NextRequest) {
  return PATCH(request);
}
