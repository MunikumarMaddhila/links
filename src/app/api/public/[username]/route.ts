import { NextRequest, NextResponse } from 'next/server';
import { colorThemes } from '@/contexts/ThemeContext';

export async function GET(request: NextRequest, { params }: { params: { username: string } }) {
    const { username } = params;

    // Mock data - In a real app, you'd fetch this from DB based on username
    // For now, we'll return a default structure that matches what ThemeContext expects

    // Try to simulate different users if needed, or just return standard mock
    const profileData = {
        username: username,
        profile: {
            name: "Jordan Smith", // This would come from DB
            bio: "Digital creator & designer ✨ Building beautiful products and sharing the journey.",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=jordan",
        },
        theme: {
            colorThemeId: 'ocean', // Default to ocean
            buttonStyle: 'rounded',
            fontStyle: 'inter',
            backgroundPattern: 'none'
        },
        links: [
            { id: "1", title: "🎨 My Portfolio", url: "https://portfolio.example.com", enabled: true },
            { id: "2", title: "🐦 Twitter / X", url: "https://twitter.com/username", enabled: true },
            { id: "3", title: "📧 Weekly Newsletter", url: "https://newsletter.example.com", enabled: true },
            { id: "4", title: "📺 YouTube Channel", url: "https://youtube.com/@username", enabled: true },
            { id: "5", title: "🛍️ Shop My Products", url: "https://shop.example.com", enabled: true },
        ],
        socials: {
            twitter: "jordan_dev",
            instagram: "jordan_design",
            github: "jordan-smith"
        }
    };

    // If the user has saved settings in the session (simulated), we might want to return those
    // But since this is a public API, it should read from a persistent store.
    // We'll stick to returning a robust mock that the frontend can render.

    return NextResponse.json(profileData);
}
