"use client";

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { MobileNav } from './MobileNav';
import { MobileDrawer } from './MobileDrawer';
import { useAuth } from '@/contexts/AuthContext';

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
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-4 border-muted" />
            <div className="absolute inset-0 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin" />
          </div>
          <p className="text-sm font-medium text-muted-foreground animate-pulse">Loading...</p>
        </div>
      </div>
    );
  }

  // If not loading and no user, don't render (redirect will happen)
  if (!user) {
    return null;
  }

  return (
    <>
      {/* Fixed elements */}
      <TopBar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar />
      <MobileDrawer open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <MobileNav />
      
      {/* Main content wrapper */}
      <div className="min-h-screen bg-background md:ml-[260px]">
        <main className="pt-16 p-4 md:p-6 md:pt-20 pb-24 md:pb-6">
          {children}
        </main>
      </div>
    </>
  );
}
