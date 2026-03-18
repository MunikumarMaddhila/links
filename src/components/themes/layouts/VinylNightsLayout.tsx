"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeLayoutProps, SocialIcons } from "./types";

// ZayVell Style - Vinyl Nights
// Dark theme with vinyl record players and gradient content cards
export function VinylNightsLayout({ profile, embedded = false, onLinkClick }: ThemeLayoutProps) {
  return (
    <div 
      className={`relative overflow-hidden ${embedded ? "rounded-[32px]" : "min-h-screen"}`}
      style={{ 
        background: "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)" 
      }}
    >
      <div className="relative z-10 flex flex-col items-center pt-6 pb-8 px-4">
        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4"
        >
          <h1 className="text-2xl font-bold text-white mb-1 tracking-wider">
            {profile.name}
          </h1>
          <p className="text-white/60 text-sm mb-2">{profile.bio}</p>
        </motion.div>

        {/* Social Icons */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <SocialIcons socialLinks={profile.socialLinks} iconColor="#ffffff" />
        </motion.div>

        {/* Vinyl Records Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative w-full max-w-sm mb-8"
        >
          <div className="flex justify-center gap-4">
            {/* Left Vinyl */}
            <div className="relative">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="w-28 h-28 rounded-full border-4 border-pink-500/50 relative"
                style={{ 
                  background: "radial-gradient(circle, #1a1a1a 25%, #ec4899 45%, #1a1a1a 55%, #333 100%)" 
                }}
              >
                {/* Center hole */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-pink-400 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-black" />
                </div>
                {/* Record grooves */}
                <div className="absolute inset-4 rounded-full border border-gray-700/30" />
                <div className="absolute inset-8 rounded-full border border-gray-700/30" />
              </motion.div>
              {/* Album art overlay */}
              {profile.links[0]?.thumbnail && (
                <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-lg overflow-hidden border-2 border-pink-500 shadow-lg">
                  <img src={profile.links[0].thumbnail} alt="" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            {/* Right Vinyl */}
            <div className="relative">
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="w-28 h-28 rounded-full border-4 border-purple-500/50 relative"
                style={{ 
                  background: "radial-gradient(circle, #1a1a1a 25%, #8b5cf6 45%, #1a1a1a 55%, #333 100%)" 
                }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-purple-400 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-black" />
                </div>
                <div className="absolute inset-4 rounded-full border border-gray-700/30" />
                <div className="absolute inset-8 rounded-full border border-gray-700/30" />
              </motion.div>
              {profile.links[1]?.thumbnail && (
                <div className="absolute -bottom-2 -left-2 w-12 h-12 rounded-lg overflow-hidden border-2 border-purple-500 shadow-lg">
                  <img src={profile.links[1].thumbnail} alt="" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Photo Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-sm grid grid-cols-2 gap-2 mb-6"
        >
          {profile.links.slice(0, 4).map((link, index) => (
            <a
              key={link.id}
              href={link.url}
              onClick={(e) => {
                if (onLinkClick) {
                  e.preventDefault();
                  onLinkClick(link);
                }
              }}
              className="aspect-square rounded-lg overflow-hidden relative group"
              style={{ 
                background: `linear-gradient(135deg, ${index % 2 === 0 ? '#ec4899' : '#8b5cf6'} 0%, ${index % 2 === 0 ? '#be185d' : '#6d28d9'} 100%)`
              }}
            >
              {link.thumbnail ? (
                <img src={link.thumbnail} alt={link.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white/70 text-xs text-center px-2">{link.title}</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <ExternalLink className="w-6 h-6 text-white" />
              </div>
            </a>
          ))}
        </motion.div>

        {/* Gradient Link Buttons */}
        <div className="w-full max-w-sm space-y-3">
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
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="block w-full py-3.5 px-6 rounded-xl font-medium text-center text-white shadow-lg hover:shadow-xl transition-all"
              style={{
                background: index % 2 === 0 
                  ? "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)"
                  : "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)"
              }}
            >
              {link.title}
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}
