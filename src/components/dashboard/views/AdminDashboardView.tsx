"use client";

import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { AnalyticsChart } from "@/components/dashboard/AnalyticsChart";
import { useAuth } from "@/contexts/AuthContext";
import { Users, Link as LinkIcon, BarChart3, TrendingUp, Bell, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const teamMembers = [
  { id: "1", name: "Sarah Chen", role: "Content Creator", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah", clicks: 4820 },
  { id: "2", name: "Mike Rodriguez", role: "Marketing", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike", clicks: 3250 },
  { id: "3", name: "Emma Wilson", role: "Designer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma", clicks: 2840 },
  { id: "4", name: "James Lee", role: "Developer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=james", clicks: 1920 },
];

const recentActivity = [
  { id: "1", message: "Sarah Chen added a new link", time: "5 min ago", type: "link" },
  { id: "2", message: "New team member joined", time: "1 hour ago", type: "team" },
  { id: "3", message: 'Campaign "Summer Sale" reached 10k clicks', time: "3 hours ago", type: "milestone" },
  { id: "4", message: "Brand colors updated", time: "1 day ago", type: "branding" },
];

export function AdminDashboardView() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-2xl md:text-3xl font-bold">{user?.organizationName} Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage your team and track organization performance.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3">
            <Button variant="outline">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
              <Badge variant="destructive" className="ml-2">
                3
              </Badge>
            </Button>
            <Button className="gradient-primary text-primary-foreground shadow-glow">Invite Member</Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="Team Members" value="12" change="+2 this month" changeType="positive" icon={Users} gradient />
          <StatsCard title="Total Links" value="847" change="+24 this week" changeType="positive" icon={LinkIcon} />
          <StatsCard title="Total Clicks" value="284.5K" change="+18.3% this month" changeType="positive" icon={BarChart3} />
          <StatsCard title="Avg. CTR" value="32.1%" change="+4.2% this month" changeType="positive" icon={TrendingUp} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <AnalyticsChart variant="area" title="Organization Performance" subtitle="Total clicks across all team members" />
            <AnalyticsChart variant="bar" title="Top Performing Links" subtitle="Most clicked links this month" />
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Team Performance</CardTitle>
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {teamMembers.map((member, index) => (
                  <motion.div key={member.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.role}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">{member.clicks.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">clicks</p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                  <Activity className="w-4 h-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div key={activity.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent mt-2" />
                    <div className="flex-1">
                      <p className="text-sm">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Plan Usage</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Team Members</span>
                    <span className="font-medium">12 / 25</span>
                  </div>
                  <Progress value={48} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Monthly Clicks</span>
                    <span className="font-medium">284K / 500K</span>
                  </div>
                  <Progress value={57} className="h-2" />
                </div>
                <Button variant="outline" className="w-full mt-2">
                  Upgrade Plan
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
