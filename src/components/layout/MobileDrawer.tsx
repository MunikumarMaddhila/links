"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { type ElementType } from 'react';
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
  Zap,
  Layers,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavItem {
  label: string;
  href: string;
  icon: ElementType;
  roles: (UserRole | string)[];
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
  { label: 'My Page', href: '/dashboard/preview', icon: Globe, roles: ['user'] },
  
  // Common Items
  { label: 'Settings', href: '/settings', icon: Settings, roles: ['super_admin', 'admin', 'user'] },
];

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  const { user } = useAuth();
  const pathname = usePathname();

  if (!user) {
    return null;
  }

  // Extract role and normalize to lowercase
  const userRole = typeof user.role === 'string' 
    ? user.role.toLowerCase() 
    : user.role?.name?.toLowerCase() || '';

  const filteredItems = navItems.filter(item => item.roles.includes(userRole as UserRole));

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
            style={{ pointerEvents: 'auto' }}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed left-0 top-0 h-screen w-80 bg-background/95 backdrop-blur-xl border-r border-border z-50 md:hidden flex flex-col shadow-2xl"
            style={{ pointerEvents: 'auto' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between h-20 px-6 border-b border-border/50 bg-muted/30">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center shadow-lg shrink-0">
                  <LinkIcon className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-bold text-lg leading-tight text-foreground">LinkHub</span>
                  <span className="text-xs text-muted-foreground capitalize truncate">{userRole.replace('_', ' ')}</span>
                </div>
              </div>
              <button
                onClick={onClose}
                type="button"
                className="h-10 w-10 flex items-center justify-center hover:bg-destructive/10 rounded-lg transition-all duration-200 shrink-0 cursor-pointer"
                aria-label="Close menu"
              >
                <X className="h-6 w-6 text-foreground hover:text-destructive" />
              </button>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 overflow-y-auto py-6 px-4">
              <ul className="space-y-1">
                {filteredItems.map((item, index) => {
                  const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
                  const Icon = item.icon;

                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.2 }}
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          "flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 group relative",
                          isActive
                            ? "bg-primary text-primary-foreground shadow-md scale-[1.02]"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        )}
                      >
                        <div className={cn(
                          "p-2 rounded-lg transition-colors",
                          isActive
                            ? "bg-white/20 dark:bg-black/20"
                            : "bg-muted group-hover:bg-muted/80"
                        )}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="flex-1 text-sm font-semibold">{item.label}</span>
                        {item.badge && (
                          <span className="inline-flex items-center justify-center px-2.5 py-1 text-xs font-bold leading-none text-primary-foreground bg-destructive rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            {/* Footer */}
            <div className="border-t border-border/50 px-4 py-4 bg-muted/30">
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-background border border-border/50 shadow-sm">
                <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-primary-foreground">
                    {(user.name || user.email || "U").charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold truncate text-foreground">{user.name || "User"}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
