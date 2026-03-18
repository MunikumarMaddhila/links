"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeLayoutProps } from "./types";

// Creative Professional Card - Clean layout with floating social icons
// Gradient background with well-spaced elements
export function WellnessCoachLayout({ profile, embedded = false, onLinkClick }: ThemeLayoutProps) {
  // Icons
  const PhoneIcon = (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
    </svg>
  );

  const WhatsAppIcon = (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );

  const InstagramIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
      <rect x="2" y="2" width="20" height="20" rx="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="18" cy="6" r="1.5" fill="currentColor"/>
    </svg>
  );

  const EmailIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="M2 7l10 7 10-7"/>
    </svg>
  );

  const TwitterIcon = (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );

  // Social icon button component
  const SocialButton = ({ 
    icon, 
    label,
    bgColor, 
    textColor,
    delay = 0,
    url,
    link
  }: { 
    icon: React.ReactNode; 
    label?: string;
    bgColor: string; 
    textColor: string;
    delay?: number;
    url?: string;
    link?: any;
  }) => (
    <motion.a
      href={url || "#"}
      onClick={(e) => {
        if (onLinkClick && link) {
          e.preventDefault();
          onLinkClick(link);
        }
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.05, y: -3 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-3 py-3 px-5 rounded-full shadow-lg transition-all"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <span className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
        {icon}
      </span>
      {label && (
        <span className="font-semibold text-sm uppercase tracking-wider pr-2">
          {label}
        </span>
      )}
    </motion.a>
  );

  // Icon-only button
  const IconButton = ({ 
    icon, 
    bgColor, 
    textColor,
    delay = 0,
    size = "md"
  }: { 
    icon: React.ReactNode; 
    bgColor: string; 
    textColor: string;
    delay?: number;
    size?: "sm" | "md" | "lg";
  }) => {
    const sizeClass = size === "lg" ? "w-14 h-14" : size === "sm" ? "w-10 h-10" : "w-12 h-12";
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        className={`${sizeClass} rounded-full flex items-center justify-center shadow-xl cursor-pointer`}
        style={{ backgroundColor: bgColor, color: textColor }}
      >
        {icon}
      </motion.div>
    );
  };

  return (
    <div 
      className={`relative overflow-y-auto overflow-x-hidden ${embedded ? "rounded-[32px]" : "min-h-screen"}`}
      style={{ 
        background: "linear-gradient(180deg, #1e3a5f 0%, #0d1f33 100%)",
        minHeight: embedded ? "100%" : "100vh"
      }}
    >
      {/* Background texture */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1557683316-973673baf926?w=800')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(50px)"
          }}
        />
      </div>

      {/* Scrollable content */}
      <div className="relative z-10 flex flex-col items-center px-5 py-10 space-y-6">
        
        {/* Profile Photo with gradient ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div 
            className="w-28 h-28 rounded-full p-1"
            style={{ 
              background: "linear-gradient(135deg, #4a90a4 0%, #2d5a6b 50%, #1e3a4a 100%)"
            }}
          >
            <Avatar className="w-full h-full border-2 border-white/20">
              <AvatarImage src={profile.avatar} className="object-cover" />
              <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-400 to-cyan-500 text-white">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          </div>
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center space-y-1"
        >
          <h1 
            className="text-2xl font-bold tracking-wide text-white"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {profile.name.toUpperCase()}
          </h1>
          <p className="text-cyan-300 text-sm tracking-widest uppercase">
            {profile.bio || "Digital Creator"} ✨
          </p>
        </motion.div>

        {/* Main CTA Buttons */}
        <div className="w-full space-y-3 pt-2">
          {profile.links.slice(0, 2).map((link, index) => (
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
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 w-full py-4 px-5 rounded-2xl shadow-lg"
              style={{ 
                background: index === 0 
                  ? "linear-gradient(135deg, #c9a962 0%, #a08040 100%)" 
                  : "rgba(255,255,255,0.1)",
                color: index === 0 ? "#1e3a5f" : "#ffffff",
                border: index === 1 ? "1px solid rgba(255,255,255,0.2)" : "none"
              }}
            >
              <span 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ 
                  backgroundColor: index === 0 ? "rgba(30,58,95,0.2)" : "rgba(255,255,255,0.15)"
                }}
              >
                {index === 0 ? PhoneIcon : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                    <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                  </svg>
                )}
              </span>
              <span className="font-semibold text-sm uppercase tracking-wider flex-1">
                {link.title}
              </span>
            </motion.a>
          ))}
        </div>

        {/* Floating Social Icons Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-3 py-4"
        >
          <IconButton 
            icon={WhatsAppIcon} 
            bgColor="#f5c518" 
            textColor="#1a1a1a"
            delay={0.55}
            size="lg"
          />
          <IconButton 
            icon={InstagramIcon} 
            bgColor="rgba(255,255,255,0.15)" 
            textColor="#ffffff"
            delay={0.6}
            size="md"
          />
          <IconButton 
            icon={TwitterIcon} 
            bgColor="rgba(255,255,255,0.15)" 
            textColor="#ffffff"
            delay={0.65}
            size="md"
          />
          <IconButton 
            icon={EmailIcon} 
            bgColor="rgba(255,255,255,0.15)" 
            textColor="#ffffff"
            delay={0.7}
            size="md"
          />
        </motion.div>

        {/* Additional Links */}
        <div className="w-full space-y-3">
          {profile.links.slice(2).map((link, index) => (
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
              transition={{ delay: 0.75 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center w-full py-3.5 px-5 rounded-xl text-white text-sm font-medium"
              style={{ 
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)"
              }}
            >
              {link.title}
            </motion.a>
          ))}
        </div>

        {/* Bio text section */}
        {profile.bio && profile.bio.length > 20 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="w-full p-4 rounded-xl text-center"
            style={{ 
              background: "linear-gradient(135deg, rgba(201,169,98,0.2) 0%, rgba(160,128,64,0.1) 100%)",
              border: "1px solid rgba(201,169,98,0.3)"
            }}
          >
            <p className="text-sm text-white/80 leading-relaxed">
              {profile.bio}
            </p>
          </motion.div>
        )}

        {/* Bottom spacing */}
        <div className="h-4" />
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-1"
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-white/60"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
