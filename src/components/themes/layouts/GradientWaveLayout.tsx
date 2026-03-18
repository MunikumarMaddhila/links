"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeLayoutProps, SocialIcons } from "./types";

// Holographic Card Style - 3D Floating Effect
// Iridescent colors with holographic shine effect and floating elements
export function GradientWaveLayout({ profile, embedded = false, onLinkClick }: ThemeLayoutProps) {
  return (
    <div 
      className={`relative overflow-hidden ${embedded ? "rounded-[32px]" : "min-h-screen"}`}
      style={{ 
        background: "linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)"
      }}
    >
      {/* Holographic gradient overlay */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Moving holographic shine */}
        <motion.div
          animate={{ 
            x: [-200, 400],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
          style={{
            background: "linear-gradient(120deg, transparent 30%, rgba(255,0,255,0.1) 40%, rgba(0,255,255,0.1) 45%, rgba(255,255,0,0.1) 50%, transparent 60%)",
            transform: "skewX(-20deg)"
          }}
        />
        
        {/* Floating holographic orbs */}
        <motion.div
          animate={{ 
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 right-10 w-20 h-20 rounded-full opacity-40"
          style={{
            background: "radial-gradient(circle at 30% 30%, #ff00ff, #00ffff, transparent)",
            filter: "blur(10px)"
          }}
        />
        <motion.div
          animate={{ 
            y: [20, -20, 20],
            x: [10, -10, 10],
            scale: [1.1, 1, 1.1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 left-10 w-24 h-24 rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle at 70% 70%, #00ff88, #0088ff, transparent)",
            filter: "blur(15px)"
          }}
        />
        
        {/* Grid lines */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,255,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,255,0.3) 1px, transparent 1px)
            `,
            backgroundSize: "30px 30px"
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center pt-8 pb-6 px-4">
        {/* Holographic card container */}
        <motion.div
          initial={{ opacity: 0, rotateY: -30 }}
          animate={{ opacity: 1, rotateY: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-sm"
        >
          {/* Profile card with holographic border */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative p-[2px] rounded-3xl mb-6 mx-4"
            style={{
              background: "linear-gradient(135deg, #ff00ff, #00ffff, #ffff00, #ff00ff)"
            }}
          >
            <div 
              className="rounded-3xl p-6 text-center"
              style={{ background: "rgba(26, 26, 46, 0.95)" }}
            >
              {/* Avatar with holographic ring */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="relative mb-4 mx-auto w-fit"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-2 rounded-full"
                  style={{
                    background: "conic-gradient(from 0deg, #ff00ff, #00ffff, #ffff00, #ff00ff)",
                    opacity: 0.7
                  }}
                />
                <Avatar className="w-24 h-24 border-4 border-black relative z-10">
                  <AvatarImage src={profile.avatar} className="object-cover" />
                  <AvatarFallback 
                    className="text-2xl font-bold"
                    style={{ 
                      background: "linear-gradient(135deg, #ff00ff, #00ffff)",
                      color: "#1a1a2e"
                    }}
                  >
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </motion.div>

              {/* Name with holographic text */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl font-bold mb-1"
                style={{
                  background: "linear-gradient(90deg, #ff00ff, #00ffff, #ffff00)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundSize: "200% auto"
                }}
              >
                {profile.name}
              </motion.h1>

              {/* Bio */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="text-gray-400 text-sm"
              >
                {profile.bio}
              </motion.p>

              {/* Holographic divider */}
              <div 
                className="h-[2px] w-full my-4"
                style={{
                  background: "linear-gradient(90deg, transparent, #00ffff, #ff00ff, #00ffff, transparent)"
                }}
              />

              {/* Social Icons */}
              <SocialIcons socialLinks={profile.socialLinks} iconColor="#00ffff" />
            </div>
          </motion.div>

          {/* Links with 3D floating effect */}
          <div className="space-y-3 px-4">
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
                initial={{ opacity: 0, y: 30, rotateX: -15 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.03, 
                  y: -5,
                  boxShadow: "0 15px 35px rgba(0,255,255,0.3), 0 5px 15px rgba(255,0,255,0.2)"
                }}
                whileTap={{ scale: 0.98 }}
                className="relative flex items-center justify-center w-full py-4 px-6 rounded-xl font-medium transition-all overflow-hidden group"
                style={{ 
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.3)"
                }}
              >
                {/* Holographic shine on hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,0,255,0.1), rgba(0,255,255,0.1), rgba(255,255,0,0.1))"
                  }}
                />
                
                {/* Left accent */}
                <div 
                  className="absolute left-0 top-0 bottom-0 w-1"
                  style={{
                    background: `linear-gradient(180deg, ${index % 2 === 0 ? '#ff00ff' : '#00ffff'}, ${index % 2 === 0 ? '#00ffff' : '#ffff00'})`
                  }}
                />

                <span 
                  className="relative z-10"
                  style={{ color: "#e0e0e0" }}
                >
                  {link.title}
                </span>

                {/* Arrow icon */}
                <svg 
                  className="absolute right-4 w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity"
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  style={{ color: "#00ffff" }}
                >
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </motion.a>
            ))}
          </div>

          {/* Holographic scan line animation at bottom */}
          <motion.div
            animate={{ y: [-100, 400] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-[2px] opacity-30"
            style={{
              background: "linear-gradient(90deg, transparent, #00ffff, transparent)",
              boxShadow: "0 0 10px #00ffff"
            }}
          />
        </motion.div>

        {/* Bottom indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 flex justify-center gap-2"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ 
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                delay: i * 0.3 
              }}
              className="w-2 h-2 rounded-full"
              style={{
                background: i === 0 ? '#ff00ff' : i === 1 ? '#00ffff' : '#ffff00'
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
