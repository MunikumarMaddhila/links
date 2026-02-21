"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  LayoutDashboard, 
  User, 
  ShoppingBag, 
  DollarSign, 
  Users, 
  Bell, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Palette
} from "lucide-react"
import Link from "next/link"


interface SidebarProps {
  isCollapsed: boolean
  onToggleCollapse: () => void
  profileName: string
  activeItem: string
  setActiveItem: (item: string) => void
}

export default function Sidebar({ isCollapsed, onToggleCollapse, profileName, activeItem, setActiveItem }: SidebarProps) {

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: User, label: "Profile", href: "/dashboard" },
    { icon: Users, label: "Social Media", href: "/dashboard" },
    { icon: User, label: "Contact Info", href: "/dashboard" },
    { icon: Palette, label: "Themes", href: "/dashboard" },
  { icon: ShoppingBag, label: "Shop", href: "/dashboard/shop-open" },
    { icon: DollarSign, label: "Earnings", href: "/earnings" },
    { icon: Users, label: "Audience", href: "/audience" },
    { icon: Bell, label: "Notifications", href: "/notifications" },
    { icon: Settings, label: "Settings", href: "/settings" }
  ]

  return (
    <div className={`bg-white border-r border-gray-200 h-screen flex flex-col transition-all duration-300 relative ${isCollapsed ? 'w-16' : 'w-64'}`}> 
      {/* Header / Logo */}
      <div className={`border-b border-gray-100 px-2 ${isCollapsed ? 'py-4 justify-center mt-2' : 'p-4 justify-between flex items-center'}`}> 
        {isCollapsed ? (
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleCollapse}
              className="p-1.5 h-auto text-gray-500 hover:bg-gray-100"
              aria-label="Expand sidebar"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="font-bold text-gray-900">My Links</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleCollapse}
              className="p-1.5 h-auto text-gray-500 hover:bg-gray-100"
              aria-label="Collapse sidebar"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>

      {/* Navigation */}
      <nav className={`flex-1 ${isCollapsed ? 'py-4 px-2' : 'p-4'}`}>
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeItem === item.label
            return (
              <li key={item.label}>
                <Button
                  variant="ghost"
                  onClick={() => setActiveItem(item.label)}
                  className={`w-full flex items-center ${isCollapsed ? 'justify-center p-2' : 'justify-start p-3'} h-auto text-left ${isActive ? 'bg-blue-50 text-blue-600 border border-blue-200' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <Icon className={`h-5 w-5 ${isCollapsed ? '' : 'mr-3'}`} />
                  {!isCollapsed && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </Button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* User Profile */}
      <div className={`border-t border-gray-100 ${isCollapsed ? 'py-4 px-2' : 'p-4'}`}>
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}> 
          <Avatar className="h-10 w-10">
            <AvatarImage src="" alt={profileName} />
            <AvatarFallback className="bg-gray-100 text-gray-600 text-sm">
              {getInitials(profileName)}
            </AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <div className="font-medium text-gray-900 text-sm truncate">
                {profileName}
              </div>
              <div className="text-xs text-gray-500">Free Plan</div>
            </div>
          )}
        </div>
        {!isCollapsed && (
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start mt-3 p-2 text-gray-500 hover:bg-gray-50"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        )}
      </div>
    </div>
  )
}