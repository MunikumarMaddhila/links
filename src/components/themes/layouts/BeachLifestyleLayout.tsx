"use client";

import { motion } from "framer-motion";
import { ExternalLink, Sun, Palmtree } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeLayoutProps, SocialIcons } from "./types";

// Beach Lifestyle - Tropical Paradise Theme
// Sandy gradient with palm trees, sunset vibes, and horizontal story-style cards
export function BeachLifestyleLayout({ profile, embedded = false, onLinkClick }: ThemeLayoutProps) {
  return (
    <div 
      className={`relative overflow-hidden ${embedded ? "rounded-[32px]" : "min-h-screen"}`}
      style={{ 
        background: "linear-gradient(180deg, #fcd34d 0%, #fb923c 25%, #f97316 50%, #ea580c 75%, #c2410c 100%)" 
      }}
    >
      {/* Sun */}
      <motion.div 
        className="absolute top-8 right-8 w-20 h-20 rounded-full"
        style={{
          background: "radial-gradient(circle, #fef3c7 0%, #fcd34d 50%, #f59e0b 100%)",
          boxShadow: "0 0 60px rgba(251, 191, 36, 0.8), 0 0 100px rgba(251, 191, 36, 0.4)"
        }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Palm Tree Silhouettes */}
      <div className="absolute left-0 bottom-0 opacity-30 pointer-events-none">
        <svg width="80" height="180" viewBox="0 0 80 180" fill="#7c2d12">
          <path d="M35 180V80 M35 80C20 60 10 40 5 35C15 40 25 45 35 50 M35 80C30 55 15 30 5 20C20 30 30 45 35 60 M35 80C50 60 60 40 65 35C55 40 45 45 35 50 M35 80C40 55 55 30 65 20C50 30 40 45 35 60" strokeWidth="4" stroke="#7c2d12" fill="none"/>
        </svg>
      </div>
      
      <div className="absolute right-0 bottom-0 opacity-20 pointer-events-none transform scale-x-[-1]">
        <svg width="60" height="140" viewBox="0 0 80 180" fill="#7c2d12">
          <path d="M35 180V90 M35 90C20 70 10 50 5 45C15 50 25 55 35 60 M35 90C50 70 60 50 65 45C55 50 45 55 35 60" strokeWidth="4" stroke="#7c2d12" fill="none"/>
        </svg>
      </div>

      {/* Beach Wave at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16">
        <svg viewBox="0 0 400 60" className="w-full h-full" preserveAspectRatio="none">
          <path fill="rgba(255,255,255,0.3)" d="M0,30 Q50,10 100,30 T200,30 T300,30 T400,30 L400,60 L0,60 Z" />
          <path fill="rgba(255,255,255,0.2)" d="M0,40 Q50,25 100,40 T200,40 T300,40 T400,40 L400,60 L0,60 Z" />
        </svg>
      </div>

      {/* Flying Birds */}
      <div className="absolute top-16 left-12 opacity-30 pointer-events-none text-amber-900">
        <motion.div
          animate={{ x: [0, 10, 0], y: [0, -3, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          〰️ 〰️
        </motion.div>
      </div>

      <div className="relative z-10 flex flex-col items-center pt-6 pb-20 px-4">
        {/* Profile Card with Postcard Style */}
        <motion.div
          initial={{ opacity: 0, y: 20, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: -2 }}
          className="relative bg-white rounded-lg p-3 shadow-2xl mb-6"
          style={{ transform: "rotate(-2deg)" }}
        >
          {/* Stamp decoration */}
          <div className="absolute -top-2 -right-2 w-10 h-10 bg-red-500 rounded flex items-center justify-center text-white text-xs font-bold rotate-12 shadow-md">
            ✈️
          </div>
          
          <Avatar className="w-24 h-24 rounded-md">
            <AvatarImage src={profile.avatar} className="object-cover rounded-md" />
            <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-orange-400 to-amber-500 text-white rounded-md">
              {profile.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          {/* Postcard lines */}
          <div className="mt-2 space-y-1">
            <div className="h-0.5 bg-gray-200 w-full" />
            <div className="h-0.5 bg-gray-200 w-3/4" />
          </div>
        </motion.div>

        {/* Name with Sun Icons */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-2 mb-1"
        >
          <Sun className="w-5 h-5 text-yellow-200" />
          <h1 className="text-2xl font-bold text-white drop-shadow-lg font-serif italic">
            {profile.name}
          </h1>
        </motion.div>

        {/* Social Icons */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-2"
        >
          <SocialIcons socialLinks={profile.socialLinks} iconColor="#fef3c7" />
        </motion.div>

        {/* Bio */}
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-orange-100/90 text-sm text-center mb-6 font-medium"
        >
          🌴 {profile.bio}
        </motion.p>

        {/* Horizontal Story-Style Scroll Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full overflow-x-auto pb-4 -mx-4 px-4 scrollbar-none"
        >
          <div className="flex gap-3 w-max">
            {profile.links.slice(0, 4).map((link, index) => (
              <motion.a
                key={link.id}
                href={link.url}
                onClick={(e) => {
                  if (onLinkClick) {
                    e.preventDefault();
                    onLinkClick(link);
                  }
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-24 h-32 rounded-2xl overflow-hidden flex-shrink-0 shadow-xl"
                style={{
                  background: index % 2 === 0 
                    ? "linear-gradient(180deg, #fef3c7 0%, #fcd34d 100%)"
                    : "linear-gradient(180deg, #fed7aa 0%, #fb923c 100%)"
                }}
              >
                {/* Thumbnail */}
                {link.thumbnail && (
                  <div className="absolute inset-0">
                    <img src={link.thumbnail} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                )}
                
                {/* Title at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-2">
                  <span className="text-xs font-bold text-white drop-shadow-lg line-clamp-2">
                    {link.title}
                  </span>
                </div>

                {/* Story ring gradient */}
                <div className="absolute inset-0 rounded-2xl border-2 border-gradient-to-b from-yellow-300 to-orange-500" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Remaining Links as List */}
        <div className="w-full max-w-sm space-y-3 mt-4">
          {profile.links.slice(4).map((link, index) => (
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
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 w-full py-3 px-4 rounded-xl bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white text-lg flex-shrink-0">
                🌺
              </div>
              <span className="flex-1 font-medium text-orange-800">{link.title}</span>
              <ExternalLink className="w-4 h-4 text-orange-500" />
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}
