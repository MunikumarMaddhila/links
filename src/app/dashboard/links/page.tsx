"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { LinkList } from "@/components/links/LinkList";
import { LivePreviewPanel } from "@/components/dashboard/LivePreviewPanel";
import { LinksProvider } from "@/contexts/LinksContext";
import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

function UserLinksContent() {
  return (
    <DashboardLayout>
      <LinksProvider>
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-2xl md:text-3xl font-bold">My Links</h1>
            <p className="text-muted-foreground mt-1">Create and manage your links. Drag to reorder.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Links List - Takes 2 columns */}
            <div className="lg:col-span-2">
              <LinkList />
            </div>

            {/* Live Preview Panel - Takes 1 column, hidden on mobile */}
            <div className="hidden lg:block">
              <LivePreviewPanel />
            </div>
          </div>
        </div>
      </LinksProvider>
    </DashboardLayout>
  );
}

export default function UserLinksPage() {
  return (
    <ProtectedRoute allowedRoles={["user"]}>
      <UserLinksContent />
    </ProtectedRoute>
  );
}
