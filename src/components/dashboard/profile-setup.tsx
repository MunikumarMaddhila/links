"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp, Camera, Instagram, Twitter, Linkedin, Github, Youtube } from "lucide-react"
import { UserProfile } from "@/hooks/use-dashboard-data"

interface ProfileSetupProps {
  profile: UserProfile
  onUpdateProfile: (updates: Partial<UserProfile>) => void
  onUpdateSocialHandles: (handles: Partial<UserProfile["socialHandles"]>) => void
  isExpanded: boolean
  onToggleExpanded: () => void
}

export default function ProfileSetup({
  profile,
  onUpdateProfile,
  onUpdateSocialHandles,
  isExpanded,
  onToggleExpanded
}: ProfileSetupProps) {
  const [localProfile, setLocalProfile] = useState(profile)
  const [localSocials, setLocalSocials] = useState(profile.socialHandles)

  const handleProfileSave = () => {
    onUpdateProfile(localProfile)
  }

  const handleSocialsSave = () => {
    onUpdateSocialHandles(localSocials)
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const socialPlatforms = [
    { key: "instagram" as const, label: "Instagram", icon: Instagram, placeholder: "@username" },
    { key: "twitter" as const, label: "Twitter", icon: Twitter, placeholder: "@username" },
    { key: "linkedin" as const, label: "LinkedIn", icon: Linkedin, placeholder: "/in/username" },
    { key: "github" as const, label: "GitHub", icon: Github, placeholder: "/username" },
    { key: "youtube" as const, label: "YouTube", icon: Youtube, placeholder: "/channel/..." }
  ]

  return (
    <Card className="w-full bg-white border border-gray-200 rounded-xl shadow-sm">
      <Collapsible open={isExpanded} onOpenChange={onToggleExpanded}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors pb-4">
            <CardTitle className="flex items-center justify-between text-gray-900">
              <span className="text-lg font-semibold">Profile Setup</span>
              {isExpanded ? (
                <ChevronUp className="h-4 w-4 text-gray-600" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-600" />
              )}
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="space-y-6">
            {/* Profile Image Section - strictly vertical */}
            <div className="flex flex-col gap-6 py-2 items-center w-full">
              <Label className="text-sm font-medium mb-2 self-start">Profile Image</Label>
              <Avatar className="h-20 w-20 shadow-md mb-2">
                <AvatarImage src={localProfile.profileImage} alt={localProfile.name} />
                <AvatarFallback className="text-xl">
                  {getInitials(localProfile.name)}
                </AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm" className="flex items-center gap-2 mt-2">
                <Camera className="h-4 w-4" />
                Upload Photo
              </Button>
            </div>

            {/* Display Name Section - strictly vertical */}
            <div className="flex flex-col gap-2 py-2 w-full">
              <Label htmlFor="name" className="font-medium mb-1">Display Name</Label>
              <Input
                id="name"
                value={localProfile.name}
                onChange={(e) => setLocalProfile(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Your name"
                className="rounded-lg border-gray-300 shadow-sm"
              />
            </div>

            {/* Bio Section - strictly vertical */}
            <div className="flex flex-col gap-2 py-2 w-full">
              <Label htmlFor="bio" className="font-medium mb-1">Bio</Label>
              <Textarea
                id="bio"
                value={localProfile.bio}
                onChange={(e) => setLocalProfile(prev => ({ ...prev, bio: e.target.value }))}
                placeholder="Tell people about yourself..."
                rows={3}
                className="rounded-lg border-gray-300 shadow-sm"
              />
            </div>

            <Button onClick={handleProfileSave} className="w-full mt-2 rounded-lg">
              Save Profile
            </Button>

            {/* Social Handles Section */}
            <div className="space-y-4">
              <Label className="text-sm font-medium">Social Handles</Label>
              <div className="space-y-3">
                {socialPlatforms.map((platform) => {
                  const Icon = platform.icon
                  return (
                    <div key={platform.key} className="space-y-1">
                      <Label htmlFor={platform.key} className="text-xs text-muted-foreground flex items-center gap-2">
                        <Icon className="h-3 w-3" />
                        {platform.label}
                      </Label>
                      <Input
                        id={platform.key}
                        value={localSocials[platform.key] || ""}
                        onChange={(e) => setLocalSocials(prev => ({ 
                          ...prev, 
                          [platform.key]: e.target.value 
                        }))}
                        placeholder={platform.placeholder}
                        className="text-sm"
                      />
                    </div>
                  )
                })}
              </div>

              <Button onClick={handleSocialsSave} variant="outline" className="w-full">
                Save Social Links
              </Button>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}