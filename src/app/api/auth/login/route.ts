import { NextRequest, NextResponse } from "next/server";

/**
 * Proxy API route for authentication
 * Purpose: Receive token from backend and set it as httpOnly cookie
 * Then return user data to frontend
 */
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Call your backend API
    const backendResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        // Don't send credentials to backend (no cookies there)
        credentials: "omit"
      }
    );

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json();
      return NextResponse.json(
        errorData,
        { status: backendResponse.status }
      );
    }

    const data = await backendResponse.json();
    const token = data.token;
    const userData = data.user;

    // Create response with user data
    const response = NextResponse.json(data);

    // Set httpOnly cookie for token (server-side only, secure)
    if (token) {
      response.cookies.set("accessToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // true for https, false for localhost
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7 // 7 days
      });
    }

    // Set readable cookie for user details (not httpOnly, so JavaScript can read it)
    if (userData) {
      response.cookies.set("authUser", JSON.stringify(userData), {
        httpOnly: false, // Allow JavaScript to read this cookie
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7 // 7 days
      });
    }

    return response;
  } catch (error) {
    console.error("Auth API error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
