"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { SuperAdminDashboardView } from "@/components/dashboard/views/SuperAdminDashboardView";

export default function SuperAdminDashboardPage() {
  return (
    // Temporarily disabled ProtectedRoute to debug
    <SuperAdminDashboardView />
  );
}
