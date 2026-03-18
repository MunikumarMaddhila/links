"use client";

import { motion } from "framer-motion";
import { ExternalLink, Leaf, Sun, Droplets } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeLayoutProps, SocialIcons } from "./types";

// Botanical/Nature Theme
// Organic shapes, leaf patterns, earthy colors
export function BotanicalLayout({ profile, embedded = false, onLinkClick }: ThemeLayoutProps) {
  return (
    <div 
      className={`relative overflow-hidden ${embedded ? "rounded-[32px]" : "min-h-screen"}`}
      style={{ background: "linear-gradient(180deg, #f7f5f0 0%, #e8e3d9 100%)" }}
    >
      {/* Botanical decorations */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Top right leaf */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 0.2, x: 0 }}
          className="absolute -top-10 -right-10 w-40 h-40"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full" fill="#4a7c59">
            <path d="M95 5 C 40 5, 5 40, 5 95 C 5 45, 45 25, 95 5" />
          </svg>
        </motion.div>
        
        {/* Bottom left leaf */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 0.15, x: 0 }}
          transition={{ delay: 0.2 }}
          className="absolute -bottom-20 -left-20 w-60 h-60 rotate-180"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full" fill="#4a7c59">
            <path d="M95 5 C 40 5, 5 40, 5 95 C 5 45, 45 25, 95 5" />
          </svg>
        </motion.div>
        
        {/* Floating circles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.05, 0.1, 0.05],
              y: [0, -20, 0]
            }}
            transition={{ 
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5
            }}
            className="absolute rounded-full"
            style={{
              width: `${30 + i * 20}px`,
              height: `${30 + i * 20}px`,
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              background: i % 2 === 0 ? "#4a7c59" : "#8b6914"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center pt-10 pb-8 px-4">
        {/* Profile with leaf border */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative mb-6"
        >
          {/* Decorative ring */}
          <div className="absolute -inset-3 rounded-full border-2 border-dashed" style={{ borderColor: "#4a7c59" }} />
          <Avatar className="w-28 h-28 border-4" style={{ borderColor: "#4a7c59" }}>
            <AvatarImage src={profile.avatar} className="object-cover" />
            <AvatarFallback 
              className="text-3xl font-bold"
              style={{ background: "#e8e3d9", color: "#4a7c59" }}
            >
              {profile.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          {/* Leaf decoration */}
          <div className="absolute -top-2 -right-2">
            <Leaf className="w-6 h-6" style={{ color: "#4a7c59" }} />
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-2xl font-bold mb-1"
          style={{ color: "#2d2d2d", fontFamily: "'Georgia', serif" }}
        >
          {profile.name}
        </motion.h1>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-sm text-center mb-4 max-w-xs"
          style={{ color: "#5a5a5a" }}
        >
          {profile.bio}
        </motion.p>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <SocialIcons socialLinks={profile.socialLinks} iconColor="#4a7c59" />
        </motion.div>

        {/* Organic shaped buttons */}
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
              className="flex items-center justify-between w-full py-4 px-6 transition-all"
              style={{ 
                background: "#ffffff",
                borderRadius: index % 2 === 0 ? "30px 10px 30px 10px" : "10px 30px 10px 30px",
                border: "2px solid #4a7c59",
                boxShadow: "3px 3px 0 #4a7c59"
              }}
            >
              <span className="font-medium" style={{ color: "#2d2d2d" }}>
                {link.title}
              </span>
              <Leaf className="w-4 h-4" style={{ color: "#4a7c59" }} />
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}
