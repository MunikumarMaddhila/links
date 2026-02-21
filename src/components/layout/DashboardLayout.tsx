"use client";

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { MobileNav } from './MobileNav';
import { MobileDrawer } from './MobileDrawer';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      console.log("No user found after auth check, redirecting to home");
      router.replace("/");
    }
  }, [user, isLoading, router]);

  // Smooth full-page loader during auth check
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-4 border-muted" />
            <div className="absolute inset-0 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin" />
          </div>
          <p className="text-sm font-medium text-muted-foreground animate-pulse">Loading...</p>
        </motion.div>
      </div>
    );
  }

  // If not loading and no user, don't render (redirect will happen)
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <MobileDrawer open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="md:ml-[260px] flex flex-col min-h-screen transition-all duration-200">
        <TopBar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        
        <AnimatePresence mode="wait">
          <motion.main
            key="dashboard-main"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ isolation: 'auto' }}
            className="flex-1 p-4 md:p-6 pb-24 md:pb-6 mt-16"
          >
            {children}
          </motion.main>
        </AnimatePresence>
      </div>

      <MobileNav />
    </div>
  );
}
