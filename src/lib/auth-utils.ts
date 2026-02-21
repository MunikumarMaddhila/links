import { NextRequest, NextResponse } from "next/server";

/**
 * Verify that a request has a valid authentication token
 * Checks for accessToken in cookies
 * @param request NextRequest object
 * @returns { token: string, error?: NextResponse } - token if valid, error response if invalid
 */
export function verifyToken(request: NextRequest) {
  try {
    const token = request.cookies.get("accessToken")?.value;

    if (!token) {
      return {
        token: null,
        error: NextResponse.json(
          { message: "Unauthorized: No access token provided" },
          { status: 401 }
        )
      };
    }

    return { token, error: null };
  } catch (error) {
    return {
      token: null,
      error: NextResponse.json(
        { message: "Unauthorized: Token verification failed" },
        { status: 401 }
      )
    };
  }
}

/**
 * Middleware-style protection for API routes
 * Usage: 
 * const { token, error } = verifyToken(request);
 * if (error) return error;
 * // Proceed with authenticated logic
 */
export function withAuth(handler: (request: NextRequest, token: string) => Promise<NextResponse>) {
  return async (request: NextRequest) => {
    const { token, error } = verifyToken(request);
    
    if (error) {
      return error;
    }

    return handler(request, token!);
  };
}
