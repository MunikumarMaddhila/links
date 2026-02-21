"use client";

import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LinkItemData } from './LinkItem';
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

interface LinkPreviewProps {
  links: LinkItemData[];
}

// Map icon names to Lucide components and colors
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

const isImageSource = (icon?: string) => {
  if (!icon) return false;
  return icon.startsWith('http://') || icon.startsWith('https://') || icon.startsWith('/') || icon.startsWith('data:');
};

const isEmoji = (icon?: string) => {
  if (!icon) return false;
  return !isImageSource(icon) && !iconMap[icon] && icon.length <= 4;
};

export function LinkPreview({ links }: LinkPreviewProps) {
  const enabledLinks = links.filter(link => link.enabled);

  const getIconComponent = (icon?: string) => {
    if (!icon) {
      return <ExternalLink className="w-4 h-4 text-white" />;
    }
    
    const iconData = iconMap[icon];
    if (iconData) {
      const IconComponent = iconData.icon;
      return (
        <div 
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: iconData.color }}
        >
          <IconComponent 
            className="w-4 h-4" 
            style={{ color: icon === 'snapchat' ? '#000' : '#fff' }}
            strokeWidth={2}
          />
        </div>
      );
    }
    
    if (isImageSource(icon)) {
      return (
        <span
          role="img"
          aria-label="icon"
          className="inline-block h-8 w-8 rounded-md bg-cover bg-center bg-no-repeat flex-shrink-0"
          style={{ backgroundImage: `url(${icon})` }}
        />
      );
    }
    
    return <span className="text-xl flex-shrink-0" aria-hidden="true">{icon}</span>;
  };

  return (
    <div className="sticky top-6">
      <Card className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800 border-2 p-6">
        <div className="flex items-center justify-center mb-4">
          <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Preview
          </div>
        </div>
        
        {/* Mobile Frame */}
        <div className="mx-auto max-w-[360px]">
          <div className="relative mx-auto border-[14px] border-gray-800 dark:border-gray-700 rounded-[2.5rem] h-[700px] w-[340px] shadow-xl bg-white dark:bg-gray-900">
            {/* Notch */}
            <div className="w-[148px] h-[18px] bg-gray-800 dark:bg-gray-700 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
            
            {/* Screen Content */}
            <div className="rounded-[2rem] overflow-y-auto h-full w-full bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
              <div className="p-8 pt-12 flex flex-col items-center">
                {/* Profile Section */}
                <Avatar className="w-24 h-24 border-4 border-white shadow-lg mb-4">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-2xl font-bold">
                    JS
                  </AvatarFallback>
                </Avatar>
                
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  Jordan Smith
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 text-center">
                  Welcome to my link hub
                </p>

                {/* Links */}
                <div className="w-full space-y-3">
                  {enabledLinks.length === 0 ? (
                    <div className="text-center py-12 text-gray-500 dark:text-gray-400 text-sm">
                      No active links yet.<br />Add some links to see them here!
                    </div>
                  ) : (
                    enabledLinks.map((link) => (
                      <button
                        key={link.id}
                        className="w-full p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-3 border border-gray-200 dark:border-gray-700 group hover:scale-[1.02]"
                      >
                        {getIconComponent(link.icon)}
                        <span className="flex-1 text-left font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {link.title}
                        </span>
                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                      </button>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          This is how your profile will look to visitors
        </p>
      </Card>
    </div>
  );
}
