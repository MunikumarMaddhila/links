"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeLayoutProps, SocialIcons } from "./types";

// Cyber Neon Style
// Dark cyberpunk theme with neon glow effects and grid lines
export function CyberNeonLayout({ profile, embedded = false, onLinkClick }: ThemeLayoutProps) {
  return (
    <div 
      className={`relative overflow-hidden ${embedded ? "rounded-[32px]" : "min-h-screen"}`}
      style={{ 
        background: "linear-gradient(180deg, #0f0f23 0%, #1a0a2e 50%, #0f0f23 100%)" 
      }}
    >
      {/* Grid background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px'
          }}
        />
      </div>

      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-fuchsia-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center pt-10 pb-8 px-4">
        {/* Profile with neon border */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative mb-6"
        >
          <div 
            className="absolute -inset-1 rounded-full animate-pulse"
            style={{ 
              background: "linear-gradient(135deg, #00ffff 0%, #ff00ff 100%)",
              filter: "blur(8px)"
            }}
          />
          <Avatar className="w-24 h-24 border-2 border-cyan-400 relative z-10" style={{ boxShadow: "0 0 20px #00ffff" }}>
            <AvatarImage src={profile.avatar} className="object-cover" />
            <AvatarFallback className="text-2xl font-bold bg-black text-cyan-400" style={{ textShadow: "0 0 10px #00ffff" }}>
              {profile.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
        </motion.div>

        {/* Name with neon text */}
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-2xl font-bold text-cyan-400 mb-2 tracking-wider font-mono"
          style={{ textShadow: "0 0 10px #00ffff, 0 0 20px #00ffff" }}
        >
          {profile.name}
        </motion.h1>

        {/* Bio */}
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-fuchsia-300 text-sm text-center mb-4 font-mono"
          style={{ textShadow: "0 0 5px #ff00ff" }}
        >
          {profile.bio}
        </motion.p>

        {/* Social Icons */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <SocialIcons socialLinks={profile.socialLinks} iconColor="#00ffff" />
        </motion.div>

        {/* Neon Link Buttons */}
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
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group block"
            >
              <div 
                className="relative py-4 px-6 rounded-lg border flex items-center justify-between transition-all"
                style={{ 
                  borderColor: index % 3 === 0 ? '#00ffff' : index % 3 === 1 ? '#ff00ff' : '#ffff00',
                  boxShadow: index % 3 === 0 ? '0 0 10px #00ffff, inset 0 0 10px rgba(0,255,255,0.1)' 
                    : index % 3 === 1 ? '0 0 10px #ff00ff, inset 0 0 10px rgba(255,0,255,0.1)'
                    : '0 0 10px #ffff00, inset 0 0 10px rgba(255,255,0,0.1)',
                  background: 'rgba(0,0,0,0.5)'
                }}
              >
                <span 
                  className="font-medium font-mono tracking-wide"
                  style={{ 
                    color: index % 3 === 0 ? '#00ffff' : index % 3 === 1 ? '#ff00ff' : '#ffff00',
                    textShadow: index % 3 === 0 ? '0 0 5px #00ffff' : index % 3 === 1 ? '0 0 5px #ff00ff' : '0 0 5px #ffff00'
                  }}
                >
                  {link.title}
                </span>
                <ExternalLink 
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  style={{ color: index % 3 === 0 ? '#00ffff' : index % 3 === 1 ? '#ff00ff' : '#ffff00' }}
                />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Decorative scan line */}
        <motion.div 
          animate={{ y: ["-100%", "200%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent pointer-events-none"
        />
      </div>
    </div>
  );
}
