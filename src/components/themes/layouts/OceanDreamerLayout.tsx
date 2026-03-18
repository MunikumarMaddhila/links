"use client";

import { motion } from "framer-motion";
import { ExternalLink, Waves } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeLayoutProps, SocialIcons } from "./types";

// Ocean Dreamer - Underwater Deep Sea Theme
// Animated waves, floating bubbles, depth layers with marine aesthetic
export function OceanDreamerLayout({ profile, embedded = false, onLinkClick }: ThemeLayoutProps) {
  // Deterministic bubble positions
  const bubbles = [
    { left: 10, delay: 0, size: 8 },
    { left: 25, delay: 1.5, size: 12 },
    { left: 45, delay: 0.8, size: 6 },
    { left: 65, delay: 2.2, size: 10 },
    { left: 80, delay: 0.4, size: 7 },
    { left: 90, delay: 1.8, size: 9 },
    { left: 35, delay: 2.8, size: 5 },
    { left: 55, delay: 1.2, size: 11 },
  ];

  return (
    <div 
      className={`relative overflow-hidden ${embedded ? "rounded-[32px]" : "min-h-screen"}`}
      style={{ 
        background: "linear-gradient(180deg, #0c4a6e 0%, #075985 30%, #0369a1 60%, #0284c7 100%)" 
      }}
    >
      {/* Animated Wave Layers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top wave */}
        <motion.svg 
          className="absolute top-0 left-0 w-[200%]"
          viewBox="0 0 1440 100" 
          animate={{ x: [0, -720] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <path fill="rgba(56, 189, 248, 0.3)" d="M0,40 C360,80 720,0 1080,40 C1260,60 1440,20 1440,20 L1440,0 L0,0 Z" />
        </motion.svg>
        
        {/* Middle wave */}
        <motion.svg 
          className="absolute top-4 left-0 w-[200%]"
          viewBox="0 0 1440 100"
          animate={{ x: [-720, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          <path fill="rgba(14, 165, 233, 0.2)" d="M0,60 C240,20 480,80 720,50 C960,20 1200,70 1440,40 L1440,0 L0,0 Z" />
        </motion.svg>
      </div>

      {/* Floating Bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {bubbles.map((bubble, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/20 backdrop-blur-sm"
            style={{ 
              left: `${bubble.left}%`, 
              bottom: '-20px',
              width: bubble.size,
              height: bubble.size,
            }}
            animate={{ 
              y: [0, -500],
              opacity: [0.6, 0],
              scale: [1, 0.5]
            }}
            transition={{ 
              duration: 4 + bubble.delay,
              repeat: Infinity,
              delay: bubble.delay,
              ease: "easeOut"
            }}
          />
        ))}
      </div>

      {/* Underwater Light Rays */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-0 left-1/4 w-24 h-full opacity-10"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.8) 0%, transparent 60%)",
            transform: "skewX(-15deg)"
          }}
        />
        <div 
          className="absolute top-0 right-1/4 w-16 h-full opacity-10"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.6) 0%, transparent 50%)",
            transform: "skewX(10deg)"
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center pt-10 pb-8 px-4">
        {/* Profile in a Porthole/Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative mb-4"
        >
          {/* Porthole Ring */}
          <div className="absolute inset-0 rounded-full border-8 border-cyan-300/30 scale-125" />
          <div className="absolute inset-0 rounded-full border-4 border-white/20 scale-110" />
          <Avatar className="w-24 h-24 border-4 border-cyan-200/50 shadow-2xl ring-4 ring-cyan-400/30">
            <AvatarImage src={profile.avatar} className="object-cover" />
            <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-cyan-400 to-blue-600 text-white">
              {profile.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
        </motion.div>

        {/* Name with Wave Icon */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-2 mb-1"
        >
          <Waves className="w-5 h-5 text-cyan-300" />
          <h1 className="text-2xl font-bold text-white drop-shadow-lg">
            {profile.name}
          </h1>
          <Waves className="w-5 h-5 text-cyan-300" />
        </motion.div>

        {/* Social Icons */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-2"
        >
          <SocialIcons socialLinks={profile.socialLinks} iconColor="#67e8f9" />
        </motion.div>

        {/* Bio */}
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-cyan-100/80 text-sm text-center mb-6 italic"
        >
          {profile.bio}
        </motion.p>

        {/* Depth-Layered Link Cards */}
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
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center gap-3 w-full py-3 px-4 rounded-2xl transition-all"
              style={{
                background: `linear-gradient(135deg, rgba(6, 182, 212, ${0.4 - index * 0.05}) 0%, rgba(14, 165, 233, ${0.3 - index * 0.05}) 100%)`,
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.2)",
                boxShadow: `0 ${4 + index * 2}px ${12 + index * 4}px rgba(0,0,0,0.2)`
              }}
            >
              {/* Thumbnail Circle */}
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/30 flex-shrink-0">
                {link.thumbnail ? (
                  <img src={link.thumbnail} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-cyan-400/50 to-blue-500/50 flex items-center justify-center text-white text-lg">
                    🐚
                  </div>
                )}
              </div>
              <span className="flex-1 font-medium text-white group-hover:text-cyan-100 transition-colors">
                {link.title}
              </span>
              <ExternalLink className="w-4 h-4 text-cyan-200/70 group-hover:text-white transition-colors" />
            </motion.a>
          ))}
        </div>

        {/* Seabed Decoration */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex items-end gap-2 text-2xl opacity-40"
        >
          🐠 🪸 🦑 🐙
        </motion.div>
      </div>
    </div>
  );
}
