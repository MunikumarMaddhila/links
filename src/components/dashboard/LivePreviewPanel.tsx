"use client";

import { motion } from "framer-motion";
import { Smartphone, ExternalLink } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import { LayoutRenderer } from "@/components/themes/LayoutRenderer";
import { defaultProfileData } from "@/components/themes/layouts";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface LivePreviewPanelProps {
  className?: string;
  showHeader?: boolean;
}

export function LivePreviewPanel({ className, showHeader = true }: LivePreviewPanelProps) {
  const { layoutThemeId } = useTheme();
  const { user } = useAuth();

  // Build profile data from user info
  const profileData = {
    ...defaultProfileData,
    name: user?.name || defaultProfileData.name,
    username: user?.name?.toLowerCase().replace(/\s+/g, "") || defaultProfileData.username,
    avatar: user?.avatar || defaultProfileData.avatar,
  };

  // Format theme name for display
  const themeName = layoutThemeId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <div className={className}>
      <div className="sticky top-20">
        <div className="live-preview-panel rounded-lg border-0 shadow-lg bg-background">
          {showHeader && (
            <div className="flex flex-col space-y-1.5 p-6 pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                    <Smartphone className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Live Preview</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{themeName}</p>
                  </div>
                </div>
                <Link href="/dashboard/themes">
                  <Button variant="ghost" size="sm" className="text-xs gap-1 h-7 text-gray-700 dark:text-gray-300">
                    <ExternalLink className="w-3 h-3" />
                    Themes
                  </Button>
                </Link>
              </div>
            </div>
          )}
          <div className={showHeader ? "p-4 pt-0" : "p-4 pt-2"}>
            {/* Phone Frame Container */}
            <div className="flex justify-center py-1">
              <motion.div
                key={layoutThemeId}
                initial={{ opacity: 0.8, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                {/* Glow effect behind phone */}
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl rounded-full opacity-50" />
                
                {/* Phone shadow */}
                <div className="absolute inset-4 bg-black/20 blur-2xl rounded-[40px]" />
                
                {/* Phone body */}
                <div
                  className="relative rounded-[36px] overflow-hidden bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900 border border-gray-600/50"
                  style={{
                    width: 280,
                    height: 580,
                    padding: "10px",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
                  }}
                >
                  {/* Dynamic Island */}
                  <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-[90px] h-[26px] bg-black rounded-full z-20 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-800 mr-5" />
                  </div>
                  
                  {/* Screen Content */}
                  <div className="phone-screen h-full w-full overflow-y-auto bg-white rounded-[32px] relative">
                    <LayoutRenderer profile={profileData} embedded />
                  </div>
                  
                  {/* Home indicator */}
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-20 h-1 bg-white/40 rounded-full" />
                </div>
              </motion.div>
            </div>

            {/* Status indicator */}
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs text-muted-foreground">Live updates enabled</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
