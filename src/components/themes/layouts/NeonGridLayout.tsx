"use client";

import { motion } from "framer-motion";
import { 
  Phone, Mail, Camera, MapPin, MessageCircle, ExternalLink, PhoneCall,
  Globe, ShoppingBag, Youtube, Music, Podcast, BookOpen, Calendar,
  Video, Link2, Heart, Star, Briefcase, FileText, Download
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeLayoutProps } from "./types";

// Social Media Icons as SVG for better visuals
const SocialIcons = {
  facebook: (color: string) => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill={color}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
  instagram: (color: string) => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill={color}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  ),
  twitter: (color: string) => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill={color}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  tiktok: (color: string) => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill={color}>
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  ),
  youtube: (color: string) => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill={color}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
  linkedin: (color: string) => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill={color}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  whatsapp: (color: string) => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill={color}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  ),
  snapchat: (color: string) => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill={color}>
      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.217-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
    </svg>
  ),
};

// Professional Business Card Style
// Dark charcoal with gold accents, social media row, icon grid layout
export function NeonGridLayout({ profile, embedded = false, onLinkClick }: ThemeLayoutProps) {
  
  // Map link titles to icons
  const getIconForLink = (title: string, index: number) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('message') || lowerTitle.includes('chat')) return <MessageCircle className="w-7 h-7" />;
    if (lowerTitle.includes('whatsapp')) return <Phone className="w-7 h-7" />;
    if (lowerTitle.includes('phone') || lowerTitle.includes('call') || lowerTitle.includes('tel')) return <PhoneCall className="w-7 h-7" />;
    if (lowerTitle.includes('email') || lowerTitle.includes('mail')) return <Mail className="w-7 h-7" />;
    if (lowerTitle.includes('website') || lowerTitle.includes('site') || lowerTitle.includes('web')) return <Globe className="w-7 h-7" />;
    if (lowerTitle.includes('shop') || lowerTitle.includes('store') || lowerTitle.includes('buy')) return <ShoppingBag className="w-7 h-7" />;
    if (lowerTitle.includes('youtube') || lowerTitle.includes('video')) return <Youtube className="w-7 h-7" />;
    if (lowerTitle.includes('music') || lowerTitle.includes('spotify') || lowerTitle.includes('song')) return <Music className="w-7 h-7" />;
    if (lowerTitle.includes('podcast')) return <Podcast className="w-7 h-7" />;
    if (lowerTitle.includes('blog') || lowerTitle.includes('article') || lowerTitle.includes('read')) return <BookOpen className="w-7 h-7" />;
    if (lowerTitle.includes('book') || lowerTitle.includes('appointment') || lowerTitle.includes('schedule')) return <Calendar className="w-7 h-7" />;
    if (lowerTitle.includes('camera') || lowerTitle.includes('photo') || lowerTitle.includes('gallery')) return <Camera className="w-7 h-7" />;
    if (lowerTitle.includes('location') || lowerTitle.includes('map') || lowerTitle.includes('address')) return <MapPin className="w-7 h-7" />;
    if (lowerTitle.includes('portfolio') || lowerTitle.includes('work')) return <Briefcase className="w-7 h-7" />;
    if (lowerTitle.includes('resume') || lowerTitle.includes('cv')) return <FileText className="w-7 h-7" />;
    if (lowerTitle.includes('download')) return <Download className="w-7 h-7" />;
    if (lowerTitle.includes('favorite') || lowerTitle.includes('like')) return <Heart className="w-7 h-7" />;
    if (lowerTitle.includes('review') || lowerTitle.includes('rating')) return <Star className="w-7 h-7" />;
    
    // Default icons based on index
    const defaultIcons = [
      <Globe className="w-7 h-7" key="globe" />,
      <Link2 className="w-7 h-7" key="link" />,
      <ExternalLink className="w-7 h-7" key="external" />,
      <Star className="w-7 h-7" key="star" />,
      <Heart className="w-7 h-7" key="heart" />,
      <Briefcase className="w-7 h-7" key="briefcase" />,
    ];
    return defaultIcons[index % defaultIcons.length];
  };

  const goldColor = "#c9a962";
  const darkBg = "#1a1a1a";

  // Get active social links
  const activeSocials = Object.entries(profile.socialLinks || {}).filter(([_, url]) => url && url !== '#');

  return (
    <div 
      className={`relative overflow-hidden ${embedded ? "rounded-[32px]" : "min-h-screen"}`}
      style={{ background: darkBg }}
    >
      {/* Diagonal corner decorations */}
      <div className="absolute top-0 left-0 w-24 h-24 pointer-events-none">
        <div 
          className="absolute top-6 -left-8 w-32 h-0.5 rotate-45"
          style={{ background: `linear-gradient(90deg, transparent 0%, ${goldColor}40 50%, transparent 100%)` }}
        />
        <div 
          className="absolute top-10 -left-6 w-28 h-0.5 rotate-45"
          style={{ background: `linear-gradient(90deg, transparent 0%, ${goldColor}30 50%, transparent 100%)` }}
        />
      </div>
      
      <div className="absolute bottom-0 right-0 w-24 h-24 pointer-events-none">
        <div 
          className="absolute bottom-6 -right-8 w-32 h-0.5 rotate-45"
          style={{ background: `linear-gradient(90deg, transparent 0%, ${goldColor}40 50%, transparent 100%)` }}
        />
        <div 
          className="absolute bottom-10 -right-6 w-28 h-0.5 rotate-45"
          style={{ background: `linear-gradient(90deg, transparent 0%, ${goldColor}30 50%, transparent 100%)` }}
        />
      </div>

      {/* Top accent shape */}
      <div 
        className="absolute top-0 left-0 right-0 h-36"
        style={{
          background: `linear-gradient(135deg, #2a2a2a 0%, #1f1f1f 100%)`,
          clipPath: "polygon(0 0, 100% 0, 100% 60%, 50% 100%, 0 60%)"
        }}
      />

      <div className="relative z-10 flex flex-col items-center pt-5 pb-6 px-4">
        {/* Profile with gold ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative mb-3"
        >
          {/* Outer gold ring */}
          <div 
            className="absolute -inset-2 rounded-full"
            style={{ 
              background: `linear-gradient(135deg, ${goldColor} 0%, #8b7355 50%, ${goldColor} 100%)`,
              padding: "3px"
            }}
          >
            <div className="w-full h-full rounded-full" style={{ background: darkBg }} />
          </div>
          
          <Avatar className="relative w-24 h-24 border-4" style={{ borderColor: goldColor }}>
            <AvatarImage src={profile.avatar} className="object-cover" />
            <AvatarFallback 
              className="text-xl font-bold"
              style={{ background: "#2a2a2a", color: goldColor }}
            >
              {profile.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg font-light tracking-[0.25em] uppercase mb-0.5"
          style={{ color: goldColor }}
        >
          {profile.name}
        </motion.h1>

        {/* Title/Bio */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-[10px] tracking-[0.15em] uppercase text-center mb-4"
          style={{ color: `${goldColor}99` }}
        >
          {profile.bio}
        </motion.p>

        {/* Social Media Icons Row */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-4 mb-5"
        >
          {profile.socialLinks?.facebook && (
            <a href={profile.socialLinks.facebook} className="hover:opacity-80 transition-opacity">
              {SocialIcons.facebook(goldColor)}
            </a>
          )}
          {profile.socialLinks?.instagram && (
            <a href={profile.socialLinks.instagram} className="hover:opacity-80 transition-opacity">
              {SocialIcons.instagram(goldColor)}
            </a>
          )}
          {profile.socialLinks?.twitter && (
            <a href={profile.socialLinks.twitter} className="hover:opacity-80 transition-opacity">
              {SocialIcons.twitter(goldColor)}
            </a>
          )}
          {profile.socialLinks?.tiktok && (
            <a href={profile.socialLinks.tiktok} className="hover:opacity-80 transition-opacity">
              {SocialIcons.tiktok(goldColor)}
            </a>
          )}
          {profile.socialLinks?.youtube && (
            <a href={profile.socialLinks.youtube} className="hover:opacity-80 transition-opacity">
              {SocialIcons.youtube(goldColor)}
            </a>
          )}
          {profile.socialLinks?.linkedin && (
            <a href={profile.socialLinks.linkedin} className="hover:opacity-80 transition-opacity">
              {SocialIcons.linkedin(goldColor)}
            </a>
          )}
          {profile.socialLinks?.whatsapp && (
            <a href={profile.socialLinks.whatsapp} className="hover:opacity-80 transition-opacity">
              {SocialIcons.whatsapp(goldColor)}
            </a>
          )}
          {/* If no social links, show placeholder icons */}
          {(!profile.socialLinks || activeSocials.length === 0) && (
            <>
              <span className="hover:opacity-80 transition-opacity cursor-pointer">
                {SocialIcons.facebook(goldColor)}
              </span>
              <span className="hover:opacity-80 transition-opacity cursor-pointer">
                {SocialIcons.instagram(goldColor)}
              </span>
            </>
          )}
        </motion.div>

        {/* Icon Grid - First Row (3 items) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="grid grid-cols-3 gap-2 mb-2 w-full max-w-[280px]"
        >
          {profile.links.slice(0, 3).map((link, index) => (
            <a
              key={link.id}
              href={link.url}
              onClick={(e) => {
                if (onLinkClick) {
                  e.preventDefault();
                  onLinkClick(link);
                }
              }}
              className="group flex flex-col items-center"
            >
              <motion.div
                whileHover={{ scale: 1.05, borderColor: goldColor }}
                whileTap={{ scale: 0.95 }}
                className="w-full aspect-square rounded-sm flex items-center justify-center mb-1.5 transition-all"
                style={{ 
                  border: `1px solid ${goldColor}40`,
                  color: goldColor,
                  background: "transparent"
                }}
              >
                {getIconForLink(link.title, index)}
              </motion.div>
              <span 
                className="text-[9px] tracking-[0.1em] uppercase text-center leading-tight"
                style={{ color: goldColor }}
              >
                {link.title}
              </span>
              {/* Divider line */}
              <div 
                className="w-full h-px mt-1.5"
                style={{ background: `${goldColor}25` }}
              />
            </a>
          ))}
        </motion.div>

        {/* Icon Grid - Second Row (2 items centered) */}
        {profile.links.length > 3 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 gap-2 w-full max-w-[180px] mb-2"
          >
            {profile.links.slice(3, 5).map((link, index) => (
              <a
                key={link.id}
                href={link.url}
                onClick={(e) => {
                  if (onLinkClick) {
                    e.preventDefault();
                    onLinkClick(link);
                  }
                }}
                className="group flex flex-col items-center"
              >
                <motion.div
                  whileHover={{ scale: 1.05, borderColor: goldColor }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full aspect-square rounded-sm flex items-center justify-center mb-1.5 transition-all"
                  style={{ 
                    border: `1px solid ${goldColor}40`,
                    color: goldColor,
                    background: "transparent"
                  }}
                >
                  {getIconForLink(link.title, index + 3)}
                </motion.div>
                <span 
                  className="text-[9px] tracking-[0.1em] uppercase text-center leading-tight"
                  style={{ color: goldColor }}
                >
                  {link.title}
                </span>
              </a>
            ))}
          </motion.div>
        )}

        {/* Additional links as elegant list */}
        {profile.links.length > 5 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="mt-3 space-y-1.5 w-full max-w-[280px]"
          >
            {profile.links.slice(5).map((link, index) => (
              <a
                key={link.id}
                href={link.url}
                onClick={(e) => {
                  if (onLinkClick) {
                    e.preventDefault();
                    onLinkClick(link);
                  }
                }}
                className="flex items-center justify-between py-2 px-3 rounded transition-all hover:bg-white/5 group"
                style={{ borderBottom: `1px solid ${goldColor}15` }}
              >
                <div className="flex items-center gap-2">
                  <span style={{ color: `${goldColor}70` }}>
                    {getIconForLink(link.title, index + 5)}
                  </span>
                  <span className="text-xs tracking-wider" style={{ color: goldColor }}>
                    {link.title}
                  </span>
                </div>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: `${goldColor}70` }} />
              </a>
            ))}
          </motion.div>
        )}

        {/* Touch indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-5 flex flex-col items-center"
        >
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center"
            style={{ color: `${goldColor}40` }}
          >
            <svg width="20" height="28" viewBox="0 0 24 32" fill="currentColor">
              <path d="M12 0C9.79 0 8 1.79 8 4V12C8 12.55 8.45 13 9 13H15C15.55 13 16 12.55 16 12V4C16 1.79 14.21 0 12 0ZM10 18L10.5 28H13.5L14 18H10Z" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
