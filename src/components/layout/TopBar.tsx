"use client";

import type { ElementType } from 'react';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Bell, Search, Menu, LogOut, User, Settings, Crown, Shield, UserCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface TopBarProps {
  onMenuClick?: () => void;
}

const roleLabels: Record<UserRole, { label: string; color: string; icon: ElementType }> = {
  super_admin: { label: 'Super Admin', color: 'bg-destructive', icon: Crown },
  admin: { label: 'Admin', color: 'bg-primary', icon: Shield },
  user: { label: 'User', color: 'bg-accent', icon: UserCircle },
  SUPER_ADMIN: { label: 'Super Admin', color: 'bg-destructive', icon: Crown },
  ADMIN: { label: 'Admin', color: 'bg-primary', icon: Shield },
  USER: { label: 'User', color: 'bg-accent', icon: UserCircle },
};

export function TopBar({ onMenuClick }: TopBarProps) {
  const { user, logout, switchRole } = useAuth();

  if (!user) return null;

  // Handle both string and object role formats
  const userRole = (typeof user.role === "string" ? user.role : user.role?.name?.toLowerCase()) as UserRole;
  const roleInfo = roleLabels[userRole] || roleLabels.user;

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 md:px-6 fixed top-0 right-0 left-0 md:left-[260px] z-9999">
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={onMenuClick}
      >
        <Menu className="w-5 h-5" />
      </Button>

      {/* Search */}
      <div className="hidden md:flex items-center flex-1 max-w-md">
        <div className="relative w-full">
          {/* <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /> */}
          {/* <Input
            placeholder="Search..."
            className="pl-10 bg-secondary border-0 focus-visible:ring-1"
          /> */}
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
        </Button>

        {/* User Menu */}
        <div className="relative z-99999">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 px-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src={user.avatar} alt={user.name || "User"} />
                <AvatarFallback>{(user.name || user.email || "U").charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="hidden lg:flex flex-col items-start">
                <span className="text-sm font-medium">{user.name || user.email || "User"}</span>
                {user.organizationName && (
                  <span className="text-xs text-muted-foreground">{user.organizationName}</span>
                )}
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56" sideOffset={8}>
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span>{user.name}</span>
                <span className="text-xs text-muted-foreground font-normal">{user.email}</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="w-4 h-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="text-destructive">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
