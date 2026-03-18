"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeLayoutProps, SocialIcons } from "./types";

// Glass Aurora Style
// Glassmorphism with aurora gradient background
export function GlassAuroraLayout({ profile, embedded = false, onLinkClick }: ThemeLayoutProps) {
  return (
    <div 
      className={`relative overflow-hidden ${embedded ? "rounded-[32px]" : "min-h-screen"}`}
      style={{ 
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 30%, #f093fb 60%, #667eea 100%)" 
      }}
    >
      {/* Aurora animated blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            x: [0, 30, 0], 
            y: [0, -30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            x: [0, -30, 0], 
            y: [0, 30, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-pink-400/30 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            x: [0, 20, 0], 
            y: [0, 20, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"
        />
      </div>

      {/* Glass card container */}
      <div className="relative z-10 flex flex-col items-center pt-6 pb-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <div className="p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
            {/* Profile */}
            <div className="flex flex-col items-center mb-6">
              <Avatar className="w-20 h-20 border-2 border-white/40 shadow-lg mb-3">
                <AvatarImage src={profile.avatar} className="object-cover" />
                <AvatarFallback className="text-xl font-bold bg-white/20 text-white backdrop-blur-sm">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <h1 className="text-xl font-bold text-white mb-1 drop-shadow-lg">
                {profile.name}
              </h1>
              
              <p className="text-white/70 text-sm text-center mb-3">
                {profile.bio}
              </p>
              
              <SocialIcons socialLinks={profile.socialLinks} iconColor="rgba(255,255,255,0.8)" />
            </div>

            {/* Glass Link Buttons */}
            <div className="space-y-3">
              {profile.links.map((link, index) => (
                <motion.a
                  key={link.id}
                  href={link.url}
                  onClick={(e) => {
                    if (onLinkClick) {
                      e.preventDefault();
                      onLinkClick(link);
                    }
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.25)" }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-between w-full py-3.5 px-5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white transition-all hover:shadow-lg"
                >
                  <span className="font-medium">{link.title}</span>
                  <ExternalLink className="w-4 h-4 text-white/70" />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
