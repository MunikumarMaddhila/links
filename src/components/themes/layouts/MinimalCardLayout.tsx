"use client";

import { motion } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeLayoutProps, SocialIcons } from "./types";

// Minimal Card Style - Clean Professional
// White background with subtle shadows and card-based design
export function MinimalCardLayout({ profile, embedded = false, onLinkClick }: ThemeLayoutProps) {
  return (
    <div 
      className={`relative overflow-hidden ${embedded ? "rounded-[32px]" : "min-h-screen"}`}
      style={{ background: "#f8f9fa" }}
    >
      <div className="relative z-10 flex flex-col items-center pt-8 pb-8 px-4">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm bg-white rounded-3xl shadow-lg p-6 mb-4"
        >
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16 border-2 border-gray-100">
              <AvatarImage src={profile.avatar} className="object-cover" />
              <AvatarFallback className="text-xl font-bold bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h1 className="text-lg font-bold text-gray-900">{profile.name}</h1>
              <p className="text-sm text-gray-500">{profile.bio}</p>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100">
            <SocialIcons socialLinks={profile.socialLinks} iconColor="#6b7280" />
          </div>
        </motion.div>

        {/* Link Cards */}
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
              transition={{ delay: 0.15 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-4 w-full p-4 rounded-2xl bg-white shadow-md hover:shadow-lg transition-all group"
            >
              {link.thumbnail ? (
                <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={link.thumbnail} alt={link.title} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center flex-shrink-0">
                  <ExternalLink className="w-5 h-5 text-gray-400" />
                </div>
              )}
              
              <div className="flex-1">
                <span className="font-medium text-gray-900">{link.title}</span>
              </div>
              
              <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}
