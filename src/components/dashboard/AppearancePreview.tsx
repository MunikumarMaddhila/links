"use client";

import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useTheme } from '@/contexts/ThemeContext';
import { useLinks } from '@/contexts/LinksContext';
import { Monitor, Tablet, Smartphone } from 'lucide-react';
import { useState } from 'react';
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

type ViewMode = 'mobile' | 'tablet' | 'desktop';

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

export function AppearancePreview() {
  const { currentTheme, profileName, profileBio, profileImage } = useTheme();
  const { links } = useLinks();
  const [viewMode, setViewMode] = useState<ViewMode>('mobile');

  const enabledLinks = links.filter(link => link.enabled).slice(0, 5);

  const getIconComponent = (icon?: string) => {
    if (!icon) {
      return <ExternalLink className="w-4 h-4" />;
    }
    
    const iconData = iconMap[icon];
    if (iconData) {
      const IconComponent = iconData.icon;
      return (
        <div 
          className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: iconData.color }}
        >
          <IconComponent 
            className="w-3 h-3" 
            style={{ color: icon === 'snapchat' ? '#000' : '#fff' }}
            strokeWidth={2}
          />
        </div>
      );
    }
    
    return <span className="text-lg flex-shrink-0">{icon}</span>;
  };

  const getButtonClassName = () => {
    const base = "w-full p-3 transition-all duration-200 flex items-center gap-3 font-semibold";
    const shadow = "shadow-md hover:shadow-lg";
    
    const styles: Record<string, string> = {
      rounded: "rounded-xl justify-center",
      pill: "rounded-full justify-center",
      sharp: "rounded-none justify-center",
      outline: "rounded-xl border-2 justify-center",
      'icon-left': "rounded-full justify-start pl-2",
      'icon-left-rounded': "rounded-full justify-start pl-3",
      'icon-circle': "rounded-full justify-start pl-3",
      'icon-float': "rounded-full justify-start pl-2",
    };

    return `${base} ${styles[currentTheme.buttonStyle] || styles.rounded} ${shadow}`;
  };

  const isIconStyle = () => {
    return ['icon-left', 'icon-left-rounded', 'icon-circle', 'icon-float'].includes(currentTheme.buttonStyle);
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
    if (style === 'icon-left' || style === 'icon-float') {
      return {
        background: '#ffffff',
        color: '#374151',
        border: '2px solid #e5e7eb',
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

  const getFontClassName = () => {
    const fonts = {
      inter: "font-sans",
      serif: "font-serif",
      mono: "font-mono",
    };
    return fonts[currentTheme.fontStyle];
  };

  const getBackgroundPattern = () => {
    switch (currentTheme.backgroundPattern) {
      case 'dots':
        return 'radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)';
      case 'grid':
        return 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)';
      default:
        return '';
    }
  };

  const getStyleForBackground = () => {
    if (currentTheme.backgroundPattern === 'none' || currentTheme.backgroundPattern === 'gradient') {
      return {
        backgroundImage: currentTheme.colorScheme.background,
      };
    }
    
    // For dots and grid patterns, combine gradient with pattern
    return {
      backgroundImage: `${getBackgroundPattern()}, ${currentTheme.colorScheme.background}`,
      backgroundSize: currentTheme.backgroundPattern === 'dots' ? '20px 20px, 100%' : '20px 20px, 100%',
      backgroundPosition: '0 0, 0 0',
    };
  };

  const dimensions = {
    mobile: { width: '340px', height: '700px', border: '14px' },
    tablet: { width: '500px', height: '700px', border: '16px' },
    desktop: { width: '100%', height: '600px', border: '0px' },
  };

  const currentDimensions = dimensions[viewMode];

  return (
    <div className="sticky top-6 z-10">
      <style jsx global>{`
        .preview-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.5) rgba(0, 0, 0, 0.1);
          overflow-y: scroll !important;
        }
        .preview-scroll::-webkit-scrollbar {
          width: 6px;
          display: block !important;
        }
        .preview-scroll::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 10px;
        }
        .preview-scroll::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.5);
          border-radius: 10px;
        }
        .preview-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.7);
        }
      `}</style>
      <Card className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800 border-2 p-6">
        {/* View Mode Toggles */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Preview
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('mobile')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'mobile' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
              title="Mobile"
            >
              <Smartphone className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('tablet')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'tablet' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
              title="Tablet"
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('desktop')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'desktop' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
              title="Desktop"
            >
              <Monitor className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {/* Device Frame */}
        <div className={`mx-auto max-w-full overflow-y-visible pb-4 ${viewMode === 'tablet' ? 'overflow-x-auto' : 'overflow-x-hidden'}`}>
          {viewMode === 'desktop' ? (
            <div 
              className="rounded-lg overflow-hidden shadow-2xl"
              style={{ 
                width: currentDimensions.width,
                height: currentDimensions.height,
              }}
            >
              <div 
                className={`h-full w-full overflow-y-auto ${getFontClassName()}`}
                style={getStyleForBackground()}
              >
                <div className="p-12 flex flex-col items-center max-w-2xl mx-auto">
                  {/* Profile Section */}
                  <Avatar className="w-32 h-32 border-4 border-white/20 shadow-2xl mb-6">
                    <AvatarImage src={profileImage} />
                    <AvatarFallback 
                      className="text-3xl font-bold"
                      style={{ 
                        background: 'rgba(255,255,255,0.2)',
                        color: currentTheme.colorScheme.text 
                      }}
                    >
                      {profileName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <h2 
                    className="text-3xl font-bold mb-2"
                    style={{ color: currentTheme.colorScheme.text }}
                  >
                    {profileName}
                  </h2>
                  <p 
                    className="text-lg mb-8 text-center"
                    style={{ color: currentTheme.colorScheme.subtext }}
                  >
                    {profileBio}
                  </p>

                  {/* Links */}
                  <div className="w-full space-y-4">
                    {enabledLinks.length === 0 ? (
                      <div 
                        className="text-center py-12 text-sm"
                        style={{ color: currentTheme.colorScheme.subtext }}
                      >
                        No active links yet
                      </div>
                    ) : (
                      enabledLinks.map((link) => {
                        const isIconStyleActive = isIconStyle();
                        const iconGradient = getIconGradient(currentTheme.buttonStyle);
                        const buttonStyleOverride = isIconStyleActive ? getButtonStyleForIcon(currentTheme.buttonStyle) : {};
                        
                        return (
                          <button
                            key={link.id}
                            className={getButtonClassName()}
                            style={{
                              ...(isIconStyleActive ? buttonStyleOverride : {
                                background: currentTheme.buttonStyle === 'outline' 
                                  ? 'transparent' 
                                  : currentTheme.colorScheme.buttonBackground,
                                color: currentTheme.buttonStyle === 'outline'
                                  ? currentTheme.colorScheme.text
                                  : currentTheme.colorScheme.buttonText,
                                borderColor: currentTheme.buttonStyle === 'outline' 
                                  ? currentTheme.colorScheme.text 
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
                                <span className="text-white text-sm">
                                  {currentTheme.buttonStyle === 'icon-left' && '↓'}
                                  {currentTheme.buttonStyle === 'icon-left-rounded' && '»'}
                                  {currentTheme.buttonStyle === 'icon-circle' && '→'}
                                  {currentTheme.buttonStyle === 'icon-float' && '⟨'}
                                </span>
                              </div>
                            )}
                            <span>{link.title}</span>
                          </button>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative mx-auto" style={{ width: viewMode === 'mobile' ? '340px' : '500px' }}>
              <div 
                className="relative mx-auto rounded-[2.5rem] shadow-2xl"
                style={{
                  width: currentDimensions.width,
                  height: currentDimensions.height,
                  border: `${currentDimensions.border} solid #1f2937`,
                }}
              >
                {/* Notch (mobile only) */}
                {viewMode === 'mobile' && (
                  <div className="w-[148px] h-[18px] bg-gray-800 dark:bg-gray-700 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute z-10"></div>
                )}
                
                {/* Screen Content */}
                <div 
                  className={`rounded-[2rem] overflow-hidden h-full w-full ${getFontClassName()}`}
                  style={getStyleForBackground()}
                >
                  <div className="p-8 pt-12 flex flex-col items-center">
                    {/* Profile Section */}
                    <Avatar className="w-24 h-24 border-4 border-white/20 shadow-lg mb-4">
                      <AvatarImage src={profileImage} />
                      <AvatarFallback 
                        className="text-2xl font-bold"
                        style={{ 
                          background: 'rgba(255,255,255,0.2)',
                          color: currentTheme.colorScheme.text 
                        }}
                      >
                        {profileName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <h2 
                      className="text-xl font-bold mb-1"
                      style={{ color: currentTheme.colorScheme.text }}
                    >
                      {profileName}
                    </h2>
                    <p 
                      className="text-sm mb-6 text-center"
                      style={{ color: currentTheme.colorScheme.subtext }}
                    >
                      {profileBio}
                    </p>

                    {/* Links */}
                    <div className="w-full space-y-3">
                      {enabledLinks.length === 0 ? (
                        <div 
                          className="text-center py-12 text-sm"
                          style={{ color: currentTheme.colorScheme.subtext }}
                        >
                          No active links yet
                        </div>
                      ) : (
                        enabledLinks.map((link) => (
                          <button
                            key={link.id}
                            className={getButtonClassName()}
                            style={{
                              background: currentTheme.buttonStyle === 'outline' 
                                ? 'transparent' 
                                : currentTheme.colorScheme.buttonBackground,
                              color: currentTheme.buttonStyle === 'outline'
                                ? currentTheme.colorScheme.text
                                : currentTheme.colorScheme.buttonText,
                              borderColor: currentTheme.buttonStyle === 'outline' 
                                ? currentTheme.colorScheme.text 
                                : 'transparent',
                            }}
                          >
                            {link.title}
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Live preview with {currentTheme.name} theme
        </p>
      </Card>
    </div>
  );
}
