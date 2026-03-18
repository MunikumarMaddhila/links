"use client";

import { motion } from "framer-motion";
import { ExternalLink, Mail } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeLayoutProps, SocialIcons } from "./types";

// Thea Willow Style - Lifestyle Content Creator
// Pink/purple gradient with large serif typography and circular profile
export function LifestyleCreatorLayout({ profile, embedded = false, onLinkClick }: ThemeLayoutProps) {
  return (
    <div 
      className={`relative overflow-hidden ${embedded ? "rounded-[32px]" : "min-h-screen"}`}
      style={{ background: "#d4a5c9" }}
    >
      {/* Inner card with gradient */}
      <div className="mx-3 mt-3 rounded-3xl overflow-hidden" style={{ background: "linear-gradient(180deg, #4a3a6e 0%, #2d2354 100%)" }}>
        <div className="relative z-10 flex flex-col items-center pt-6 pb-6 px-4">
          {/* Category Label */}
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs tracking-[0.3em] uppercase mb-2"
            style={{ color: "#d4a5c9" }}
          >
            {profile.tags?.[0] || "LIFESTYLE CONTENT CREATOR"}
          </motion.p>

          {/* Large Name - Serif Style */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-serif font-bold text-center mb-4 leading-tight"
            style={{ 
              color: "#d4a5c9",
              fontFamily: "'Playfair Display', Georgia, serif"
            }}
          >
            {profile.name.split(' ').map((word, i) => (
              <span key={i} className="block">{word}</span>
            ))}
          </motion.h1>

          {/* Circular Profile Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative mb-4"
          >
            <Avatar className="w-28 h-28 border-4 border-black/20 shadow-2xl grayscale">
              <AvatarImage src={profile.avatar} className="object-cover" />
              <AvatarFallback className="text-3xl font-bold bg-gradient-to-br from-purple-400 to-pink-400 text-white">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-4 mb-4"
          >
            <SocialIcons socialLinks={profile.socialLinks} iconColor="#1a1a1a" />
          </motion.div>
        </div>
      </div>

      {/* Content Cards Outside */}
      <div className="px-3 py-3 space-y-2">
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
            transition={{ delay: 0.4 + index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 w-full py-3 px-4 rounded-2xl bg-white/90 shadow-md hover:shadow-lg transition-all"
          >
            {link.thumbnail && (
              <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                <img src={link.thumbnail} alt={link.title} className="w-full h-full object-cover" />
              </div>
            )}
            <span className="flex-1 font-medium text-gray-800 text-sm">{link.title}</span>
            <ExternalLink className="w-4 h-4 text-gray-400" />
          </motion.a>
        ))}
      </div>
    </div>
  );
}
