"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { ThemeLayoutProps, SocialIcons } from "./types";

// Travels with Nova Style - Travel Content Creator
// Arch/window design with large photo inside, peach/sage colors
export function TravelArchLayout({ profile, embedded = false, onLinkClick }: ThemeLayoutProps) {
  return (
    <div 
      className={`relative overflow-hidden ${embedded ? "rounded-[32px]" : "min-h-screen"}`}
      style={{ background: "#e8b4a0" }}
    >
      <div className="relative z-10 flex flex-col items-center pt-4 pb-6 px-4">
        {/* Arch Window with Photo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full max-w-[240px] mb-4"
        >
          {/* Arch frame */}
          <div 
            className="relative rounded-t-[120px] overflow-hidden"
            style={{ 
              background: "#5a7c65",
              paddingTop: "8px",
              paddingLeft: "8px",
              paddingRight: "8px"
            }}
          >
            {/* Inner arch with photo */}
            <div 
              className="rounded-t-[112px] overflow-hidden aspect-[3/4]"
              style={{ background: "#4a6a55" }}
            >
              {profile.avatar ? (
                <img 
                  src={profile.avatar} 
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-b from-green-600 to-green-800" />
              )}
            </div>
            
            {/* Name overlay at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
              <h1 
                className="text-2xl font-serif font-bold text-white text-center"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {profile.name}
              </h1>
              <p className="text-xs tracking-[0.2em] uppercase text-center mt-1" style={{ color: "#e8b4a0" }}>
                {profile.tags?.[0] || "TRAVEL CONTENT CREATOR"}
              </p>
            </div>
          </div>

          {/* Social Icons inside arch */}
          <div 
            className="flex items-center justify-center gap-3 py-3"
            style={{ background: "#5a7c65" }}
          >
            <SocialIcons socialLinks={profile.socialLinks} iconColor="#ffffff" />
          </div>
        </motion.div>

        {/* Content Cards */}
        <div className="w-full max-w-sm space-y-2">
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
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 w-full py-2 px-3 rounded-xl bg-white/90 shadow-md hover:shadow-lg transition-all"
            >
              {link.thumbnail && (
                <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={link.thumbnail} alt={link.title} className="w-full h-full object-cover" />
                </div>
              )}
              <span className="flex-1 font-medium text-gray-800 text-sm">{link.title}</span>
              <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}
