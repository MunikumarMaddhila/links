"use client";

import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard-new/StatsCard";
import { AnalyticsChart } from "@/components/dashboard-new/AnalyticsChart";
import { 
  Building2,
  Users,
  Activity,
  DollarSign,
  Shield,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const organizations = [
  { id: "1", name: "Acme Inc", plan: "Enterprise", users: 48, clicks: "1.2M", status: "active", mrr: "$499" },
  { id: "2", name: "TechStart", plan: "Business", users: 24, clicks: "580K", status: "active", mrr: "$199" },
  { id: "3", name: "CreatorHub", plan: "Pro", users: 12, clicks: "320K", status: "active", mrr: "$49" },
  { id: "4", name: "DesignCo", plan: "Business", users: 18, clicks: "410K", status: "trial", mrr: "$0" },
  { id: "5", name: "MediaFlow", plan: "Enterprise", users: 65, clicks: "2.1M", status: "active", mrr: "$499" },
];

const systemAlerts = [
  { id: "1", type: "warning", message: "High API usage detected for CreatorHub", time: "10 min ago" },
  { id: "2", type: "success", message: "MediaFlow upgraded to Enterprise", time: "1 hour ago" },
  { id: "3", type: "info", message: "New organization registration: StartupXYZ", time: "2 hours ago" },
];

export function SuperAdminDashboardView() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-2xl md:text-3xl font-bold">Platform Overview 🚀</h1>
            <p className="text-muted-foreground mt-1">Monitor and manage the entire LinkHub platform.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3">
            <Button variant="outline">
              <Shield className="w-4 h-4 mr-2" />
              Security Logs
            </Button>
            <Button className="gradient-primary text-primary-foreground shadow-glow">System Settings</Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="Total Organizations" value="2,847" change="+124 this month" changeType="positive" icon={Building2} gradient />
          <StatsCard title="Total Users" value="48.5K" change="+2.4K this month" changeType="positive" icon={Users} />
          <StatsCard title="Monthly Revenue" value="$127.4K" change="+18.2% growth" changeType="positive" icon={DollarSign} />
          <StatsCard title="Platform Uptime" value="99.98%" change="Last 30 days" changeType="neutral" icon={Activity} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Top Organizations</CardTitle>
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Organization</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Users</TableHead>
                      <TableHead>Clicks</TableHead>
                      <TableHead>MRR</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {organizations.map((org, index) => (
                      <motion.tr key={org.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="group">
                        <TableCell className="font-medium">{org.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{org.plan}</Badge>
                        </TableCell>
                        <TableCell>{org.users}</TableCell>
                        <TableCell>{org.clicks}</TableCell>
                        <TableCell className="font-medium">{org.mrr}</TableCell>
                        <TableCell>
                          <Badge className={org.status === "active" ? "bg-success/10 text-success border-success/20" : "bg-warning/10 text-warning border-warning/20"}>
                            {org.status}
                          </Badge>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <AnalyticsChart variant="area" title="Platform Growth" subtitle="Daily active users across all organizations" />
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">System Alerts</CardTitle>
                  <Badge variant="outline">3 new</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {systemAlerts.map((alert, index) => (
                  <motion.div key={alert.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                    {alert.type === "warning" && <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0" />}
                    {alert.type === "success" && <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />}
                    {alert.type === "info" && <Clock className="w-5 h-5 text-primary flex-shrink-0" />}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">{alert.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Revenue by Plan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Enterprise</span>
                    <span className="text-muted-foreground">$68.4K (54%)</span>
                  </div>
                  <Progress value={54} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Business</span>
                    <span className="text-muted-foreground">$38.2K (30%)</span>
                  </div>
                  <Progress value={30} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Pro</span>
                    <span className="text-muted-foreground">$20.8K (16%)</span>
                  </div>
                  <Progress value={16} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-accent border-transparent">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-accent-foreground/10">
                    <TrendingUp className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-accent-foreground/80">Growth Rate</p>
                    <p className="text-2xl font-bold text-accent-foreground">+24.8%</p>
                    <p className="text-xs text-accent-foreground/60">vs. last month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
