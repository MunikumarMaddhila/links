"use client";

import { motion } from "framer-motion";
import { ExternalLink, Star, Crown, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeLayoutProps, SocialIcons } from "./types";

// Retro Synthwave 80s Style
// Neon colors, grid, and sun gradient
export function RetroSynthwaveLayout({ profile, embedded = false, onLinkClick }: ThemeLayoutProps) {
  return (
    <div 
      className={`relative overflow-hidden ${embedded ? "rounded-[32px]" : "min-h-screen"}`}
      style={{ background: "linear-gradient(180deg, #0c0015 0%, #1a0033 40%, #330066 100%)" }}
    >
      {/* Retro sun */}
      <div 
        className="absolute top-24 left-1/2 -translate-x-1/2 w-48 h-24 overflow-hidden"
      >
        <div 
          className="w-48 h-48 rounded-full"
          style={{
            background: "linear-gradient(180deg, #ff6b6b 0%, #ff8c42 30%, #ffd93d 60%, #ffd93d 100%)",
            boxShadow: "0 0 60px rgba(255, 107, 107, 0.5)"
          }}
        />
        {/* Horizontal lines through sun */}
        {[...Array(5)].map((_, i) => (
          <div 
            key={i}
            className="absolute left-0 right-0 h-1.5"
            style={{ 
              top: `${20 + i * 12}%`,
              background: "#0c0015"
            }}
          />
        ))}
      </div>

      {/* Grid floor */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-48"
        style={{
          background: "linear-gradient(180deg, transparent 0%, rgba(12, 0, 21, 0.8) 100%)",
          backgroundImage: `
            linear-gradient(transparent 0%, rgba(255, 0, 255, 0.3) 100%),
            linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 20px 20px, 20px 20px",
          transform: "perspective(500px) rotateX(60deg)",
          transformOrigin: "center bottom"
        }}
      />

      <div className="relative z-10 flex flex-col items-center pt-48 pb-8 px-4">
        {/* Profile with neon glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative mb-4"
        >
          <div 
            className="absolute -inset-2 rounded-full blur-lg"
            style={{ background: "linear-gradient(135deg, #ff00ff 0%, #00ffff 100%)" }}
          />
          <Avatar className="relative w-24 h-24 border-2" style={{ borderColor: "#ff00ff" }}>
            <AvatarImage src={profile.avatar} className="object-cover" />
            <AvatarFallback 
              className="text-2xl font-bold"
              style={{ background: "#1a0033", color: "#ff00ff" }}
            >
              {profile.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
        </motion.div>

        {/* Name with chrome effect */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-bold mb-1"
          style={{ 
            background: "linear-gradient(180deg, #ffffff 0%, #ff9ecd 50%, #ff00ff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 0 30px rgba(255, 0, 255, 0.5)"
          }}
        >
          {profile.name}
        </motion.h1>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-sm text-center mb-4"
          style={{ color: "#00ffff" }}
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
          <SocialIcons socialLinks={profile.socialLinks} iconColor="#ff00ff" />
        </motion.div>

        {/* Neon buttons */}
        <div className="w-full max-w-sm space-y-3">
          {profile.links.map((link, index) => {
            const colors = index % 2 === 0 
              ? { border: "#ff00ff", shadow: "rgba(255, 0, 255, 0.5)" }
              : { border: "#00ffff", shadow: "rgba(0, 255, 255, 0.5)" };
            
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
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center w-full py-3 px-5 rounded-sm border-2 transition-all"
                style={{ 
                  borderColor: colors.border,
                  background: "rgba(0, 0, 0, 0.5)",
                  boxShadow: `0 0 20px ${colors.shadow}, inset 0 0 20px ${colors.shadow}20`
                }}
              >
                <span 
                  className="font-bold tracking-wider uppercase"
                  style={{ color: colors.border }}
                >
                  {link.title}
                </span>
              </motion.a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
