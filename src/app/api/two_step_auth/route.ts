import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth-utils";

/**
 * POST /api/two_step_auth/send-otp
 * Purpose: Send OTP to user's email for 2FA setup
 * Request body: { email: string }
 * Requires: Valid authentication token
 */
export async function POST(request: NextRequest) {
  try {
    // Verify token before allowing 2FA setup
    const { token, error } = verifyToken(request);
    if (error) {
      return error;
    }

    const body = await request.json();
    const { email } = body;

    // Validate input
    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    }

    console.log("[2FA] Sending OTP to email:", { email });

    // TODO: Integrate with email service
    // 1. Generate a 6-digit OTP
    // 2. Store OTP in cache/database with expiry (5-10 minutes)
    // 3. Send OTP via email (SendGrid, Mailgun, etc.)
    // 4. Return success response

    // Mock OTP generation
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiryTime = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    console.log("[2FA] Generated OTP:", otp, "Expires at:", expiryTime);

    return NextResponse.json(
      {
        message: "OTP sent successfully to your email",
        data: {
          userId: "user-123", // TODO: Extract from JWT token
          email: email,
          expiresAt: expiryTime.toISOString(),
          otpLength: 6,
          // In production, do NOT return the actual OTP to client
          // This is just for development/testing
          otp: process.env.NODE_ENV === "development" ? otp : undefined,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[2FA] Error sending OTP:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/two_step_auth/verify-otp
 * Purpose: Verify OTP and enable 2FA
 * Request body: { email: string, otp: string }
 * Requires: Valid authentication token
 */
export async function PATCH(request: NextRequest) {
  try {
    // Verify token before allowing 2FA verification
    const { token, error } = verifyToken(request);
    if (error) {
      return error;
    }

    const body = await request.json();
    const { email, otp } = body;

    // Validate input
    if (!email || !otp) {
      return NextResponse.json(
        { message: "Email and OTP are required" },
        { status: 400 }
      );
    }

    if (otp.length !== 6 || !/^\d+$/.test(otp)) {
      return NextResponse.json(
        { message: "OTP must be a 6-digit number" },
        { status: 400 }
      );
    }

    console.log("[2FA] Verifying OTP:", { email, otp });

    // TODO: Integrate with cache/database
    // 1. Retrieve stored OTP for this email
    // 2. Check if OTP matches and is not expired
    // 3. If valid:
    //    - Generate backup codes
    //    - Enable 2FA in database
    //    - Store secret key
    // 4. Return backup codes and confirmation

    const isValid = true; // TODO: Compare with stored OTP
    
    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid or expired OTP" },
        { status: 400 }
      );
    }

    // Generate backup codes
    const backupCodes = Array.from({ length: 8 }, () =>
      Math.random().toString(36).substring(2, 10).toUpperCase()
    );

    console.log("[2FA] 2FA setup completed for email:", email);

    return NextResponse.json(
      {
        message: "Two-factor authentication enabled successfully",
        data: {
          userId: "user-123", // TODO: Extract from JWT token
          email: email,
          twoFactorEnabled: true,
          backupCodes: backupCodes,
          enabledAt: new Date().toISOString(),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[2FA] Error verifying OTP:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/two_step_auth/status
 * Purpose: Get 2FA status for current user
 * Requires: Valid authentication token
 */
export async function GET(request: NextRequest) {
  try {
    // Verify token
    const { token, error } = verifyToken(request);
    if (error) {
      return error;
    }

    console.log("[2FA] Fetching 2FA status");

    // TODO: Fetch from database
    const status = {
      userId: "user-123", // TODO: Extract from JWT token
      twoFactorEnabled: false,
      backupCodesRemaining: 0,
      lastModified: null,
    };

    return NextResponse.json(
      {
        message: "2FA status retrieved successfully",
        data: status,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[2FA] Error fetching status:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/two_step_auth
 * Purpose: Disable 2FA
 * Request body: { password: string }
 * Requires: Valid authentication token
 */
export async function DELETE(request: NextRequest) {
  try {
    // Verify token
    const { token, error } = verifyToken(request);
    if (error) {
      return error;
    }

    const body = await request.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json(
        { message: "Password is required to disable 2FA" },
        { status: 400 }
      );
    }

    console.log("[2FA] Disabling 2FA");

    // TODO: Integrate with backend
    // 1. Verify password
    // 2. Disable 2FA in database
    // 3. Clear backup codes
    // 4. Log security event

    return NextResponse.json(
      {
        message: "Two-factor authentication disabled successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[2FA] Error disabling 2FA:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
