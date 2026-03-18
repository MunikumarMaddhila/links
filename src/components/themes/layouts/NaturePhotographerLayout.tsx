"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeLayoutProps, SocialIcons } from "./types";

// Sarah Minetta Style - Nature Photographer
// Full background photo with sage green overlay, clean minimal buttons
export function NaturePhotographerLayout({ profile, embedded = false, onLinkClick }: ThemeLayoutProps) {
  return (
    <div 
      className={`relative overflow-hidden ${embedded ? "rounded-[32px]" : "min-h-screen"}`}
    >
      {/* Full Background Image */}
      <div className="absolute inset-0">
        {profile.coverImage ? (
          <img 
            src={profile.coverImage} 
            alt=""
            className="w-full h-full object-cover"
          />
        ) : (
          <div 
            className="w-full h-full"
            style={{
              background: "url('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&h=1200&fit=crop')",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          />
        )}
        {/* Sage green overlay */}
        <div 
          className="absolute inset-0" 
          style={{ background: "rgba(156, 163, 144, 0.85)" }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center pt-16 pb-8 px-6">
        {/* Profile Photo with white border */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6"
        >
          <Avatar className="w-32 h-32 border-4 border-white shadow-xl">
            <AvatarImage src={profile.avatar} className="object-cover" />
            <AvatarFallback className="text-4xl font-bold bg-gradient-to-br from-green-500 to-emerald-600 text-white">
              {profile.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-bold text-gray-800 mb-1"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          {profile.name}
        </motion.h1>

        {/* Role/Bio */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-sm tracking-[0.15em] uppercase text-gray-700 mb-4"
        >
          {profile.tags?.[0] || "PHOTOGRAPHER"}
        </motion.p>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-5 mb-8"
        >
          <SocialIcons socialLinks={profile.socialLinks} iconColor="#1a1a1a" size={24} />
        </motion.div>

        {/* Clean White Buttons */}
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
              transition={{ delay: 0.25 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center w-full py-4 px-6 rounded-lg bg-white shadow-md hover:shadow-lg transition-all"
            >
              <span className="font-medium text-gray-800">{link.title}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}
