"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Instagram, Twitter, Linkedin, Github, Youtube, Eye, X } from "lucide-react"
import { UserProfile, LinkItem } from "@/hooks/use-dashboard-data"

interface PreviewPanelProps {
  profile: UserProfile
  links: LinkItem[]
  isFullPreview?: boolean
  onTogglePreview?: () => void
}

export default function PreviewPanel({
  profile,
  links,
  isFullPreview = false,
  onTogglePreview,
  contactInfo
}: PreviewPanelProps & { contactInfo?: { email?: string; phone?: string; address?: string } }) {
  const [showPreview, setShowPreview] = useState(false)

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const formatUrl = (url: string) => {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return `https://${url}`
    }
    return url
  }

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case "instagram": return Instagram
      case "twitter": return Twitter
      case "linkedin": return Linkedin
      case "github": return Github
      case "youtube": return Youtube
      default: return ExternalLink
    }
  }

  const activeSocials = Object.entries(profile.socialHandles)
    .filter(([_, value]) => value && value.trim() !== "")
    .map(([platform, handle]) => ({ platform, handle }))

  const activeLinks = links.filter(link => link.isActive)

  const previewContent = (
    <div className="w-full text-center">
      {/* Social Media Section - FIRST */}
      <div className="mb-4">
        <div className="flex justify-center space-x-3">
          {activeSocials.length > 0 && activeSocials.map(({ platform, handle }) => {
            const Icon = getSocialIcon(platform)
            return (
              <button
                key={platform}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                onClick={() => {
                  if (isFullPreview) {
                    const url = platform === 'instagram' ? `https://instagram.com/${handle.replace('@', '')}` :
                               platform === 'twitter' ? `https://twitter.com/${handle.replace('@', '')}` :
                               platform === 'linkedin' ? `https://linkedin.com${handle}` :
                               platform === 'github' ? `https://github.com${handle}` :
                               platform === 'youtube' ? `https://youtube.com${handle}` : '#'
                    window.open(url, '_blank')
                  }
                }}
              >
                <Icon className="h-4 w-4 text-gray-600" />
              </button>
            )
          })}
        </div>
      </div>

      {/* Display Section - THIRD */}
      <div className="mb-8">
        <Avatar className={`mx-auto mb-4 ${isFullPreview ? 'h-20 w-20' : 'h-16 w-16'}`}>
          <AvatarImage src={profile.profileImage} alt={profile.name} />
          <AvatarFallback className={`${isFullPreview ? 'text-lg' : 'text-sm'} bg-gray-100 text-gray-600`}>
            {getInitials(profile.name)}
          </AvatarFallback>
        </Avatar>
        <h2 className={`font-semibold text-gray-900 mb-2 ${isFullPreview ? 'text-xl' : 'text-lg'}`}>
          {profile.name}
        </h2>
        {profile.bio && (
          <p className={`text-gray-600 mb-4 leading-relaxed ${isFullPreview ? 'text-sm' : 'text-xs'}`}>
            {profile.bio}
          </p>
        )}
      </div>

      {/* Links Section */}
      <div className="space-y-3">
        {activeLinks.length === 0 ? (
          <div className="py-8 text-gray-500">
            <p className={isFullPreview ? 'text-sm' : 'text-xs'}>
              No active links to display
            </p>
          </div>
        ) : (
          activeLinks.map((link) => (
            <button
              key={link.id}
              className={`w-full p-4 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 transition-all duration-200 text-center ${
                isFullPreview ? 'text-sm' : 'text-xs'
              }`}
              onClick={() => {
                if (isFullPreview) {
                  window.open(formatUrl(link.url), '_blank')
                }
              }}
            >
              <span className="font-medium text-gray-900">{link.title}</span>
            </button>
          ))
        )}
      </div>

      {/* Footer for full preview */}
      {isFullPreview && (
        <div className="text-center mt-8 pt-6 border-t border-gray-100">
          <p className="text-xs text-gray-400">
            Created with CreatorHub
          </p>
        </div>
      )}
    </div>
  )
}