"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight, X } from "lucide-react";
import Link from "next/link";
import { createPortal } from "react-dom";
import ForgotPasswordModal from "./forgot-password-modal";
import { AuthService } from "@/services/auth.service";
import { useAuth } from "@/contexts/AuthContext";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignup?: () => void;
}

export default function LoginModal({
  isOpen,
  onClose,
  onSwitchToSignup,
}: LoginModalProps) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  // Ensure component is mounted before rendering portal
  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset forgot password state when login modal opens
  useEffect(() => {
    if (isOpen) {
      setIsForgotPasswordOpen(false);
    }
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "0px"; // Prevent layout shift
    } else {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "unset";
    }

    // Cleanup function to restore scroll on unmount
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "unset";
    };
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const { email, password } = formData;
      
      // Call the Next.js API route which will set the httpOnly cookie
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include" // Important: Allow credentials (cookies) in the response
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw { response: { data: errorData } };
      }

      const data = await res.json();

      // Update AuthContext with user data
      const userData = data.user;
      const token = data.token;
      
      login({ ...userData, token });

      // Determine redirect path based on role
      const role = userData.role?.name || userData.role; // Handle both object and string formats
      console.log("Login successful, role:", role);
      
      let redirectPath = "/dashboard"; // default
      if (role === "ADMIN" || role === "admin") {
        redirectPath = "/admin";
      } else if (role === "SUPER_ADMIN" || role === "super_admin") {
        redirectPath = "/super-admin";
      }
      
      console.log(`Redirecting to ${redirectPath}`);
      // Use Next.js router.push() for client-side navigation
      // The user state is already updated via login() above
      setTimeout(() => {
        router.replace(redirectPath);
      }, 50);
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
    // Add your Google OAuth logic here
    // Example: window.location.href = '/auth/google'
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!mounted) return null;

  // Don't render login modal content if forgot password is open or if not open
  if (!isOpen && !isForgotPasswordOpen) return null;

  const modalContent = (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={handleOverlayClick}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10000,
        margin: 0,
        padding: "1rem",
      }}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-md mx-auto shadow-2xl transform transition-all scale-100 animate-in fade-in duration-200 relative"
        style={{ zIndex: 10001 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Welcome to CreatorHub
            </h2>
            <p className="text-gray-600 text-sm">
              Log in or Sign up to Continue
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6">
          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full py-3 px-4 bg-white border-2 border-gray-200 rounded-lg font-medium flex items-center justify-center gap-3 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 mb-6"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="text-gray-800 font-medium">
              Continue with Google
            </span>
          </button>

          {/* Divider */}
          <div className="relative flex items-center justify-center mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-600 font-medium">
                OR
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border border-gray-300 text-gray-900 focus:ring-gray-900"
                />
                <span className="text-gray-600">Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => setIsForgotPasswordOpen(true)}
                className="text-gray-900 hover:text-gray-700 transition-colors font-medium"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-gray-900 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-gray-800 hover:shadow-lg transition-all duration-300"
            >
              Sign In
              <ArrowRight size={20} />
            </button>
          </form>

          <p className="text-center text-gray-600 text-sm mt-6">
            Don't have an account?{" "}
            {onSwitchToSignup ? (
              <button
                onClick={() => {
                  onClose();
                  onSwitchToSignup();
                }}
                className="text-gray-900 font-semibold hover:text-gray-700 transition-colors"
              >
                Sign up
              </button>
            ) : (
              <Link
                href="/signup"
                className="text-gray-900 font-semibold hover:text-gray-700 transition-colors"
              >
                Sign up
              </Link>
            )}
          </p>
        </div>
      </div>
    </div>
  );

  // Use React Portal to render modal at document body level
  return (
    <>
      {isOpen &&
        !isForgotPasswordOpen &&
        createPortal(modalContent, document.body)}
      <ForgotPasswordModal
        isOpen={isForgotPasswordOpen}
        onClose={() => {
          setIsForgotPasswordOpen(false);
          onClose();
        }}
        onBackToLogin={() => setIsForgotPasswordOpen(false)}
      />
    </>
  );
}
