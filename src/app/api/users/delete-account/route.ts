import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth-utils";

/**
 * POST /api/users/delete-account
 * Purpose: Delete user account permanently
 * Requires: Valid authentication token
 */
export async function POST(request: NextRequest) {
  try {
    // Verify token before allowing account deletion
    const { token, error } = verifyToken(request);
    if (error) {
      return error;
    }

    const body = await request.json();
    const { password } = body;

    // Validate input
    if (!password) {
      return NextResponse.json(
        { message: "Password is required to delete account" },
        { status: 400 }
      );
    }

    console.log("[Users.deleteAccount] Account deletion requested");

    // TODO: Integrate with your backend API
    // 1. Verify password against stored password in backend
    // 2. Delete all user data from backend
    // 3. Clear cookies on response
    // For now, return a mock success response

    const response = NextResponse.json(
      {
        message: "Account deleted successfully"
      },
      { status: 200 }
    );

    // Clear authentication cookies after account deletion
    response.cookies.delete("accessToken");
    response.cookies.delete("authUser");

    return response;
  } catch (error) {
    console.error("[Users.deleteAccount] Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
