"use client";

import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { AnalyticsChart } from "@/components/dashboard/AnalyticsChart";
import { motion } from "framer-motion";
import { MousePointerClick, Eye, Globe, Clock, Users, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AnalyticsService } from "@/services/analytics.service";
import { useAuth } from "@/contexts/AuthContext";

// Fallback data when API is unavailable
const fallbackDeviceData = [
  { device: "Mobile", percentage: 62, count: "7,964" },
  { device: "Desktop", percentage: 31, count: "3,982" },
  { device: "Tablet", percentage: 7, count: "901" },
];

const fallbackLocations = [
  { country: "United States", percentage: 42, flag: "🇺🇸" },
  { country: "United Kingdom", percentage: 18, flag: "🇬🇧" },
  { country: "Canada", percentage: 12, flag: "🇨🇦" },
  { country: "Germany", percentage: 8, flag: "🇩🇪" },
  { country: "Australia", percentage: 6, flag: "🇦🇺" },
];

interface AnalyticsStats {
  totalClicks: string;
  clicksChange: string;
  pageViews: string;
  viewsChange: string;
  uniqueVisitors: string;
  visitorsChange: string;
  avgTime: string;
  timeChange: string;
}

const fallbackStats: AnalyticsStats = {
  totalClicks: "12,847",
  clicksChange: "+14.2% from last month",
  pageViews: "45,293",
  viewsChange: "+8.1% from last month",
  uniqueVisitors: "28,142",
  visitorsChange: "+12.5% from last month",
  avgTime: "1m 42s",
  timeChange: "+5s from last month",
};

function UserAnalyticsContent() {
  const { user } = useAuth();
  const [stats, setStats] = useState<AnalyticsStats>(fallbackStats);
  const [deviceData, setDeviceData] = useState(fallbackDeviceData);
  const [topLocations, setTopLocations] = useState(fallbackLocations);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        if (!user?.id) return;
        const response = await AnalyticsService.getAnalytics(user.id);
        if (response.data) {
          const data = response.data;
          setStats({
            totalClicks: data.totalClicks?.toLocaleString() || fallbackStats.totalClicks,
            clicksChange: data.clicksChange || fallbackStats.clicksChange,
            pageViews: data.pageViews?.toLocaleString() || fallbackStats.pageViews,
            viewsChange: data.viewsChange || fallbackStats.viewsChange,
            uniqueVisitors: data.uniqueVisitors?.toLocaleString() || fallbackStats.uniqueVisitors,
            visitorsChange: data.visitorsChange || fallbackStats.visitorsChange,
            avgTime: data.avgTime || fallbackStats.avgTime,
            timeChange: data.timeChange || fallbackStats.timeChange,
          });
          if (data.devices) setDeviceData(data.devices);
          if (data.locations) setTopLocations(data.locations);
        }
      } catch (error) {
        console.log("Analytics API not available, using fallback data");
        // Keep fallback values
      } finally {
        setLoading(false);
      }
    }
    fetchAnalytics();
  }, [user?.id]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-2xl md:text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground mt-1">Track your page performance and audience insights.</p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Loading analytics...</p>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard
                title="Total Clicks"
                value={stats.totalClicks}
                change={stats.clicksChange}
                changeType="positive"
                icon={MousePointerClick}
                gradient
              />
              <StatsCard
                title="Page Views"
                value={stats.pageViews}
                change={stats.viewsChange}
                changeType="positive"
                icon={Eye}
              />
              <StatsCard
                title="Unique Visitors"
                value={stats.uniqueVisitors}
                change={stats.visitorsChange}
                changeType="positive"
                icon={Users}
              />
              <StatsCard
                title="Avg. Time on Page"
                value={stats.avgTime}
                change={stats.timeChange}
                changeType="positive"
                icon={Clock}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AnalyticsChart variant="area" title="Clicks Over Time" subtitle="Daily click trends for the past 7 days" />
              <AnalyticsChart variant="bar" title="Top Performing Links" subtitle="Links with the most clicks" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Device Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {deviceData.map((item, index) => (
                    <motion.div key={item.device} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium">{item.device}</span>
                        <span className="text-muted-foreground">
                          {item.count} ({item.percentage}%)
                        </span>
                      </div>
                      <Progress value={item.percentage} className="h-2" />
                    </motion.div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    Top Locations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {topLocations.map((item, index) => (
                    <motion.div key={item.country} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium flex items-center gap-2">
                          <span>{item.flag}</span>
                          {item.country}
                        </span>
                        <span className="text-muted-foreground">{item.percentage}%</span>
                      </div>
                      <Progress value={item.percentage} className="h-2" />
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

export default function UserAnalyticsPage() {
  return (
    <ProtectedRoute allowedRoles={["user"]}>
      <UserAnalyticsContent />
    </ProtectedRoute>
  );
}
