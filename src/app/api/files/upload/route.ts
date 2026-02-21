import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth-utils";

/**
 * POST /api/files/upload
 * Purpose: Proxy file uploads to backend API
 * Requires: Valid authentication token
 */
export async function POST(request: NextRequest) {
  try {
    // Verify token before allowing upload
    const { token, error } = verifyToken(request);
    if (error) {
      return error;
    }

    // Get FormData from request
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const userId = formData.get("userId") as string;

    if (!file) {
      return NextResponse.json(
        { message: "No file provided" },
        { status: 400 }
      );
    }

    if (!userId) {
      return NextResponse.json(
        { message: "No userId provided" },
        { status: 400 }
      );
    }

    // Validate file
    const validMimeTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!validMimeTypes.includes(file.type)) {
      return NextResponse.json(
        { message: "Invalid file type. Only JPEG, PNG, GIF, and WebP allowed" },
        { status: 400 }
      );
    }

    const maxFileSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxFileSize) {
      return NextResponse.json(
        { message: "File size must be less than 2MB" },
        { status: 400 }
      );
    }

    console.log(`[Files.upload] Uploading file for user ${userId}:`, {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type
    });

    // Create FormData to send to backend
    const backendFormData = new FormData();
    backendFormData.append("file", file);
    backendFormData.append("userId", userId);

    // Call backend API
    const backendResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/files/upload`,
      {
        method: "POST",
        body: backendFormData,
        headers: {
          Authorization: `Bearer ${token}`
        },
        credentials: "omit" // Don't send cookies to backend
      }
    );

    if (!backendResponse.ok) {
      const errorData = await backendResponse.text().catch(() => "Upload failed");
      console.error(`[Files.upload] Backend error:`, {
        status: backendResponse.status,
        statusText: backendResponse.statusText,
        body: errorData
      });
      
      return NextResponse.json(
        { message: `Backend upload failed: ${backendResponse.statusText}` },
        { status: backendResponse.status }
      );
    }

    const backendData = await backendResponse.json();

    console.log(`[Files.upload] Backend response:`, backendData);

    // Return backend response to frontend
    return NextResponse.json(
      {
        message: "File uploaded successfully",
        url: backendData.imageUrl || backendData.url,
        fileName: backendData.fileName || file.name,
        imageUrl: backendData.imageUrl,
        full: backendData
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Files.upload] Error:", error);
    return NextResponse.json(
      { message: `Internal server error: ${error instanceof Error ? error.message : "Unknown error"}` },
      { status: 500 }
    );
  }
}
