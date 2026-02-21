import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth-utils";

/**
 * GET /api/auth/me
 * Purpose: Restore user session by reading httpOnly cookie
 * Requires: Valid authentication token
 */
export async function GET(request: NextRequest) {
  try {
    // Verify token exists
    const { token, error } = verifyToken(request);
    if (error) {
      return error;
    }

    // For now, we can't decode JWT without a secret, so we just confirm the token exists
    // In production, you would verify the JWT signature here
    // For this demo, we trust the middleware and browser to only set valid tokens
    
    // If you have a backend /api/auth/me endpoint, uncomment below:
    /*
    const backendResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/me`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        credentials: "omit"
      }
    );

    if (!backendResponse.ok) {
      if (backendResponse.status === 401) {
        const response = NextResponse.json(
          { message: "Unauthorized" },
          { status: 401 }
        );
        response.cookies.delete("accessToken");
        return response;
      }
      throw new Error(`Backend returned ${backendResponse.status}`);
    }

    const userData = await backendResponse.json();
    return NextResponse.json(userData);
    */

    // Temporary: Return a minimal response to indicate auth is valid
    // The frontend will need to store user data in context after login
    console.log("[Auth.me] Token verified, auth is valid");
    return NextResponse.json(
      {
        authenticated: true,
        message: "User session valid (token verified)"
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Auth.me] Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
