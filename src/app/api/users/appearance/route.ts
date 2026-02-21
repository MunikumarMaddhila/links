import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth-utils';

export async function PATCH(request: NextRequest) {
  try {
    // Verify authentication token
    const { token, error } = verifyToken(request);
    if (error) {
      return error;
    }
    const body = await request.json();

    const {
      profileName,
      profileBio,
      profileImage,
      colorThemeId,
      buttonStyle,
      fontStyle,
    } = body;

    // Validate required fields
    if (!profileName || !colorThemeId || !buttonStyle || !fontStyle) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate button style
    const validButtonStyles = ['rounded', 'pill', 'sharp', 'outline', 'icon-left', 'icon-left-rounded', 'icon-circle', 'icon-float'];
    if (!validButtonStyles.includes(buttonStyle)) {
      return NextResponse.json(
        { error: 'Invalid button style' },
        { status: 400 }
      );
    }

    // Validate font style
    const validFontStyles = ['inter', 'serif', 'mono'];
    if (!validFontStyles.includes(fontStyle)) {
      return NextResponse.json(
        { error: 'Invalid font style' },
        { status: 400 }
      );
    }

    // TODO: Save to database
    // This is a mock response - replace with actual database save
    const appearanceSettings = {
      userId: 'user-123', // TODO: Extract from decoded JWT token
      profileName,
      profileBio,
      profileImage: profileImage ? 'image-url-from-backend' : null,
      colorThemeId,
      buttonStyle,
      fontStyle,
      updatedAt: new Date().toISOString(),
    };

    console.log('Saving appearance settings:', appearanceSettings);

    return NextResponse.json(
      {
        message: 'Appearance settings saved successfully',
        data: appearanceSettings,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error saving appearance settings:', error);
    return NextResponse.json(
      { error: 'Failed to save appearance settings' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Verify authentication token
    const { token, error } = verifyToken(request);
    if (error) {
      return error;
    }

    // TODO: Fetch from database
    // Mock response
    const appearanceSettings = {
      userId: 'user-123', // TODO: Extract from decoded JWT token
      profileName: 'Your Name',
      profileBio: 'Your bio here',
      profileImage: null,
      colorThemeId: 'default',
      buttonStyle: 'rounded',
      fontStyle: 'inter',
    };

    return NextResponse.json(appearanceSettings, { status: 200 });
  } catch (error) {
    console.error('Error fetching appearance settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch appearance settings' },
      { status: 500 }
    );
  }
}
