"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { SuperAdminDashboardView } from "@/components/dashboard/views/SuperAdminDashboardView";

export default function SuperAdminCatchAllPage() {
  return (
    <ProtectedRoute allowedRoles={["super_admin"]}>
      <SuperAdminDashboardView />
    </ProtectedRoute>
  );
}
