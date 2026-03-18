"use client";

import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  gradient?: boolean;
}

export function StatsCard({ title, value, change, changeType = 'neutral', icon: Icon, gradient }: StatsCardProps) {
  return (
    <div
      className={cn(
        "p-6 rounded-xl border transition-all duration-300 hover:shadow-lg",
        gradient
          ? "gradient-primary text-primary-foreground border-transparent shadow-glow"
          : "bg-card border-border"
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className={cn(
            "text-sm font-medium",
            gradient ? "text-primary-foreground/80" : "text-muted-foreground"
          )}>
            {title}
          </p>
          <p className={cn(
            "text-3xl font-bold mt-2",
            gradient ? "text-primary-foreground" : "text-foreground"
          )}>
            {value}
          </p>
          {change && (
            <p className={cn(
              "text-sm mt-2 font-medium",
              gradient ? "text-primary-foreground/80" : {
                'text-success': changeType === 'positive',
                'text-destructive': changeType === 'negative',
                'text-muted-foreground': changeType === 'neutral',
              }
            )}>
              {change}
            </p>
          )}
        </div>
        <div className={cn(
          "p-3 rounded-lg",
          gradient ? "bg-primary-foreground/20" : "bg-secondary"
        )}>
          <Icon className={cn(
            "w-5 h-5",
            gradient ? "text-primary-foreground" : "text-primary"
          )} />
        </div>
      </div>
    </div>
  );
}
