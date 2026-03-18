"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeLayoutProps, SocialIcons } from "./types";

// Standard Clean Layout
// Classic bio link page with clean minimal design
export function StandardLayout({ profile, embedded = false, onLinkClick }: ThemeLayoutProps) {
  return (
    <div 
      className={`relative overflow-hidden ${embedded ? "rounded-[32px]" : "min-h-screen"}`}
      style={{ background: "#ffffff" }}
    >
      <div className="relative z-10 flex flex-col items-center pt-10 pb-8 px-4">
        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center mb-8"
        >
          <Avatar className="w-24 h-24 mb-4 shadow-md">
            <AvatarImage src={profile.avatar} className="object-cover" />
            <AvatarFallback className="text-2xl font-bold bg-gray-100 text-gray-700">
              {profile.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <h1 className="text-xl font-semibold text-gray-900 mb-1">
            {profile.name}
          </h1>
          
          <p className="text-gray-500 text-sm text-center max-w-xs mb-4">
            {profile.bio}
          </p>
          
          <SocialIcons socialLinks={profile.socialLinks} iconColor="#6b7280" />
        </motion.div>

        {/* Link Buttons */}
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
              transition={{ delay: 0.1 + index * 0.05 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-between w-full py-4 px-6 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all"
            >
              <span className="font-medium text-gray-800">{link.title}</span>
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}
