"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import SocialMediaCard from "./social-media-card";
import ContactInfoCard from "./contact-info-card";
import ThemesCard from "./themes-card";
import ShopCard from "./shop-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Camera,
  Instagram,
  Twitter,
  Linkedin,
  Github,
  Youtube,
  X,
  Settings
} from "lucide-react"
import { UserProfile, LinkItem } from "@/hooks/use-dashboard-data"

interface MainContentProps {
  profile: UserProfile
  links: LinkItem[]
  onUpdateProfile: (updates: Partial<UserProfile>) => void
  onUpdateSocialHandles: (handles: Partial<UserProfile["socialHandles"]>) => void
  onAddLink: (link: Omit<LinkItem, "id" | "order">) => void
  onUpdateLink: (id: string, updates: Partial<LinkItem>) => void
  onDeleteLink: (id: string) => void
  onReorderLinks: (fromIndex: number, toIndex: number) => void
  onToggleActive: (id: string) => void
  activeSidebarItem: string
  openPreviewSidebar: () => void
  contactInfo: {
    email?: string;
    phone?: string;
    address?: string;
  }
  onUpdateContactInfo: (info: Partial<{ email?: string; phone?: string; address?: string }>) => void
  selectedTheme?: string
  onThemeChange?: (theme: string) => void
}

export default function MainContent({
  profile,
  links,
  onUpdateProfile,
  onUpdateSocialHandles,
  onAddLink,
  onUpdateLink,
  onDeleteLink,
  onReorderLinks,
  onToggleActive,
  activeSidebarItem,
  openPreviewSidebar,
  contactInfo,
  onUpdateContactInfo,
  selectedTheme,
  onThemeChange
}: MainContentProps) {
  const [shopInfo, setShopInfo] = useState({ shopName: "", shopUrl: "", description: "" });
  const handleUpdateShopInfo = (info: Partial<typeof shopInfo>) => {
    setShopInfo(prev => ({ ...prev, ...info }));
  };
  const [isAddingLink, setIsAddingLink] = useState(false)
  const [editingLink, setEditingLink] = useState<LinkItem | null>(null)
  const [newLink, setNewLink] = useState({ title: "", url: "", isActive: true })
  const [editLinkData, setEditLinkData] = useState({ title: "", url: "", isActive: true })

  const getInitials = (name: string) => {
    return name.split(" ").map(word => word[0]).join("").toUpperCase().slice(0, 2)
  }

  
  const handleAddLink = () => {
    if (newLink.title.trim() && newLink.url.trim()) {
      onAddLink({
        title: newLink.title.trim(),
        url: newLink.url.trim(),
        isActive: newLink.isActive
      })
      setNewLink({ title: "", url: "", isActive: true })
      setIsAddingLink(false)
    }
  }

  const handleEditLink = (link: LinkItem) => {
    setEditingLink(link)
    setEditLinkData({
      title: link.title,
      url: link.url,
      isActive: link.isActive
    })
    openPreviewSidebar()
  }

  const handleUpdateLink = () => {
    if (editingLink && editLinkData.title.trim() && editLinkData.url.trim()) {
      onUpdateLink(editingLink.id, {
        title: editLinkData.title.trim(),
        url: editLinkData.url.trim(),
        isActive: editLinkData.isActive
      })
      setEditingLink(null)
      setEditLinkData({ title: "", url: "", isActive: true })
    }
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header only for Profile */}
        {activeSidebarItem === "Profile" && (
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Profile</h1>
            <p className="text-gray-600">Manage your profile</p>
          </div>
        )}

        {/* Profile Section - only if Profile is selected */}
        {activeSidebarItem === "Profile" && (
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg">Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Image - vertical */}
              <div className="flex flex-col items-center gap-4 py-2 w-full">
                <Avatar className="h-20 w-20 mb-2">
                  <AvatarImage src={profile.profileImage} alt={profile.name} />
                  <AvatarFallback className="text-xl bg-gray-100 text-gray-600">
                    {getInitials(profile.name)}
                  </AvatarFallback>
                </Avatar>
                <input
                  type="file"
                  accept="image/*"
                  id="profile-photo-input"
                  style={{ display: "none" }}
                  onChange={e => {
                    const file = e.target.files?.[0]
                    if (file) {
                      const reader = new FileReader()
                      reader.onload = (ev) => {
                        if (ev.target?.result) {
                          onUpdateProfile({ profileImage: ev.target.result as string })
                        }
                      }
                      reader.readAsDataURL(file)
                    }
                  }}
                />
                <Button
                  variant="outline"
                  className="flex items-center gap-2 mb-2"
                  onClick={() => document.getElementById('profile-photo-input')?.click()}
                >
                  <Camera className="h-4 w-4" />
                  Upload Photo
                </Button>
              </div>
              {/* Display Name - vertical */}
              <div className="flex flex-col gap-2 py-2 w-full">
                <Label htmlFor="name" className="font-medium mb-1">Display Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => {
                    onUpdateProfile({ name: e.target.value })
                    openPreviewSidebar()
                  }}
                  placeholder="Your name"
                  className="rounded-lg border-gray-300 shadow-sm"
                />
              </div>
              {/* Bio - vertical */}
              <div className="flex flex-col gap-2 py-2 w-full">
                <Label htmlFor="bio" className="font-medium mb-1">Bio</Label>
                <Textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => {
                    onUpdateProfile({ bio: e.target.value })
                    openPreviewSidebar()
                  }}
                  placeholder="Tell people about yourself..."
                  rows={3}
                  className="rounded-lg border-gray-300 shadow-sm"
                />
              </div>
              <Button className="w-full mt-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                Create Profile
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
      {activeSidebarItem === "Social Media" && (
        <SocialMediaCard
          socialLinks={profile.socialHandles}
          onUpdateSocialLink={(platform, link) => onUpdateSocialHandles({ [platform]: link })}
          openPreviewSidebar={openPreviewSidebar}
        />
      )}

      {activeSidebarItem === "Contact Info" && (
        <ContactInfoCard
          contactInfo={contactInfo}
          onUpdateContactInfo={onUpdateContactInfo}
          openPreviewSidebar={openPreviewSidebar}
        />
      )}

      {activeSidebarItem === "Themes" && (
        <ThemesCard
          selectedTheme={selectedTheme}
          onThemeChange={onThemeChange}
          openPreviewSidebar={openPreviewSidebar}
        />
      )}

      {activeSidebarItem === "Shop" && (
        <ShopCard
    
        />
      )}
    </div>
  )
}