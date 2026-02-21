"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const defaultProfileData = {
  name: "Jordan Smith",
  username: "jordansmith",
  bio: "Digital creator & designer ✨ Building beautiful products and sharing the journey.",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jordan",
  links: [
    { id: "1", title: "🎨 My Portfolio", url: "https://portfolio.example.com" },
    { id: "2", title: "🐦 Twitter / X", url: "https://twitter.com/username" },
    { id: "3", title: "📧 Weekly Newsletter", url: "https://newsletter.example.com" },
    { id: "4", title: "📺 YouTube Channel", url: "https://youtube.com/@username" },
    { id: "5", title: "🛍️ Shop My Products", url: "https://shop.example.com" },
  ],
};

interface PublicProfileProps {
  username?: string;
  embedded?: boolean;
}

export function PublicProfile({ username, embedded = false }: PublicProfileProps) {
  const displayUsername = username ?? defaultProfileData.username;
  const backgroundWrapperClasses = cn(
    "pointer-events-none opacity-30",
    embedded ? "absolute inset-0" : "fixed inset-0",
  );
  const shellClasses = cn(
    "gradient-surface relative",
    embedded ? "rounded-[32px] border border-border shadow-2xl overflow-hidden" : "min-h-screen",
  );
  const contentClasses = cn(
    "relative z-10 mx-auto px-4",
    embedded ? "py-8 max-w-xl" : "py-12 max-w-lg",
  );

  return (
    <div className={shellClasses}>
      <div className={backgroundWrapperClasses}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 80%, hsl(var(--primary) / 0.15) 0%, transparent 50%)," +
              "radial-gradient(circle at 80% 20%, hsl(var(--accent) / 0.15) 0%, transparent 50%)",
          }}
        />
      </div>

      <div className={contentClasses}>
        {!embedded && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end mb-6">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Share2 className="w-5 h-5" />
            </Button>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-8"
        >
          <Avatar className="w-28 h-28 mx-auto mb-4 ring-4 ring-background shadow-xl">
            <AvatarImage src={defaultProfileData.avatar} />
            <AvatarFallback className="text-2xl">{defaultProfileData.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-bold text-foreground">{defaultProfileData.name}</h1>
          <p className="text-muted-foreground">@{displayUsername}</p>
          <p className="text-sm text-muted-foreground mt-3 max-w-xs mx-auto">{defaultProfileData.bio}</p>
        </motion.div>

        <div className="space-y-3">
          {defaultProfileData.links.map((link, index) => (
            <motion.a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group block"
            >
              <div className="relative p-4 rounded-xl bg-card border border-border shadow-md hover:shadow-lg transition-all duration-300 hover:border-primary/30">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground group-hover:text-primary transition-colors">{link.title}</span>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.05) 0%, transparent 100%)" }}
                />
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-12 text-center">
          <Link href="/auth" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <div className="w-5 h-5 rounded gradient-primary flex items-center justify-center">
              <span className="text-[10px] text-primary-foreground font-bold">L</span>
            </div>
            <span>Create your LinkHub</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
