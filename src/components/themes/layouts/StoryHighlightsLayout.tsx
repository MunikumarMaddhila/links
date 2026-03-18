"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeLayoutProps, SocialIcons } from "./types";

// Instagram Story Highlights Style
// Pink gradient with story circle highlights and gradient buttons
export function StoryHighlightsLayout({ profile, embedded = false, onLinkClick }: ThemeLayoutProps) {
  return (
    <div 
      className={`relative overflow-hidden ${embedded ? "rounded-[32px]" : "min-h-screen"}`}
      style={{ 
        background: "linear-gradient(180deg, #fdf2f8 0%, #fce7f3 50%, #fbcfe8 100%)" 
      }}
    >
      <div className="relative z-10 flex flex-col items-center pt-6 pb-8 px-4">
        {/* Story Highlights Row */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-3 mb-6 overflow-x-auto pb-2 w-full max-w-sm justify-center"
        >
          {profile.links.slice(0, 5).map((link, index) => (
            <a
              key={link.id}
              href={link.url}
              onClick={(e) => {
                if (onLinkClick) {
                  e.preventDefault();
                  onLinkClick(link);
                }
              }}
              className="flex-shrink-0"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-16 h-16 rounded-full p-0.5"
                style={{ background: "linear-gradient(135deg, #e11d48 0%, #f97316 50%, #eab308 100%)" }}
              >
                <div className="w-full h-full rounded-full bg-white p-0.5">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center overflow-hidden">
                    {link.thumbnail ? (
                      <img src={link.thumbnail} alt={link.title} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-lg">
                        {index === 0 ? "✨" : index === 1 ? "🎀" : index === 2 ? "💕" : index === 3 ? "🌸" : "📸"}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
              <p className="text-xs text-center mt-1 text-gray-600 truncate w-16">{link.title.split(' ')[0]}</p>
            </a>
          ))}
        </motion.div>

        {/* Profile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col items-center mb-6"
        >
          <div className="relative mb-3">
            <div 
              className="absolute -inset-1 rounded-full"
              style={{ background: "linear-gradient(135deg, #e11d48 0%, #f97316 100%)" }}
            />
            <Avatar className="w-24 h-24 border-4 border-white relative z-10 shadow-lg">
              <AvatarImage src={profile.avatar} className="object-cover" />
              <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-pink-400 to-rose-500 text-white">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-800 mb-1">
            {profile.name}
          </h1>
          
          <p className="text-gray-600 text-sm text-center mb-3">
            {profile.bio}
          </p>
          
          <SocialIcons socialLinks={profile.socialLinks} iconColor="#374151" />
        </motion.div>

        {/* Gradient Link Buttons */}
        <div className="w-full max-w-sm space-y-3">
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
              transition={{ delay: 0.15 + index * 0.05 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-between w-full py-4 px-6 rounded-full text-white font-medium shadow-lg hover:shadow-xl transition-all"
              style={{
                background: index % 3 === 0 
                  ? "linear-gradient(135deg, #e11d48 0%, #f97316 100%)"
                  : index % 3 === 1 
                  ? "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)"
                  : "linear-gradient(135deg, #f97316 0%, #eab308 100%)"
              }}
            >
              <span>{link.title}</span>
              <ExternalLink className="w-4 h-4" />
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}
