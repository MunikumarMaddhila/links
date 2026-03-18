"use client";

import { motion } from "framer-motion";
import { ExternalLink, Waves } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeLayoutProps, SocialIcons } from "./types";

// Jace Ryder Style - Surf Rider
// Ocean blue gradient with wave patterns and surf content cards
export function SurfRiderLayout({ profile, embedded = false, onLinkClick }: ThemeLayoutProps) {
  return (
    <div 
      className={`relative overflow-hidden ${embedded ? "rounded-[32px]" : "min-h-screen"}`}
      style={{ 
        background: "linear-gradient(180deg, #bae6fd 0%, #38bdf8 20%, #0ea5e9 50%, #0369a1 100%)" 
      }}
    >
      {/* Wave Pattern Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute bottom-0 left-0 w-full h-40 opacity-20" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="white" />
        </svg>
        <svg className="absolute bottom-10 left-0 w-full h-32 opacity-10" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="white" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col items-center pt-10 pb-8 px-4">
        {/* Cover Image Area */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-sm aspect-[16/9] rounded-2xl overflow-hidden mb-4 shadow-2xl relative"
        >
          {profile.coverImage ? (
            <img src={profile.coverImage} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-sky-400/60 to-blue-600/60 flex items-center justify-center">
              <Waves className="w-16 h-16 text-white/50" />
            </div>
          )}
          {/* Profile overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-3">
              <Avatar className="w-14 h-14 border-2 border-white shadow-lg">
                <AvatarImage src={profile.avatar} className="object-cover" />
                <AvatarFallback className="text-lg font-bold bg-sky-500 text-white">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl font-bold text-white drop-shadow-lg">{profile.name}</h1>
                <p className="text-white/80 text-sm">{profile.bio}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Social Icons */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-6"
        >
          <SocialIcons socialLinks={profile.socialLinks} iconColor="#ffffff" />
        </motion.div>

        {/* Photo Content Cards with Wave Icon */}
        <div className="w-full max-w-sm space-y-4">
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group block"
            >
              <div className="relative rounded-2xl overflow-hidden bg-white/95 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all">
                {link.thumbnail ? (
                  // Photo card version
                  <div className="relative">
                    <div className="aspect-[16/9]">
                      <img src={link.thumbnail} alt={link.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Waves className="w-5 h-5 text-sky-300" />
                        <span className="font-semibold text-white">{link.title}</span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-white/80" />
                    </div>
                  </div>
                ) : (
                  // Simple link button version
                  <div className="flex items-center justify-between px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center">
                        <Waves className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-medium text-sky-800">{link.title}</span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-sky-600 group-hover:text-sky-500 transition-colors" />
                  </div>
                )}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}
