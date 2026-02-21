"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AdminDashboardView } from "@/components/dashboard/views/AdminDashboardView";

export default function AdminCatchAllPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminDashboardView />
    </ProtectedRoute>
  );
}
