"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { colorThemes, ButtonStyle, FontStyle, ColorTheme } from "@/contexts/ThemeContext";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube, 
  Github, 
  MessageCircle, 
  Music, 
  Send, 
  Music2, 
  Pin, 
  Globe, 
  ExternalLink 
} from 'lucide-react';
import { cn } from "@/lib/utils";

// --- Types ---
interface PublicProfileData {
  username: string;
  profile: {
    name: string;
    bio: string;
    image: string;
  };
  theme: {
    colorThemeId: string;
    buttonStyle: ButtonStyle;
    fontStyle: FontStyle;
    backgroundPattern?: 'none' | 'dots' | 'grid' | 'gradient';
  };
  links: Array<{
    id: string;
    title: string;
    url: string;
    enabled: boolean;
  }>;
  socials?: Record<string, string>;
}

// --- Icons Setup ---
const iconMap: Record<string, { icon: any; color: string }> = {
  facebook: { icon: Facebook, color: '#1877F2' },
  instagram: { icon: Instagram, color: '#E4405F' },
  whatsapp: { icon: MessageCircle, color: '#25D366' },
  twitter: { icon: Twitter, color: '#1DA1F2' },
  pinterest: { icon: Pin, color: '#E60023' },
  tiktok: { icon: Music, color: '#000000' },
  youtube: { icon: Youtube, color: '#FF0000' },
  linkedin: { icon: Linkedin, color: '#0A66C2' },
  spotify: { icon: Music2, color: '#1DB954' },
  snapchat: { icon: Github, color: '#FFFC00' },
  tumblr: { icon: Globe, color: '#35465C' },
  twitch: { icon: MessageCircle, color: '#9146FF' },
  reddit: { icon: MessageCircle, color: '#FF4500' },
  telegram: { icon: Send, color: '#0088cc' },
  github: { icon: Github, color: '#181717' },
  website: { icon: Globe, color: '#6B7280' },
};

