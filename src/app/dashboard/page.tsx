"use client";

import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { AnalyticsChart } from "@/components/dashboard/AnalyticsChart";
import { LinkList } from "@/components/links/LinkList";
import { LinksProvider } from "@/contexts/LinksContext";
import { useAuth } from "@/contexts/AuthContext";
import { Link as LinkIcon, Eye, MousePointerClick, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

function UserDashboardContent() {
  const { user, isLoading } = useAuth();
  
  console.log("Dashboard - user:", user, "isLoading:", isLoading);

  // Show loading state while auth is being restored
  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <p className="text-lg text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // If loaded but no user, let DashboardLayout handle redirect
  if (!user) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <p className="text-lg text-muted-foreground">Redirecting...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <LinksProvider>
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-2xl md:text-3xl font-bold">Welcome back, {user?.name?.split(" ")[0]}! 👋</h1>
            <p className="text-muted-foreground mt-1">Here's what's happening with your links today.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3">
            <Button variant="outline">View Public Page</Button>
            <Button className="gradient-primary text-primary-foreground shadow-glow">Share Profile</Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Clicks"
            value="12,847"
            change="+14.2% from last month"
            changeType="positive"
            icon={MousePointerClick}
            gradient
          />
          <StatsCard
            title="Page Views"
            value="45,293"
            change="+8.1% from last month"
            changeType="positive"
            icon={Eye}
          />
          <StatsCard title="Active Links" value="12" change="2 scheduled" changeType="neutral" icon={LinkIcon} />
          <StatsCard
            title="Click Rate"
            value="28.4%"
            change="+2.3% from last month"
            changeType="positive"
            icon={TrendingUp}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <LinkList />
          </div>

          <div className="space-y-6">
            <Card className="relative z-1">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Profile Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center text-center p-4 rounded-xl bg-secondary">
                  <Avatar className="w-20 h-20 mb-3">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold">{user?.name}</h3>
                  <p className="text-sm text-muted-foreground">@{user?.name?.toLowerCase().replace(" ", "")}</p>
                  <p className="text-sm text-muted-foreground mt-2">Digital creator & designer ✨</p>
                  <Button variant="outline" size="sm" className="mt-4 w-full">
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            <AnalyticsChart variant="area" title="Weekly Clicks" subtitle="Last 7 days performance" />
          </div>
        </div>
        </div>
      </LinksProvider>
    </DashboardLayout>
  );
}

export default function DashboardPage() {
  return (
    // Temporarily disabled ProtectedRoute to debug
    <UserDashboardContent />
  );
}
