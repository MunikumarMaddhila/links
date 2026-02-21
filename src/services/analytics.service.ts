import { http } from "./http";

export const AnalyticsService = {
    // Get analytics summary for a page
    getAnalytics: (pageId: string) =>
        http.get(`/api/pages/${pageId}/analytics`),

    // Get click data over time (for charts)
    getClicksOverTime: (pageId: string, period: string = '7d') =>
        http.get(`/api/pages/${pageId}/analytics/clicks`, { params: { period } }),

    // Get top performing links
    getTopLinks: (pageId: string) =>
        http.get(`/api/pages/${pageId}/analytics/top-links`),

    // Get device breakdown
    getDeviceBreakdown: (pageId: string) =>
        http.get(`/api/pages/${pageId}/analytics/devices`),

    // Get location data
    getLocations: (pageId: string) =>
        http.get(`/api/pages/${pageId}/analytics/locations`),
};
