import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { pageId: string } }) {
    // Mock data
    const data = [
        { country: 'United States', city: 'New York', count: 4500, percentage: 35 },
        { country: 'United Kingdom', city: 'London', count: 2100, percentage: 18 },
        { country: 'Canada', city: 'Toronto', count: 1800, percentage: 14 },
        { country: 'Germany', city: 'Berlin', count: 1200, percentage: 9 },
        { country: 'India', city: 'Mumbai', count: 950, percentage: 7 },
    ];

    return NextResponse.json(data);
}
