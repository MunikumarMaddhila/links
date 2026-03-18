import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

/**
 * Proxy API route for individual link operations
 */

// DELETE /api/pages/{pageId}/links/{linkId} - Delete a link
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ pageId: string; linkId: string }> }
) {
  try {
    const { pageId, linkId } = await params;
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const backendResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/pages/${pageId}/links/${linkId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      }
    );

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json().catch(() => ({}));
      return NextResponse.json(errorData, { status: backendResponse.status });
    }

    const data = await backendResponse.json().catch(() => ({}));
    return NextResponse.json(data);
  } catch (error) {
    console.error("Links API error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
