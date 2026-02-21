import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { pageId: string } }) {
    // Mock data
    const data = [
        { name: 'Mobile', value: 65, color: '#3b82f6' }, // blue-500
        { name: 'Desktop', value: 25, color: '#10b981' }, // emerald-500
        { name: 'Tablet', value: 10, color: '#f59e0b' }, // amber-500
    ];

    return NextResponse.json(data);
}
