"use client";

import { motion } from "framer-motion";
import { ExternalLink, Heart, MessageCircle, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeLayoutProps, SocialIcons } from "./types";

// Polaroid/Instant Photo Style Layout
// Scattered photo cards with handwritten feel
export function PolaroidLayout({ profile, embedded = false, onLinkClick }: ThemeLayoutProps) {
  return (
    <div 
      className={`relative overflow-hidden ${embedded ? "rounded-[32px]" : "min-h-screen"}`}
      style={{ background: "linear-gradient(180deg, #fef6e4 0%, #f8eddd 100%)" }}
    >
      {/* Subtle texture overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`
        }}
      />

      <div className="relative z-10 flex flex-col items-center pt-8 pb-8 px-4">
        {/* Profile Card like a Polaroid */}
        <motion.div
          initial={{ opacity: 0, rotate: -3, y: 20 }}
          animate={{ opacity: 1, rotate: -2, y: 0 }}
          className="relative bg-white p-2 pb-12 rounded-sm shadow-lg mb-6"
          style={{ transform: "rotate(-2deg)" }}
        >
          <Avatar className="w-32 h-32 rounded-sm">
            <AvatarImage src={profile.avatar} className="object-cover" />
            <AvatarFallback className="text-4xl font-bold bg-gradient-to-br from-amber-100 to-amber-200 text-amber-700 rounded-sm">
              {profile.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          {/* Handwritten name below */}
          <div className="absolute bottom-2 left-0 right-0 text-center">
            <p 
              className="text-lg font-medium text-gray-700"
              style={{ fontFamily: "'Caveat', 'Comic Sans MS', cursive" }}
            >
              {profile.name}
            </p>
          </div>
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-600 text-sm text-center mb-4 max-w-xs"
        >
          {profile.bio}
        </motion.p>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex items-center gap-3 mb-6"
        >
          <SocialIcons socialLinks={profile.socialLinks} iconColor="#1c1917" />
        </motion.div>

        {/* Scattered Polaroid Link Cards */}
        <div className="w-full max-w-sm space-y-4">
          {profile.links.map((link, index) => {
            const rotations = [2, -3, 1.5, -2, 3];
            const rotation = rotations[index % rotations.length];
            
            return (
              <motion.a
                key={link.id}
                href={link.url}
                onClick={(e) => {
                  if (onLinkClick) {
                    e.preventDefault();
                    onLinkClick(link);
                  }
                }}
                initial={{ opacity: 0, rotate: rotation * 2, y: 30 }}
                animate={{ opacity: 1, rotate: rotation, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ rotate: 0, scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="block relative bg-white p-2 pb-4 rounded-sm shadow-lg transition-all"
              >
                <div className="flex items-center gap-3">
                  {link.thumbnail ? (
                    <div className="w-20 h-20 rounded-sm overflow-hidden flex-shrink-0">
                      <img src={link.thumbnail} alt={link.title} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-sm bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center flex-shrink-0">
                      <ExternalLink className="w-6 h-6 text-amber-600" />
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <p 
                      className="font-medium text-gray-800 mb-1"
                      style={{ fontFamily: "'Caveat', cursive", fontSize: "1.1rem" }}
                    >
                      {link.title}
                    </p>
                    <div className="flex items-center gap-3 text-gray-400 text-xs">
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3" /> 
                        {100 + index * 47}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" />
                        {10 + index * 8}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Tape effect */}
                <div 
                  className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-4 opacity-50"
                  style={{ 
                    background: "linear-gradient(180deg, #f5deb3 0%, #e8d4a8 100%)",
                    transform: "translateX(-50%) rotate(-1deg)"
                  }}
                />
              </motion.a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
