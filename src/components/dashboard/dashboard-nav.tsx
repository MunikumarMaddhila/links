"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Menu, Settings } from "lucide-react"

interface DashboardNavProps {
  profileName: string
  onPreview: () => void
}

export default function DashboardNav({ profileName, onPreview }: DashboardNavProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Title */}
          <div className="flex items-center space-x-4">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">
              CreatorHub Dashboard
            </h1>
            {/* Shop Button */}
            <a href="/dashboard/shop-open">
              <Button variant="outline" size="sm" className="ml-4">Shop</Button>
            </a>
          </div>

          {/* Right side - User info and actions */}
          <div className="flex items-center space-x-4">
            {/* Settings Button */}
            <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-50">
              <Settings className="h-4 w-4" />
            </Button>

            {/* User Profile */}
            <div className="flex items-center space-x-3">
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium text-gray-900">{profileName}</p>
                <p className="text-xs text-gray-500">Dashboard</p>
              </div>
              <Avatar className="h-8 w-8">
                <AvatarImage src="" alt={profileName} />
                <AvatarFallback className="text-xs bg-gray-100 text-gray-600">
                  {getInitials(profileName)}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Mobile Menu */}
            <Button variant="ghost" size="sm" className="md:hidden text-gray-600 hover:bg-gray-50">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}