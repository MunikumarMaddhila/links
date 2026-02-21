"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth, UserRole } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/");
      return;
    }
    
    // If allowedRoles is provided and the user is NOT in the allowed list,
    // redirect them to their role-specific landing page.
    if (allowedRoles && user) {
      // Handle both string and object role formats
      const userRole = typeof user.role === "string" ? user.role : user.role?.name?.toLowerCase();
      const isAllowed = allowedRoles.includes(userRole as UserRole);
      
      if (!isAllowed) {
        const redirectPath =
          userRole === "super_admin" ? "/super-admin" : userRole === "admin" ? "/admin" : "/dashboard";
        router.replace(redirectPath);
      }
    }
  }, [allowedRoles, isAuthenticated, router, user]);

  if (!isAuthenticated) {
    return null;
  }

  if (allowedRoles && user) {
    const userRole = typeof user.role === "string" ? user.role : user.role?.name?.toLowerCase();
    if (!allowedRoles.includes(userRole as UserRole)) {
      return null;
    }
  }

  return <>{children}</>;
}
