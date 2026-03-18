"use client";

import { motion } from "framer-motion";
import { ExternalLink, Check } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeLayoutProps, SocialIcons } from "./types";

// Full Photo Backdrop Layout (Ava Lune style)
// Full-screen background image with centered profile and minimal links
export function PhotoBackdropLayout({ profile, embedded = false, onLinkClick }: ThemeLayoutProps) {
  return (
    <div 
      className={`relative overflow-hidden ${embedded ? "rounded-[32px]" : "min-h-screen"}`}
    >
      {/* Full Background Image */}
      <div className="absolute inset-0">
        {profile.avatar ? (
          <img 
            src={profile.avatar} 
            alt={profile.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900" />
        )}
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
      </div>
      
      <div className="relative z-10 flex flex-col items-center justify-end min-h-full py-8 px-4">
        {/* Spacer to push content down */}
        <div className="flex-1 min-h-[100px]" />
        
        {/* Profile Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-6"
        >
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-4xl font-bold text-white drop-shadow-lg">
              {profile.name}
            </h1>
            <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
              <Check className="w-4 h-4 text-white" strokeWidth={3} />
            </div>
          </div>
          
          <p className="text-white/80 text-lg mb-4 drop-shadow-md">
            {profile.bio}
          </p>
          
          <SocialIcons socialLinks={profile.socialLinks} iconColor="#ffffff" />
        </motion.div>

        {/* Minimal Link Buttons */}
        <div className="w-full max-w-sm space-y-3">
          {profile.links.slice(0, 4).map((link, index) => (
            <motion.a
              key={link.id}
              href={link.url}
              onClick={(e) => {
                if (onLinkClick) {
                  e.preventDefault();
                  onLinkClick(link);
                }
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.2)" }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center w-full py-4 px-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold text-lg hover:bg-white/20 transition-all"
            >
              <span>{link.title}</span>
            </motion.a>
          ))}
        </div>

        {/* Photo Credits or Additional Info */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-white/50 text-xs mt-6"
        >
          @{profile.name.toLowerCase().replace(/\s+/g, '')}
        </motion.p>
      </div>
    </div>
  );
}
