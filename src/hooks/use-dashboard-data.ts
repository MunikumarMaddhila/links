"use client"

import { useState, useCallback } from "react"

export interface LinkItem {
  id: string
  title: string
  url: string
  isActive: boolean
  order: number
}

export interface UserProfile {
  name: string
  bio: string
  profileImage?: string
  socialHandles: {
    instagram?: string
    twitter?: string
    linkedin?: string
    github?: string
    tiktok?: string
    youtube?: string
  }
}

export interface DashboardData {
  profile: UserProfile
  links: LinkItem[]
}

const defaultProfile: UserProfile = {
  name: "John Doe",
  bio: "Welcome to my social links hub! Connect with me across all platforms.",
  profileImage: "",
  socialHandles: {
    instagram: "",
    twitter: "",
    linkedin: "",
    github: "",
    tiktok: "",
    youtube: ""
  }
}

const defaultLinks: LinkItem[] = [
  {
    id: "1",
    title: "My Website",
    url: "https://example.com",
    isActive: true,
    order: 0
  },
  {
    id: "2",
    title: "Instagram",
    url: "https://instagram.com/username",
    isActive: true,
    order: 1
  }
]

export function useDashboardData() {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile)
  const [links, setLinks] = useState<LinkItem[]>(defaultLinks)

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }))
  }, [])

  const updateSocialHandles = useCallback((handles: Partial<UserProfile["socialHandles"]>) => {
    setProfile(prev => ({
      ...prev,
      socialHandles: { ...prev.socialHandles, ...handles }
    }))
  }, [])

  const addLink = useCallback((link: Omit<LinkItem, "id" | "order">) => {
    const newLink: LinkItem = {
      ...link,
      id: Date.now().toString(),
      order: links.length
    }
    setLinks(prev => [...prev, newLink])
  }, [links.length])

  const updateLink = useCallback((id: string, updates: Partial<LinkItem>) => {
    setLinks(prev => prev.map(link => 
      link.id === id ? { ...link, ...updates } : link
    ))
  }, [])

  const deleteLink = useCallback((id: string) => {
    setLinks(prev => prev.filter(link => link.id !== id))
  }, [])

  const reorderLinks = useCallback((fromIndex: number, toIndex: number) => {
    setLinks(prev => {
      const newLinks = [...prev]
      const [movedItem] = newLinks.splice(fromIndex, 1)
      newLinks.splice(toIndex, 0, movedItem)
      
      // Update order numbers
      return newLinks.map((link, index) => ({ ...link, order: index }))
    })
  }, [])

  const toggleLinkActive = useCallback((id: string) => {
    setLinks(prev => prev.map(link => 
      link.id === id ? { ...link, isActive: !link.isActive } : link
    ))
  }, [])

  return {
    profile,
    links: links.sort((a, b) => a.order - b.order),
    updateProfile,
    updateSocialHandles,
    addLink,
    updateLink,
    deleteLink,
    reorderLinks,
    toggleLinkActive
  }
}