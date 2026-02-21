"use client";

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  Globe
} from 'lucide-react';
import { LinkItemData } from './LinkItem';

// Social media icon options with brand colors (same as AddLinkDialog)
const iconOptions = [
  { name: 'Facebook', icon: Facebook, value: 'facebook', color: '#1877F2' },
  { name: 'Instagram', icon: Instagram, value: 'instagram', color: '#E4405F' },
  { name: 'WhatsApp', icon: MessageCircle, value: 'whatsapp', color: '#25D366' },
  { name: 'Twitter', icon: Twitter, value: 'twitter', color: '#1DA1F2' },
  { name: 'Pinterest', icon: Pin, value: 'pinterest', color: '#E60023' },
  { name: 'TikTok', icon: Music, value: 'tiktok', color: '#000000' },
  { name: 'YouTube', icon: Youtube, value: 'youtube', color: '#FF0000' },
  { name: 'LinkedIn', icon: Linkedin, value: 'linkedin', color: '#0A66C2' },
  { name: 'Spotify', icon: Music2, value: 'spotify', color: '#1DB954' },
  { name: 'Snapchat', icon: Github, value: 'snapchat', color: '#FFFC00' },
  { name: 'Tumblr', icon: Globe, value: 'tumblr', color: '#35465C' },
  { name: 'Twitch', icon: MessageCircle, value: 'twitch', color: '#9146FF' },
  { name: 'Reddit', icon: MessageCircle, value: 'reddit', color: '#FF4500' },
  { name: 'Telegram', icon: Send, value: 'telegram', color: '#0088cc' },
  { name: 'GitHub', icon: Github, value: 'github', color: '#181717' },
  { name: 'Website', icon: Globe, value: 'website', color: '#6B7280' },
];

interface EditLinkDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  link: LinkItemData | null;
  onSave: (linkData: {
    linkId: string;
    title: string;
    url: string;
    icon: string;
    iconName: string;
  }) => void;
}

export function EditLinkDialog({ open, onOpenChange, link, onSave }: EditLinkDialogProps) {
  const [selectedIcon, setSelectedIcon] = useState('website');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  // Pre-fill form when link changes
  useEffect(() => {
    if (link) {
      setSelectedIcon(link.icon || 'website');
      setTitle(link.title);
      setUrl(link.url);
    }
  }, [link]);

  const handleSave = () => {
    if (!title || !url) {
      alert('Please fill in title and URL');
      return;
    }

    if (!link) return;

    const selectedIconOption = iconOptions.find(opt => opt.value === selectedIcon);

    onSave({
      linkId: link.id,
      title,
      url,
      icon: selectedIcon,
      iconName: selectedIconOption?.name || selectedIcon,
    });

    onOpenChange(false);
  };

  const handleCancel = () => {
    // Reset to original link data
    if (link) {
      setSelectedIcon(link.icon || 'website');
      setTitle(link.title);
      setUrl(link.url);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto bg-gradient-to-br from-white to-slate-50 dark:from-gray-900 dark:to-gray-800 border-2">
        <DialogHeader className="space-y-3 pb-2">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            Edit Link
          </DialogTitle>
          <DialogDescription className="text-base">
            Update your link details. Change the icon, title, or URL below.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-8 py-2">
          {/* Icon Selection */}
          <div className="space-y-4">
            <Label className="text-base font-semibold text-gray-900 dark:text-gray-100">
              Select Social Media Icon
            </Label>
            <div className="grid grid-cols-8 gap-4 p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900/50 shadow-inner">
              {iconOptions.map((iconOption) => {
                const IconComponent = iconOption.icon;
                const isSelected = selectedIcon === iconOption.value;
                return (
                  <button
                    key={iconOption.value}
                    type="button"
                    onClick={() => setSelectedIcon(iconOption.value)}
                    className={`
                      relative p-2.5 rounded-full transition-all duration-200 flex items-center justify-center
                      transform hover:scale-125 hover:-translate-y-1 group
                      ${isSelected 
                        ? 'ring-3 ring-amber-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 shadow-xl scale-105' 
                        : 'hover:shadow-lg'
                      }
                    `}
                    style={{ 
                      backgroundColor: iconOption.color,
                      color: iconOption.value === 'snapchat' ? '#000' : '#fff'
                    }}
                    title={iconOption.name}
                  >
                    <IconComponent className="w-4 h-4" strokeWidth={2} />
                    {isSelected && (
                      <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-amber-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Title Field */}
          <div className="space-y-3">
            <Label htmlFor="edit-title" className="text-base font-semibold text-gray-900 dark:text-gray-100">
              Link Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="edit-title"
              placeholder="e.g., My Portfolio"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-12 text-base border-2 focus:border-amber-500 focus:ring-amber-500 transition-all"
            />
          </div>

          {/* URL Field */}
          <div className="space-y-3">
            <Label htmlFor="edit-url" className="text-base font-semibold text-gray-900 dark:text-gray-100">
              URL <span className="text-red-500">*</span>
            </Label>
            <Input
              id="edit-url"
              type="url"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="h-12 text-base border-2 focus:border-amber-500 focus:ring-amber-500 transition-all"
            />
          </div>
        </div>

        <DialogFooter className="gap-3 pt-6">
          <Button 
            variant="outline" 
            onClick={handleCancel}
            className="h-11 px-8 text-base font-medium border-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            className="h-11 px-8 text-base font-semibold text-white bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 shadow-lg hover:shadow-xl transition-all"
          >
            Update Link
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
