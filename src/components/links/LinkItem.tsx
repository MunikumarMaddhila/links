"use client";

import { motion, Reorder, useDragControls } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
  GripVertical,
  ExternalLink,
  MoreHorizontal,
  Pencil,
  Trash2,
  Copy,
  BarChart2,
  Clock,
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
  Globe
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export interface LinkItemData {
  id: string;
  title: string;
  url: string;
  enabled: boolean;
  clicks: number;
  icon?: string;
  iconColor?: string;
  scheduled?: boolean;
}

interface LinkItemProps {
  link: LinkItemData;
  onToggle: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
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
  // Check if it's a simple emoji (not a URL or icon name)
  return !isImageSource(icon) && !iconMap[icon] && icon.length <= 4;
};

export function LinkItem({ link, onToggle, onEdit, onDelete }: LinkItemProps) {
  const controls = useDragControls();
  
  const getIconComponent = () => {
    if (!link.icon) {
      return <ExternalLink className="w-5 h-5 text-muted-foreground" />;
    }
    
    // Check if it's a mapped social media icon
    const iconData = iconMap[link.icon];
    if (iconData) {
      const IconComponent = iconData.icon;
      return (
        <div 
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ backgroundColor: iconData.color }}
        >
          <IconComponent 
            className="w-4 h-4" 
            style={{ color: link.icon === 'snapchat' ? '#000' : '#fff' }}
            strokeWidth={2}
          />
        </div>
      );
    }
    
    // Check if it's an image
    if (isImageSource(link.icon)) {
      return (
        <span
          role="img"
          aria-label={`${link.title} icon`}
          className="inline-block h-8 w-8 rounded-md bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${link.icon})` }}
        />
      );
    }
    
    // Otherwise treat as emoji
    return <span className="text-2xl" aria-hidden="true">{link.icon}</span>;
  };

  return (
    <Reorder.Item
      value={link}
      id={link.id}
      dragListener={false}
      dragControls={controls}
      className="mb-3"
    >
      <div>
        <Card className={cn(
          "p-4 border transition-all duration-200",
          link.enabled ? "border-border bg-card" : "border-border/50 bg-muted/30"
        )}>
          <div className="flex items-center gap-4">
            {/* Drag Handle */}
            <button
              onPointerDown={(e) => controls.start(e)}
              className="cursor-grab active:cursor-grabbing touch-none p-1 text-muted-foreground hover:text-foreground"
            >
              <GripVertical className="w-5 h-5" />
            </button>

            {/* Link Icon/Image */}
            <div className="flex items-center justify-center flex-shrink-0">
              {getIconComponent()}
            </div>

            {/* Link Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className={cn(
                  "font-medium truncate",
                  !link.enabled && "text-muted-foreground"
                )}>
                  {link.title}
                </h3>
                {link.scheduled && (
                  <Badge variant="outline" className="text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    Scheduled
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground truncate">{link.url}</p>
            </div>

            {/* Click Stats */}
            <div className="hidden sm:flex items-center gap-1 text-sm text-muted-foreground">
              <BarChart2 className="w-4 h-4" />
              <span>{link.clicks.toLocaleString()}</span>
            </div>

            {/* Toggle */}
            <Switch
              checked={link.enabled}
              onCheckedChange={() => onToggle(link.id)}
            />

            {/* Actions Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(link.id)}>
                  <Pencil className="w-4 h-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Copy className="w-4 h-4 mr-2" />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => onDelete(link.id)}
                  className="text-destructive"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </Card>
      </div>
    </Reorder.Item>
  );
}
