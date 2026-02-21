import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth-utils";

/**
 * POST /api/users/profile/image
 * Purpose: Upload and save profile image
 * Request body: FormData with 'image' field containing base64 or file
 * Alternative: { imageUrl: string, imageName: string }
 * Requires: Valid authentication token
 */
export async function POST(request: NextRequest) {
  try {
    // Verify token before allowing image upload
    const { token, error } = verifyToken(request);
    if (error) {
      return error;
    }

    const contentType = request.headers.get("content-type");
    let imageData = null;
    let imageName = null;

    // Handle FormData submission
    if (contentType?.includes("multipart/form-data")) {
      const formData = await request.formData();
      const file = formData.get("image") as File;
      
      if (!file) {
        return NextResponse.json(
          { message: "Image file is required" },
          { status: 400 }
        );
      }

      // Validate file size (2MB max)
      if (file.size > 2 * 1024 * 1024) {
        return NextResponse.json(
          { message: "File size must be less than 2MB" },
          { status: 400 }
        );
      }

      // Validate file type
      const validMimeTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      if (!validMimeTypes.includes(file.type)) {
        return NextResponse.json(
          { message: "Invalid file type. Allowed: JPEG, PNG, GIF, WebP" },
          { status: 400 }
        );
      }

      // Convert file to base64
      const buffer = await file.arrayBuffer();
      imageData = Buffer.from(buffer).toString("base64");
      imageName = file.name;

      console.log("[Profile Image] Received file upload:", { 
        fileName: imageName, 
        fileSize: file.size, 
        mimeType: file.type 
      });
    } else {
      // Handle JSON submission (base64 image)
      const body = await request.json();
      const { imageUrl, imageName: name, imageBase64 } = body;

      if (!imageBase64 && !imageUrl) {
        return NextResponse.json(
          { message: "Either imageBase64 or imageUrl is required" },
          { status: 400 }
        );
      }

      imageData = imageBase64 || imageUrl;
      imageName = name || "profile-image";
    }

    if (!imageData) {
      return NextResponse.json(
        { message: "No image data provided" },
        { status: 400 }
      );
    }

    console.log("[Profile Image] Saving profile image:", { imageName, dataLength: imageData.length });

    // TODO: Integrate with backend
    // 1. Save image to Cloud Storage (S3, Azure Blob, etc.) or database
    // 2. Get back the image URL/path
    // 3. Update user's profile_image field in users table
    // 4. Return the saved image URL

    const result = {
      userId: "user-123", // TODO: Extract from JWT token
      imageUrl: `https://your-cdn.com/profile-images/${imageName}`, // TODO: Replace with actual URL
      imageName: imageName,
      size: imageData.length,
      savedAt: new Date().toISOString()
    };

    return NextResponse.json(
      {
        message: "Profile image saved successfully",
        data: result
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Profile Image] Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/users/profile/image
 * Purpose: Get current profile image
 * Requires: Valid authentication token
 */
export async function GET(request: NextRequest) {
  try {
    // Verify token
    const { token, error } = verifyToken(request);
    if (error) {
      return error;
    }

    console.log("[Profile Image] Fetching profile image");

    // TODO: Fetch from database
    const profileImage = {
      userId: "user-123", // TODO: Extract from JWT token
      imageUrl: null, // TODO: Fetch actual image URL from database
      imageName: null,
      uploadedAt: null
    };

    return NextResponse.json(
      {
        message: "Profile image retrieved successfully",
        data: profileImage
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Profile Image] Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/users/profile/image
 * Purpose: Delete profile image
 * Requires: Valid authentication token
 */
export async function DELETE(request: NextRequest) {
  try {
    // Verify token
    const { token, error } = verifyToken(request);
    if (error) {
      return error;
    }

    console.log("[Profile Image] Deleting profile image");

    // TODO: Integrate with backend
    // 1. Delete image from Cloud Storage
    // 2. Clear user's profile_image field in database
    // 3. Return success response

    return NextResponse.json(
      {
        message: "Profile image deleted successfully"
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Profile Image] Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
