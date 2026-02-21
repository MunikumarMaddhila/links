import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { pageId: string } }) {
    // Mock data
    const data = [
        { id: '1', title: 'My Portfolio', url: 'https://portfolio.com', clicks: 4521, ctr: 12.5 },
        { id: '2', title: 'Twitter / X', url: 'https://twitter.com', clicks: 3240, ctr: 8.2 },
        { id: '3', title: 'YouTube Channel', url: 'https://youtube.com', clicks: 2105, ctr: 5.4 },
        { id: '4', title: 'Newsletter', url: 'https://substack.com', clicks: 1890, ctr: 4.8 },
        { id: '5', title: 'Shop', url: 'https://shop.com', clicks: 954, ctr: 2.1 },
    ];

    return NextResponse.json(data);
}
