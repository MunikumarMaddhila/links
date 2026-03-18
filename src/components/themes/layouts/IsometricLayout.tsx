"use client";

import { motion } from "framer-motion";
import { ExternalLink, Star, Award, TrendingUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeLayoutProps, SocialIcons } from "./types";

// 3D Isometric Style
// Modern tech with depth and shadows
export function IsometricLayout({ profile, embedded = false, onLinkClick }: ThemeLayoutProps) {
  return (
    <div 
      className={`relative overflow-hidden ${embedded ? "rounded-[32px]" : "min-h-screen"}`}
      style={{ background: "linear-gradient(135deg, #1e1e2e 0%, #2d2d44 100%)" }}
    >
      {/* Isometric grid */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="isoGrid" width="10" height="17.32" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
              <path d="M 0,0 L 10,0 L 5,8.66 Z" fill="none" stroke="#ffffff" strokeWidth="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#isoGrid)" />
        </svg>
      </div>

      {/* Floating 3D shapes */}
      <motion.div
        animate={{ 
          y: [0, -10, 0],
          rotateZ: [0, 5, 0]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-8 w-16 h-16"
        style={{
          background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a5a 100%)",
          transform: "rotateX(45deg) rotateZ(45deg)",
          boxShadow: "5px 5px 0 rgba(0,0,0,0.2)"
        }}
      />
      
      <motion.div
        animate={{ 
          y: [0, 15, 0],
          rotateZ: [0, -5, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-40 left-6 w-12 h-12"
        style={{
          background: "linear-gradient(135deg, #4ecdc4 0%, #44b3ab 100%)",
          borderRadius: "50%",
          boxShadow: "5px 5px 0 rgba(0,0,0,0.2)"
        }}
      />

      <div className="relative z-10 flex flex-col items-center pt-10 pb-8 px-4">
        {/* 3D Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-6"
          style={{
            transform: "perspective(1000px) rotateX(5deg)"
          }}
        >
          {/* Card shadow */}
          <div 
            className="absolute inset-0 rounded-2xl"
            style={{
              background: "#000",
              transform: "translateX(8px) translateY(8px)",
              opacity: 0.3
            }}
          />
          
          <div 
            className="relative p-6 rounded-2xl text-center"
            style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
          >
            <Avatar className="w-20 h-20 mx-auto mb-3 border-4 border-white/30">
              <AvatarImage src={profile.avatar} className="object-cover" />
              <AvatarFallback className="text-2xl font-bold bg-white/20 text-white">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <h1 className="text-xl font-bold text-white mb-1">{profile.name}</h1>
            <p className="text-white/70 text-sm mb-3">{profile.bio}</p>
            
            <SocialIcons socialLinks={profile.socialLinks} iconColor="#ffffff" />
          </div>
        </motion.div>

        {/* 3D Link Cards */}
        <div className="w-full max-w-sm space-y-3">
          {profile.links.map((link, index) => {
            const colors = [
              { bg: "#ff6b6b", shadow: "#cc5555" },
              { bg: "#4ecdc4", shadow: "#3ea49c" },
              { bg: "#ffe66d", shadow: "#ccb857" },
              { bg: "#95e1d3", shadow: "#77b4a8" },
              { bg: "#f38181", shadow: "#c26767" }
            ];
            const color = colors[index % colors.length];
            
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
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ 
                  x: -3,
                  y: -3
                }}
                whileTap={{ scale: 0.98 }}
                className="relative flex items-center justify-between w-full py-4 px-6 rounded-xl font-semibold transition-all"
                style={{ 
                  background: color.bg,
                  boxShadow: `6px 6px 0 ${color.shadow}`,
                  color: "#1e1e2e"
                }}
              >
                <span>{link.title}</span>
                <ExternalLink className="w-5 h-5 opacity-70" />
              </motion.a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
