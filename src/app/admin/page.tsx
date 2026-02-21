"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AdminDashboardView } from "@/components/dashboard/views/AdminDashboardView";

export default function AdminDashboardPage() {
  return (
    // Temporarily disabled ProtectedRoute to debug
    <AdminDashboardView />
  );
}
