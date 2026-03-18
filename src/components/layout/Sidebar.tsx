"use client";

import { useState, type ElementType, memo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Link as LinkIcon,
  Users,
  Settings,
  BarChart3,
  Palette,
  Shield,
  Building2,
  CreditCard,
  Bell,
  Globe,
  ChevronLeft,
  ChevronRight,
  Zap,
  Layers,
  Layout,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface NavItem {
  label: string;
  href: string;
  icon: ElementType;
  roles: (UserRole | string)[]; // Accept any string for flexibility
  badge?: string;
}

const navItems: NavItem[] = [
  // Super Admin Items
  { label: 'Platform Dashboard', href: '/super-admin', icon: LayoutDashboard, roles: ['super_admin'] },
  { label: 'All Organizations', href: '/super-admin/organizations', icon: Building2, roles: ['super_admin'] },
  { label: 'User Management', href: '/super-admin/users', icon: Users, roles: ['super_admin'] },
  { label: 'Feature Toggles', href: '/super-admin/features', icon: Zap, roles: ['super_admin'] },
  { label: 'Themes & Templates', href: '/super-admin/themes', icon: Palette, roles: ['super_admin'] },
  { label: 'Billing Overview', href: '/super-admin/billing', icon: CreditCard, roles: ['super_admin'] },
  { label: 'Security & Audit', href: '/super-admin/security', icon: Shield, roles: ['super_admin'] },
  
  // Admin Items
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard, roles: ['admin'] },
  { label: 'Team Members', href: '/admin/team', icon: Users, roles: ['admin'] },
  { label: 'Link Collections', href: '/admin/collections', icon: Layers, roles: ['admin'] },
  { label: 'Analytics', href: '/admin/analytics', icon: BarChart3, roles: ['admin'] },
  { label: 'Branding', href: '/admin/branding', icon: Palette, roles: ['admin'] },
  { label: 'Notifications', href: '/admin/notifications', icon: Bell, roles: ['admin'], badge: '3' },
  
  // User Items
  { label: 'My Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: ['user'] },
  { label: 'My Links', href: '/dashboard/links', icon: LinkIcon, roles: ['user'] },
  { label: 'Analytics', href: '/dashboard/analytics', icon: BarChart3, roles: ['user'] },
  { label: 'Appearance', href: '/dashboard/appearance', icon: Palette, roles: ['user'] },
  { label: 'Themes', href: '/dashboard/themes', icon: Layout, roles: ['user'] },
  { label: 'My Page', href: '/dashboard/preview', icon: Globe, roles: ['user'] },
  
  // Common Items
  { label: 'Settings', href: '/settings', icon: Settings, roles: ['super_admin', 'admin', 'user'] },
];

function SidebarContent() {
  const { user } = useAuth();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  if (!user) {
    return null;
  }

  // Extract role and normalize to lowercase
  // Handle both string roles (e.g., "USER") and object roles (e.g., {id, name})
  const userRole = typeof user.role === 'string' 
    ? user.role.toLowerCase() 
    : user.role?.name?.toLowerCase() || '';

  const filteredItems = navItems.filter(item => item.roles.includes(userRole as UserRole));

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className="hidden md:flex flex-col h-screen bg-card border-r border-border fixed left-0 top-0"
      style={{ zIndex: 50 }}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-border">
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <LinkIcon className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg">LinkHub</span>
            </motion.div>
          )}
        </AnimatePresence>
        {collapsed && (
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center mx-auto">
            <LinkIcon className="w-4 h-4 text-primary-foreground" />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-3">
          {filteredItems.map((item) => {
            // Fix: Only exact match for /dashboard, or startsWith for other routes
            const isActive = item.href === '/dashboard' 
              ? pathname === '/dashboard'
              : pathname === item.href || pathname?.startsWith(`${item.href}/`);
            const Icon = item.icon;

            const linkContent = (
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-glow"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
              >
                <Icon className={cn("w-5 h-5 shrink-0", isActive && "text-primary-foreground")} />
                <AnimatePresence mode="wait">
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      className="text-sm font-medium whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {!collapsed && item.badge && (
                  <span className="ml-auto text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full font-medium">
                    {item.badge}
                  </span>
                )}
              </Link>
            );

            if (collapsed) {
              return (
                <li key={item.href}>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      {linkContent}
                    </TooltipTrigger>
                    <TooltipContent side="right" className="font-medium">
                      {item.label}
                      {item.badge && ` (${item.badge})`}
                    </TooltipContent>
                  </Tooltip>
                </li>
              );
            }

            return <li key={item.href}>{linkContent}</li>;
          })}
        </ul>
      </nav>

      {/* Collapse Toggle */}
      <div className="p-3 border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="w-full justify-center"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>
    </motion.aside>
  );
}

// Memoize the Sidebar component to prevent unnecessary re-renders
// This ensures the Sidebar only re-renders when its props or auth context actually changes
// not on every parent component update
export const Sidebar = memo(SidebarContent);
