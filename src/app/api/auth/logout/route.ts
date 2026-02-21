import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth-utils";

/**
 * POST /api/auth/logout
 * Purpose: Clear authentication cookies
 * Requires: Valid authentication token
 */
export async function POST(request: NextRequest) {
  try {
    // Verify token before allowing logout
    const { token, error } = verifyToken(request);
    if (error) {
      return error;
    }

    const response = NextResponse.json({ message: "Logged out successfully" });

    // Clear the accessToken httpOnly cookie
    response.cookies.delete("accessToken");

    // Clear the authUser cookie
    response.cookies.delete("authUser");

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
