import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth-utils";

/**
 * PATCH /api/market_email
 * Purpose: Toggle marketing emails on/off
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

    console.log("[Marketing Email] Updating marketing email preference:", { enabled });

    // TODO: Save to database - Update user's marketing_email preference
    const updatedSettings = {
      userId: "user-123", // TODO: Extract from JWT token
      marketingEmailEnabled: enabled,
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json(
      {
        message: "Marketing email preference updated successfully",
        data: updatedSettings
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Marketing Email] Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/market_email
 * Purpose: Get current marketing email status
 * Requires: Valid authentication token
 */
export async function GET(request: NextRequest) {
  try {
    // Verify token
    const { token, error } = verifyToken(request);
    if (error) {
      return error;
    }

    console.log("[Marketing Email] Fetching marketing email status");

    // TODO: Fetch from database
    const settings = {
      userId: "user-123", // TODO: Extract from JWT token
      marketingEmailEnabled: false,
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json(
      {
        message: "Marketing email status retrieved successfully",
        data: settings
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Marketing Email] Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