export default function UserProfilePage() {
  const params = useParams();
  const username = params.username as string;
  
  const [data, setData] = useState<PublicProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- Fetch Data ---
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/public/${username}`);
        if (!res.ok) throw new Error("Profile not found");
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Profile Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">The page you are looking for does not exist.</p>
        </div>
      </div>
    );
  }

  // --- Render Logic (mirrors AppearancePreview.tsx) ---
  const currentTheme = colorThemes.find(t => t.id === data.theme.colorThemeId) || colorThemes[0];
  const { buttonStyle, fontStyle, backgroundPattern } = data.theme;

  const getFontClassName = () => {
    const fonts = {
      inter: "font-sans",
      serif: "font-serif",
      mono: "font-mono",
    };
    return fonts[fontStyle] || "font-sans";
  };

  const getBackgroundStyle = () => {
    const baseStyle = {
      minHeight: '100vh',
      width: '100%',
      color: currentTheme.text,
    };

    if (!backgroundPattern || backgroundPattern === 'none' || backgroundPattern === 'gradient') {
      return {
        ...baseStyle,
        background: currentTheme.background,
      };
    }
    
    // Pattern styles
    let patternImage = '';
    if (backgroundPattern === 'dots') {
      patternImage = 'radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)';
    } else if (backgroundPattern === 'grid') {
      patternImage = 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)';
    }

    return {
      ...baseStyle,
      backgroundImage: `${patternImage}, ${currentTheme.background}`,
      backgroundSize: '20px 20px, 100%',
      backgroundPosition: '0 0, 0 0',
      backgroundAttachment: 'fixed', // Keep background fixed while scrolling
    };
  };

  const getButtonClassName = () => {
    const base = "w-full p-4 transition-all duration-200 flex items-center gap-3 font-semibold relative overflow-hidden group";
    const shadow = "shadow-lg hover:shadow-xl hover:-translate-y-1";
    
    const styles: Record<string, string> = {
      rounded: "rounded-2xl justify-center",
      pill: "rounded-full justify-center",
      sharp: "rounded-none justify-center",
      outline: "rounded-2xl border-2 justify-center",
      'icon-left': "rounded-full justify-start pl-2",
      'icon-left-rounded': "rounded-full justify-start pl-3",
      'icon-circle': "rounded-full justify-start pl-3",
      'icon-float': "rounded-full justify-start pl-2",
    };

    return cn(base, styles[buttonStyle] || styles.rounded, shadow);
  };

  const isIconStyle = () => {
    return ['icon-left', 'icon-left-rounded', 'icon-circle', 'icon-float'].includes(buttonStyle);
  };

  const getIconGradient = (style: string) => {
    const gradients: Record<string, string> = {
      'icon-left': 'linear-gradient(135deg, #3b82f6 0%, #22d3ee 100%)',
      'icon-left-rounded': 'linear-gradient(135deg, #f97316 0%, #facc15 100%)',
      'icon-circle': 'linear-gradient(135deg, #14b8a6 0%, #3b82f6 100%)',
      'icon-float': 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
    };
    return gradients[style] || gradients['icon-left'];
  };

  const getButtonStyleForIcon = (style: string) => {
      // Special overrides for icon styles
    if (style === 'icon-left' || style === 'icon-float') {
      return {
        background: '#ffffff',
        color: '#374151', // Dark text for white background
        border: '2px solid rgba(0,0,0,0.05)',
      };
    }
    if (style === 'icon-left-rounded') {
      return {
        background: 'linear-gradient(135deg, #f97316 0%, #facc15 100%)',
        color: '#ffffff',
        border: 'none',
      };
    }
    if (style === 'icon-circle') {
      return {
        background: 'linear-gradient(135deg, #14b8a6 0%, #3b82f6 100%)',
        color: '#ffffff',
        border: 'none',
      };
    }
    return {};
  };

  // --- Main Render ---
  return (
    <div className={getFontClassName()} style={getBackgroundStyle()}>
      <div className="min-h-screen w-full flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-lg space-y-8">
          
          {/* Profile Header */}
          <div className="flex flex-col items-center text-center space-y-4">
            <Avatar className="w-32 h-32 border-4 border-white/20 shadow-2xl">
              <AvatarImage src={data.profile.image} alt={data.profile.name} />
              <AvatarFallback 
                className="text-4xl font-bold"
                  style={{ 
                    background: 'rgba(255,255,255,0.2)',
                    color: currentTheme.text 
                  }}
              >
                {data.profile.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight" style={{ color: currentTheme.text }}>
                {data.profile.name}
              </h1>
              <p className="text-lg max-w-md mx-auto opacity-90 font-medium" style={{ color: currentTheme.subtext }}>
                {data.profile.bio}
              </p>
            </div>
          </div>

          {/* Social Icons (if any) */}
          {data.socials && Object.keys(data.socials).length > 0 && (
             <div className="flex justify-center gap-4 flex-wrap">
               {Object.entries(data.socials).map(([platform, handle]) => {
                 const iconData = iconMap[platform.toLowerCase()];
                 if (!iconData) return null;
                 const Icon = iconData.icon;
                 
                 return (
                   <a
                     key={platform}
                     href={`https://${platform}.com/${handle}`} // Simplified
                     target="_blank"
                     rel="noopener noreferrer"
                     className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm"
                     style={{ color: currentTheme.text }}
                   >
                     <Icon className="w-6 h-6" />
                   </a>
                 );
               })}
             </div>
          )}

          {/* Links List */}
          <div className="space-y-4 w-full">
            {data.links.filter(l => l.enabled).length === 0 ? (
                <div className="text-center py-8 opacity-70" style={{ color: currentTheme.subtext }}>
                    No public links available.
                </div>
            ) : (
                data.links.filter(l => l.enabled).map((link) => {
                    const isIconStyleActive = isIconStyle();
                    const iconGradient = getIconGradient(buttonStyle);
                    const buttonStyleOverride = isIconStyleActive ? getButtonStyleForIcon(buttonStyle) : {};
                    
                    return (
                        <a
                            key={link.id}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={getButtonClassName()}
                            style={{
                                ...(isIconStyleActive ? buttonStyleOverride : {
                                    background: buttonStyle === 'outline' 
                                        ? 'transparent' 
                                        : currentTheme.buttonBackground,
                                    color: buttonStyle === 'outline'
                                        ? currentTheme.text
                                        : currentTheme.buttonText,
                                    borderColor: buttonStyle === 'outline' 
                                        ? currentTheme.text 
                                        : 'transparent',
                                }),
                            }}
                        >
                            {isIconStyleActive && (
                                <div 
                                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-md"
                                    style={{ 
                                        background: iconGradient,
                                    }}
                                >
                                    <span className="text-white text-sm font-bold">
                                        {buttonStyle === 'icon-left' && '↓'}
                                        {buttonStyle === 'icon-left-rounded' && '»'}
                                        {buttonStyle === 'icon-circle' && '→'}
                                        {buttonStyle === 'icon-float' && '⟨'}
                                    </span>
                                </div>
                            )}
                            <span className="z-10">{link.title}</span>
                            
                            {/* Hover Effect Layer */}
                            {buttonStyle !== 'outline' && (
                                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                            )}
                        </a>
                    );
                })
            )}
          </div>

          {/* Footer */}
          <div className="pt-8 text-center pb-8">
            <a 
              href="/" 
              className="inline-flex items-center gap-2 text-sm font-medium opacity-60 hover:opacity-100 transition-opacity"
              style={{ color: currentTheme.text }}
            >
              <span>Creat your own LinkHub</span>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
