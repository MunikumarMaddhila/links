"use client";

import { motion } from "framer-motion";
import { ExternalLink, Play, Music, Camera } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeLayoutProps, SocialIcons } from "./types";

// Modern Bento Box Grid Layout
// Asymmetric grid with various content types
export function BentoCreativeLayout({ profile, embedded = false, onLinkClick }: ThemeLayoutProps) {
  const links = profile.links;
  
  return (
    <div 
      className={`relative overflow-hidden ${embedded ? "rounded-[32px]" : "min-h-screen"}`}
      style={{ 
        background: "#0a0a0a"
      }}
    >
      {/* Grid Pattern Background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }}
      />
      
      <div className="relative z-10 flex flex-col items-center pt-6 pb-8 px-4">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 w-full max-w-sm mb-6 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
        >
          <Avatar className="w-16 h-16 border-2 border-white/20">
            <AvatarImage src={profile.avatar} className="object-cover" />
            <AvatarFallback className="text-lg font-bold bg-gradient-to-br from-purple-500 to-pink-500 text-white">
              {profile.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <h1 className="text-xl font-bold text-white">{profile.name}</h1>
            <p className="text-white/60 text-sm">{profile.bio}</p>
          </div>
          
          <SocialIcons socialLinks={profile.socialLinks} iconColor="#ffffff" />
        </motion.div>

        {/* Bento Grid */}
        <div className="w-full max-w-sm grid grid-cols-2 gap-3">
          {/* Large Featured Card */}
          {links[0] && (
            <motion.a
              href={links[0].url}
              onClick={(e) => {
                if (onLinkClick) {
                  e.preventDefault();
                  onLinkClick(links[0]);
                }
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="col-span-2 relative aspect-[2/1] rounded-2xl overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600" />
              {links[0].thumbnail && (
                <img 
                  src={links[0].thumbnail} 
                  alt={links[0].title}
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-70 transition-opacity"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-semibold text-lg">{links[0].title}</p>
                <div className="flex items-center gap-2 mt-1 text-white/70 text-sm">
                  <Play className="w-4 h-4" />
                  <span>Featured</span>
                </div>
              </div>
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <ExternalLink className="w-4 h-4 text-white" />
              </div>
            </motion.a>
          )}

          {/* Square Cards */}
          {links.slice(1, 5).map((link, index) => {
            const icons = [Music, Camera, Play, Music];
            const Icon = icons[index % icons.length];
            const gradients = [
              "from-emerald-500 to-teal-600",
              "from-orange-500 to-red-600",
              "from-blue-500 to-indigo-600",
              "from-pink-500 to-rose-600"
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
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 + index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative aspect-square rounded-2xl overflow-hidden group ${
                  index === 3 ? 'col-span-2' : ''
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index]}`} />
                {link.thumbnail && (
                  <img 
                    src={link.thumbnail} 
                    alt={link.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-70 transition-opacity"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-white font-medium text-sm">{link.title}</p>
                </div>
                <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Icon className="w-3 h-3 text-white" />
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Remaining Links as List */}
        {links.length > 5 && (
          <div className="w-full max-w-sm mt-3 space-y-2">
            {links.slice(5).map((link, index) => (
              <motion.a
                key={link.id}
                href={link.url}
                onClick={(e) => {
                  if (onLinkClick) {
                    e.preventDefault();
                    onLinkClick(link);
                  }
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-between w-full py-3 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <span className="text-white font-medium text-sm">{link.title}</span>
                <ExternalLink className="w-4 h-4 text-white/50" />
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
