import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth-utils";

/**
 * PATCH /api/users/profile
 * Purpose: Update user profile information
 * Requires: Valid authentication token
 */
export async function PATCH(request: NextRequest) {
  try {
    // Verify token before allowing profile update
    const { token, error } = verifyToken(request);
    if (error) {
      return error;
    }

    const body = await request.json();
    const { name, email, username, bio } = body;

    // Validate input
    if (!name && !email && !username && !bio) {
      return NextResponse.json(
        { message: "At least one field is required for update" },
        { status: 400 }
      );
    }

    console.log("[Users.profile] Updating profile with:", {
      name,
      email,
      username,
      bio
    });

    // TODO: Integrate with your backend API
    // Send update to backend and return updated user data
    // For now, return a mock success response
    const updatedUser = {
      id: "mock-user-id",
      name: name || "Mock User",
      email: email || "user@example.com",
      username: username || "mockuser",
      bio: bio || "Mock bio",
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json(
      {
        message: "Profile updated successfully",
        user: updatedUser
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Users.profile] Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
