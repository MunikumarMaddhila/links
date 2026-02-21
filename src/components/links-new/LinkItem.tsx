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
  scheduled?: boolean;
}

interface LinkItemProps {
  link: LinkItemData;
  onToggle: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const isImageSource = (icon?: string) => {
  if (!icon) return false;
  return icon.startsWith('http://') || icon.startsWith('https://') || icon.startsWith('/') || icon.startsWith('data:');
};

export function LinkItem({ link, onToggle, onEdit, onDelete }: LinkItemProps) {
  const controls = useDragControls();

  return (
    <Reorder.Item
      value={link}
      id={link.id}
      dragListener={false}
      dragControls={controls}
      className="mb-3"
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      >
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
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
              {link.icon ? (
                isImageSource(link.icon) ? (
                  <span
                    role="img"
                    aria-label={`${link.title} icon`}
                    className="inline-block h-6 w-6 rounded-md bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${link.icon})` }}
                  />
                ) : (
                  <span className="text-lg" aria-hidden="true">
                    {link.icon}
                  </span>
                )
              ) : (
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
              )}
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
      </motion.div>
    </Reorder.Item>
  );
}
