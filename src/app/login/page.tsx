"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { Mail, Lock, ArrowRight } from "lucide-react"

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login attempt:", formData)
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Image/Background */}
      <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-secondary/20 to-primary/10 flex-col justify-center items-center p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-t from-foreground/5 to-transparent"></div>
        <div className="relative z-10 text-center max-w-md">
          <div className="w-16 h-16 bg-linear-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-8">
            <span className="text-white font-bold text-2xl">L</span>
          </div>
          <h2 className="text-4xl font-bold text-foreground mb-4">Welcome Back</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Sign in to your LinkHub account and manage your social links with ease.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-8">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Sign In</h1>
            <p className="text-muted-foreground">Enter your credentials to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-muted-foreground" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-foreground mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-muted-foreground" size={20} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border border-border" />
                <span className="text-muted-foreground">Remember me</span>
              </label>
              <Link href="#" className="text-primary hover:text-accent transition-colors">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Sign In
              <ArrowRight size={20} />
            </button>
          </form>

          <p className="text-center text-muted-foreground text-sm mt-6">
            Don't have an account?{" "}
            <Link href="/signup" className="text-primary font-semibold hover:text-accent transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
