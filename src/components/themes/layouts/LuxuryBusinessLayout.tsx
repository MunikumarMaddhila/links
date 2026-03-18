"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeLayoutProps } from "./types";

// Seu nome aqui Style - Luxury Business/Mentor
// Dark theme with rose gold accents and decorative service cards
export function LuxuryBusinessLayout({ profile, embedded = false, onLinkClick }: ThemeLayoutProps) {
  return (
    <div 
      className={`relative overflow-hidden ${embedded ? "rounded-[32px]" : "min-h-screen"}`}
      style={{ background: "#1a1614" }}
    >
      {/* Decorative wave lines */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 400 800" preserveAspectRatio="none">
          {[...Array(8)].map((_, i) => (
            <path
              key={i}
              d={`M${-50 + i * 60},0 Q${100 + i * 60},400 ${-50 + i * 60},800`}
              stroke="#b8937a"
              strokeWidth="1"
              fill="none"
              opacity={0.3 + i * 0.05}
            />
          ))}
        </svg>
      </div>

      <div className="relative z-10 flex flex-col items-center pt-8 pb-8 px-4">
        {/* Profile Photo with decorative frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative mb-4"
        >
          {/* Decorative vertical lines */}
          <div className="absolute -left-4 top-0 bottom-0 flex gap-1">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-0.5 h-full bg-white/30" />
            ))}
          </div>
          <div className="absolute -right-4 top-0 bottom-0 flex gap-1">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-0.5 h-full bg-white/30" />
            ))}
          </div>
          
          <Avatar className="w-24 h-24 border-2 border-white/20">
            <AvatarImage src={profile.avatar} className="object-cover" />
            <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-amber-600 to-amber-800 text-white">
              {profile.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
        </motion.div>

        {/* Name - Elegant Script */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-bold italic mb-6"
          style={{ 
            color: "#e8d5c4",
            fontFamily: "'Georgia', serif"
          }}
        >
          {profile.name}
        </motion.h1>

        {/* Premium Service Cards */}
        <div className="w-full max-w-sm space-y-3">
          {profile.links.map((link, index) => {
            const gradients = [
              "linear-gradient(135deg, #3d2c2a 0%, #2a1f1d 50%, #d4a574 100%)",
              "linear-gradient(135deg, #c9a882 0%, #b8937a 50%, #8b6b52 100%)",
              "linear-gradient(135deg, #a67c5a 0%, #8b6b52 50%, #6b4f3d 100%)"
            ];
            
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
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.15 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative flex items-center w-full py-4 px-4 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
                style={{ 
                  background: gradients[index % gradients.length],
                }}
              >
                {/* Decorative shape */}
                <div className="absolute right-0 top-0 bottom-0 w-24 opacity-30">
                  <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
                    <circle cx="80" cy="50" r="40" fill="white" opacity="0.1" />
                  </svg>
                </div>
                
                <div className="flex-1 z-10">
                  <h3 className="font-bold italic text-white text-lg" style={{ fontFamily: "'Georgia', serif" }}>
                    {link.title}
                  </h3>
                  <p className="text-white/60 text-xs mt-1">
                    Click to learn more
                  </p>
                </div>
                
                {link.thumbnail && (
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 ml-2 z-10 border border-white/20">
                    <img src={link.thumbnail} alt={link.title} className="w-full h-full object-cover" />
                  </div>
                )}
              </motion.a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
