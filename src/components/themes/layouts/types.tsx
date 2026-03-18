"use client";

import { motion } from "framer-motion";
import { ExternalLink, Instagram, Youtube, Twitter, Facebook, Music2, Link as LinkIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface ProfileLink {
  id: string;
  title: string;
  url: string;
  thumbnail?: string;
  icon?: string;
}

export interface ProfileData {
  name: string;
  username: string;
  bio: string;
  avatar?: string;
  coverImage?: string;
  links: ProfileLink[];
  socialLinks?: {
    instagram?: string;
    twitter?: string;
    youtube?: string;
    facebook?: string;
    tiktok?: string;
    pinterest?: string;
    linkedin?: string;
    whatsapp?: string;
    snapchat?: string;
  };
  tags?: string[];
  badge?: string;
  verified?: boolean;
}

export interface ThemeLayoutProps {
  profile: ProfileData;
  embedded?: boolean;
  onLinkClick?: (link: ProfileLink) => void;
}

// Shared social icons component
export function SocialIcons({ socialLinks, iconColor = "#ffffff", size = 20 }: { 
  socialLinks?: ProfileData['socialLinks']; 
  iconColor?: string;
  size?: number;
}) {
  if (!socialLinks) return null;
  
  const iconStyle = { color: iconColor };
  const iconClass = `w-${size/4} h-${size/4}`;
  
  return (
    <div className="social-icons-container flex items-center justify-center gap-3">
      {socialLinks.facebook && (
        <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="social-icon-link hover:scale-110 transition-transform" aria-label="Facebook">
          <Facebook style={iconStyle} className="w-5 h-5" />
        </a>
      )}
      {socialLinks.instagram && (
        <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="social-icon-link hover:scale-110 transition-transform" aria-label="Instagram">
          <Instagram style={iconStyle} className="w-5 h-5" />
        </a>
      )}
      {socialLinks.youtube && (
        <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="social-icon-link hover:scale-110 transition-transform" aria-label="YouTube">
          <Youtube style={iconStyle} className="w-5 h-5" />
        </a>
      )}
      {socialLinks.tiktok && (
        <a href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer" className="social-icon-link hover:scale-110 transition-transform" aria-label="TikTok">
          <Music2 style={iconStyle} className="w-5 h-5" />
        </a>
      )}
      {socialLinks.twitter && (
        <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="social-icon-link hover:scale-110 transition-transform" aria-label="Twitter">
          <Twitter style={iconStyle} className="w-5 h-5" />
        </a>
      )}
      {socialLinks.pinterest && (
        <a href={socialLinks.pinterest} target="_blank" rel="noopener noreferrer" className="social-icon-link hover:scale-110 transition-transform" aria-label="Pinterest">
          <LinkIcon style={iconStyle} className="w-5 h-5" />
        </a>
      )}
    </div>
  );
}

// Default profile data for preview with sample images
export const defaultProfileData: ProfileData = {
  name: "Isla Maren",
  username: "islamaren",
  bio: "Every adventure requires a first step ✨",
  avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face",
  coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
  links: [
    { id: "1", title: "Travel Diaries", url: "#", thumbnail: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=400&fit=crop" },
    { id: "2", title: "My Photography", url: "#", thumbnail: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop" },
    { id: "3", title: "Shop My Presets", url: "#", thumbnail: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&h=400&fit=crop" },
    { id: "4", title: "YouTube Channel", url: "#", thumbnail: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&h=400&fit=crop" },
    { id: "5", title: "Beach Lifestyle", url: "#", thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=400&fit=crop" },
  ],
  socialLinks: {
    instagram: "#",
    twitter: "#",
    youtube: "#",
    tiktok: "#",
    facebook: "#",
    pinterest: "#",
  },
  tags: ["Creator", "Traveler", "Photographer"],
  badge: "stunning",
  verified: true,
};
