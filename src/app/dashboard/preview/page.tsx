"use client";

import { motion } from "framer-motion";
import { Share2 } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { PublicProfile } from "@/components/public/PublicProfile";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

function PreviewContent() {
  const { user } = useAuth();
  const usernameSlug = user?.name ? user.name.toLowerCase().replace(/\s+/g, "") : undefined;

  const handleCopyLink = async () => {
    const targetUsername = usernameSlug ?? "jordansmith";
    const url = `${window.location.origin}/${targetUsername}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Public link copied to clipboard");
    } catch (error) {
      console.error(error);
      toast.error("Unable to copy link. Please try again.");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-2xl md:text-3xl font-bold">My Page Preview</h1>
          <p className="text-muted-foreground mt-1">
            Review how your public profile appears before sharing it with the world.
          </p>
        </motion.div>

        <Card>
          <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle className="text-lg">Live Preview</CardTitle>
              <p className="text-sm text-muted-foreground">Updates reflect instantly after you edit your links or theme.</p>
            </div>
            <Button variant="outline" className="gap-2" onClick={handleCopyLink}>
              <Share2 className="w-4 h-4" />
              Copy Public Link
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center rounded-3xl bg-muted/30 p-4">
              <div className="w-full max-w-[420px]">
                <PublicProfile username={usernameSlug} embedded />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

export default function DashboardPreviewPage() {
  return (
    <ProtectedRoute allowedRoles={["user"]}>
      <PreviewContent />
    </ProtectedRoute>
  );
}
