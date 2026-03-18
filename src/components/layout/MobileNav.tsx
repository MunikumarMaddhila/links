"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ElementType } from 'react';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Link as LinkIcon,
  BarChart3,
  Palette,
  Settings,
  Users,
  Building2,
  Layers,
} from 'lucide-react';

interface MobileNavItem {
  label: string;
  href: string;
  icon: ElementType;
  roles: string[];
}

const mobileNavItems: MobileNavItem[] = [
  // Super Admin
  { label: 'Dashboard', href: '/super-admin', icon: LayoutDashboard, roles: ['super_admin'] },
  { label: 'Orgs', href: '/super-admin/organizations', icon: Building2, roles: ['super_admin'] },
  { label: 'Users', href: '/super-admin/users', icon: Users, roles: ['super_admin'] },
  { label: 'Settings', href: '/settings', icon: Settings, roles: ['super_admin'] },
  
  // Admin
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard, roles: ['admin'] },
  { label: 'Team', href: '/admin/team', icon: Users, roles: ['admin'] },
  { label: 'Collections', href: '/admin/collections', icon: Layers, roles: ['admin'] },
  { label: 'Analytics', href: '/admin/analytics', icon: BarChart3, roles: ['admin'] },
  { label: 'Settings', href: '/settings', icon: Settings, roles: ['admin'] },
  
  // User
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: ['user'] },
  { label: 'Links', href: '/dashboard/links', icon: LinkIcon, roles: ['user'] },
  { label: 'Analytics', href: '/dashboard/analytics', icon: BarChart3, roles: ['user'] },
  { label: 'Theme', href: '/dashboard/appearance', icon: Palette, roles: ['user'] },
  { label: 'Settings', href: '/settings', icon: Settings, roles: ['user'] },
];

export function MobileNav() {
  const { user } = useAuth();
  const pathname = usePathname();

  if (!user) return null;

  // Normalize role to lowercase for matching
  const userRole = typeof user.role === 'string'
    ? user.role.toLowerCase()
    : (user.role as any)?.name?.toLowerCase() || 'user';

  const filteredItems = mobileNavItems
    .filter(item => item.roles.includes(userRole))
    .slice(0, 5);

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border/60 dashboard-header backdrop-blur-xl" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
      <div className="flex items-center justify-around h-16">
        {filteredItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className={cn("w-5 h-5", isActive && "text-primary")} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
