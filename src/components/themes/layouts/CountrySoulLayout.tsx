"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeLayoutProps, SocialIcons } from "./types";

// RileyaJo Style - Country Soul
// Warm orange/rustic gradient with emoji tags and photo grid
export function CountrySoulLayout({ profile, embedded = false, onLinkClick }: ThemeLayoutProps) {
  return (
    <div 
      className={`relative overflow-hidden ${embedded ? "rounded-[32px]" : "min-h-screen"}`}
      style={{ 
        background: "linear-gradient(180deg, #fed7aa 0%, #fdba74 20%, #fb923c 50%, #ea580c 100%)" 
      }}
    >
      <div className="relative z-10 flex flex-col items-center pt-8 pb-8 px-4">
        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-4"
        >
          <Avatar className="w-24 h-24 border-4 border-white shadow-2xl">
            <AvatarImage src={profile.avatar} className="object-cover" />
            <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-orange-400 to-amber-600 text-white">
              {profile.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          {/* Verified/heart badge */}
          {profile.verified && (
            <div className="absolute -bottom-1 -right-1 text-xl">❤️</div>
          )}
        </motion.div>

        {/* Name */}
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-2xl font-bold text-white mb-2 drop-shadow-lg flex items-center gap-2"
        >
          {profile.name}
          {profile.verified && <span className="text-lg">💛</span>}
        </motion.h1>

        {/* Social Icons */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-3"
        >
          <SocialIcons socialLinks={profile.socialLinks} iconColor="#ffffff" />
        </motion.div>

        {/* Emoji Tags */}
        {profile.tags && profile.tags.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 mb-4"
          >
            {profile.tags.map((tag, index) => (
              <span 
                key={index}
                className="px-3 py-1 rounded-full bg-white/90 text-orange-700 text-sm font-medium shadow-sm"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        )}

        {/* Bio */}
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="text-white/90 text-sm text-center mb-6"
        >
          {profile.bio}
        </motion.p>

        {/* Featured Link Button */}
        {profile.links[0] && (
          <motion.a
            href={profile.links[0].url}
            onClick={(e) => {
              if (onLinkClick) {
                e.preventDefault();
                onLinkClick(profile.links[0]);
              }
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full max-w-sm py-3.5 px-6 rounded-full bg-white text-orange-700 font-medium text-center shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 mb-6"
          >
            <span>🤠</span>
            <span>{profile.links[0].title}</span>
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        )}

        {/* Photo Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="w-full max-w-sm space-y-4"
        >
          {profile.links.slice(1).map((link, index) => (
            <a
              key={link.id}
              href={link.url}
              onClick={(e) => {
                if (onLinkClick) {
                  e.preventDefault();
                  onLinkClick(link);
                }
              }}
              className="group block"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all">
                {/* Photo content */}
                <div className="aspect-[16/9] bg-gradient-to-br from-amber-200/50 to-orange-300/50 relative overflow-hidden">
                  {link.thumbnail ? (
                    <img src={link.thumbnail} alt={link.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-amber-100/50">
                      <span className="text-4xl">🌻</span>
                    </div>
                  )}
                </div>
                {/* Title bar */}
                <div className="flex items-center justify-between px-4 py-3 bg-white">
                  <span className="font-medium text-orange-800 flex items-center gap-2">
                    {link.title}
                    {index === 0 && <span>🐴</span>}
                    {index === 1 && <span>🌾</span>}
                  </span>
                  <ExternalLink className="w-4 h-4 text-orange-600" />
                </div>
              </div>
            </a>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
