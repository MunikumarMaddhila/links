import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { pageId: string } }) {
    const searchParams = request.nextUrl.searchParams;
    const period = searchParams.get('period') || '7d';

    // Mock data based on period
    let data = [];
    const now = new Date();

    const days = period === '24h' ? 24 : period === '30d' ? 30 : 7;

    for (let i = days; i >= 0; i--) {
        const date = new Date(now);
        if (period === '24h') {
            date.setHours(now.getHours() - i);
            data.push({
                date: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                clicks: Math.floor(Math.random() * 50) + 10
            });
        } else {
            date.setDate(now.getDate() - i);
            data.push({
                date: date.toLocaleDateString([], { month: 'short', day: 'numeric' }),
                clicks: Math.floor(Math.random() * 500) + 100
            });
        }
    }

    return NextResponse.json(data);
}
