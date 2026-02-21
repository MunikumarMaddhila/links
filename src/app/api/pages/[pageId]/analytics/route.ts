import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth-utils';

export async function GET(request: NextRequest, { params }: { params: { pageId: string } }) {
    // Simulate auth check (optional for public analytics, but good for admin view)
    // const { error } = verifyToken(request);
    // if (error) return error;

    // Mock data
    const data = {
        totalClicks: 12453,
        ctr: 4.8,
        activeLinks: 8,
        returningVisitors: "42%"
    };

    return NextResponse.json(data);
}
