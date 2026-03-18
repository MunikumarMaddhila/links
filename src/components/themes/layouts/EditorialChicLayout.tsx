"use client";

import { motion } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeLayoutProps, SocialIcons } from "./types";

// Editorial Magazine Style Layout
// Clean typography, large headers, magazine-style content blocks
export function EditorialChicLayout({ profile, embedded = false, onLinkClick }: ThemeLayoutProps) {
  return (
    <div 
      className={`relative overflow-hidden ${embedded ? "rounded-[32px]" : "min-h-screen"}`}
      style={{ background: "#fafafa" }}
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-black" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-black" />
      
      <div className="relative z-10 flex flex-col items-center pt-8 pb-8 px-6">
        {/* Magazine Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs tracking-[0.3em] uppercase text-gray-500">The Profile</span>
            <span className="text-xs tracking-[0.3em] uppercase text-gray-500">Vol. 01</span>
          </div>
          
          <div className="border-y-2 border-black py-6">
            <h1 
              className="text-5xl font-serif font-bold text-black leading-tight tracking-tight"
              style={{ fontFamily: "'Times New Roman', serif" }}
            >
              {profile.name}
            </h1>
          </div>
          
          <div className="flex items-start gap-4 mt-4">
            <Avatar className="w-16 h-16 border-2 border-black">
              <AvatarImage src={profile.avatar} className="object-cover grayscale" />
              <AvatarFallback className="text-lg font-bold bg-black text-white font-serif">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <p 
                className="text-gray-700 text-sm leading-relaxed italic"
                style={{ fontFamily: "'Times New Roman', serif" }}
              >
                "{profile.bio}"
              </p>
              <div className="mt-3">
                <SocialIcons socialLinks={profile.socialLinks} iconColor="#000000" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Editorial Content Blocks */}
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
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.99 }}
              className="group block w-full border-b border-gray-300 py-4 hover:border-black transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <span className="text-xs text-gray-400 tracking-[0.2em] uppercase mb-1 block">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 
                    className="text-xl font-serif text-black group-hover:underline"
                    style={{ fontFamily: "'Times New Roman', serif" }}
                  >
                    {link.title}
                  </h3>
                  {link.thumbnail && (
                    <p className="text-sm text-gray-500 mt-1">Click to explore →</p>
                  )}
                </div>
                <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors mt-1" />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Magazine Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="w-full max-w-sm mt-8 pt-6 border-t-2 border-black"
        >
          <div className="flex items-center justify-between text-xs text-gray-500 tracking-[0.2em] uppercase">
            <span>Est. 2024</span>
            <span>•</span>
            <span>@{profile.name.toLowerCase().replace(/\s+/g, '')}</span>
            <span>•</span>
            <span>Links</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
