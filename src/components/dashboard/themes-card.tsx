import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

const themes = [
  {
    id: "theme1",
    name: "Gradient Pop",
    design: "gradientpop",
    colors: {
      background: "#667eea",
      text: "#ffffff",
      accent: "#f093fb",
      cardBg: "rgba(255, 255, 255, 0.95)"
    },
    gradient: "from-purple-600 via-pink-500 to-red-500"
  },
  {
    id: "theme2",
    name: "Dark Elegance",
    design: "darkelegance",
    colors: {
      background: "#0f0f0f",
      text: "#e5d4b5",
      accent: "#d4af37",
      cardBg: "#1a1a1a"
    },
    gradient: "from-zinc-950 to-neutral-900"
  },
  {
    id: "theme3",
    name: "Wedding Timeline",
    design: "wedding",
    colors: {
      background: "#f5f5f4",
      text: "#1c1917",
      accent: "#a16207",
      cardBg: "#ffffff"
    },
    gradient: "from-stone-100 to-amber-50"
  },
  {
    id: "theme4",
    name: "Music Artist",
    design: "musicartist",
    colors: {
      background: "#dc2626",
      text: "#ffffff",
      accent: "#fbbf24",
      cardBg: "#b91c1c"
    },
    gradient: "from-red-600 to-red-800"
  },
  {
    id: "theme5",
    name: "Photo Studio",
    design: "photostudio",
    colors: {
      background: "#000000",
      text: "#ffffff",
      accent: "#fbbf24",
      cardBg: "#1a1a1a"
    },
    gradient: "from-black to-gray-900"
  },
  {
    id: "theme6",
    name: "Beauty Creator",
    design: "beautycreator",
    colors: {
      background: "#d4f1f4",
      text: "#1e3a5f",
      accent: "#6366f1",
      cardBg: "#ffffff"
    },
    gradient: "from-cyan-100 via-blue-100 to-purple-100"
  },
  {
    id: "theme7",
    name: "Food Blogger",
    design: "foodblogger",
    colors: {
      background: "#0891b2",
      text: "#ffffff",
      accent: "#fbbf24",
      cardBg: "rgba(255, 255, 255, 0.95)"
    },
    gradient: "from-cyan-600 to-blue-700"
  },
  {
    id: "theme8",
    name: "Interior Design",
    design: "interiordesign",
    colors: {
      background: "#fef3c7",
      text: "#92400e",
      accent: "#f59e0b",
      cardBg: "#ffffff"
    },
    gradient: "from-amber-100 via-yellow-50 to-orange-100"
  },
  {
    id: "theme9",
    name: "Tech Startup",
    design: "techstartup",
    colors: {
      background: "#1e1b4b",
      text: "#ffffff",
      accent: "#a78bfa",
      cardBg: "rgba(139, 92, 246, 0.1)"
    },
    gradient: "from-indigo-950 via-purple-900 to-fuchsia-950"
  },
  {
    id: "theme10",
    name: "Fashion Model",
    design: "fashionmodel",
    colors: {
      background: "#ec4899",
      text: "#ffffff",
      accent: "#fbbf24",
      cardBg: "rgba(255, 255, 255, 0.1)"
    },
    gradient: "from-pink-500 via-rose-500 to-pink-600"
  },
  {
    id: "theme11",
    name: "Fitness Coach",
    design: "fitnesscoach",
    colors: {
      background: "#f97316",
      text: "#ffffff",
      accent: "#fbbf24",
      cardBg: "rgba(255, 255, 255, 0.15)"
    },
    gradient: "from-orange-500 via-red-500 to-orange-600"
  },
  {
    id: "theme12",
    name: "Nature Blog",
    design: "natureblog",
    colors: {
      background: "#065f46",
      text: "#d1fae5",
      accent: "#34d399",
      cardBg: "#064e3b"
    },
    gradient: "from-emerald-900 via-green-800 to-teal-900"
  },
  {
    id: "theme13",
    name: "Minimalist Pro",
    design: "minimalistpro",
    colors: {
      background: "#ffffff",
      text: "#0f172a",
      accent: "#3b82f6",
      cardBg: "#f8fafc"
    },
    gradient: "from-white via-slate-50 to-gray-50"
  },
  {
    id: "theme14",
    name: "Neon Cyber",
    design: "neoncyber",
    colors: {
      background: "#0c0a1f",
      text: "#00ffff",
      accent: "#ff00ff",
      cardBg: "rgba(0, 255, 255, 0.1)"
    },
    gradient: "from-slate-950 via-purple-950 to-black"
  },
  {
    id: "theme15",
    name: "Category Grid",
    design: "categorygrid",
    colors: {
      background: "#ec4899",
      text: "#ffffff",
      accent: "#ffffff",
      cardBg: "rgba(255, 255, 255, 0.15)"
    },
    gradient: "from-pink-500 to-pink-600"
  }
];

export interface ThemesCardProps {
  selectedTheme?: string;
  onThemeChange?: (themeId: string) => void;
  openPreviewSidebar?: () => void;
}

const ThemesCard: React.FC<ThemesCardProps> = ({ 
  selectedTheme = "theme1", 
  onThemeChange,
  openPreviewSidebar 
}) => {
  const [selected, setSelected] = useState<string>(selectedTheme);

  // Update selected when prop changes
  useEffect(() => {
    setSelected(selectedTheme);
  }, [selectedTheme]);

  const handleThemeSelect = (themeId: string) => {
    setSelected(themeId);
    if (onThemeChange) {
      onThemeChange(themeId);
    }
    if (openPreviewSidebar) {
      openPreviewSidebar();
    }
  };

  const renderThemeDesign = (theme: typeof themes[0]) => {
    const { design, colors } = theme;

    switch (design) {
      case "gradientpop":
        // Modern gradient with floating card alert
        return (
          <div className="h-full w-full relative" style={{ background: `linear-gradient(135deg, ${colors.background} 0%, ${colors.accent} 100%)` }}>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
              <div className="w-12 h-12 rounded-full mb-2" style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', border: '2px solid rgba(255,255,255,0.5)' }}/>
              <div className="w-16 h-2.5 rounded mb-1 bg-white opacity-90"/>
              <div className="w-20 h-1.5 rounded mb-3 bg-white opacity-70"/>
              <div className="w-full max-w-[85%] h-8 rounded-xl mb-2 bg-white opacity-20 border border-white/40"/>
              <div className="w-full max-w-[85%] h-9 rounded-xl mb-1.5 bg-white opacity-95"/>
              <div className="w-full max-w-[85%] h-9 rounded-xl mb-3 bg-white opacity-95"/>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-3 h-3 rounded-full bg-white opacity-80"/>
                ))}
              </div>
            </div>
          </div>
        );

      case "darkelegance":
        // Luxury dark with gold accent signature
        return (
          <div className="h-full flex flex-col items-center justify-center p-3" style={{ backgroundColor: colors.background }}>
            <div className="w-10 h-0.5 mb-4" style={{ backgroundColor: colors.accent }}/>
            <div className="w-18 h-18 rounded-full mb-3 border-2 relative" style={{ borderColor: colors.accent }}>
              <div className="absolute inset-2 rounded-full" style={{ backgroundColor: colors.accent, opacity: 0.3 }}/>
            </div>
            <div className="w-28 h-3 rounded mb-1 italic" style={{ backgroundColor: colors.text }}/>
            <div className="w-20 h-1.5 rounded mb-5" style={{ backgroundColor: colors.text, opacity: 0.6 }}/>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-full h-6 rounded-lg mb-2 border flex items-center justify-center" style={{ borderColor: colors.accent, backgroundColor: 'transparent' }}>
                <div className="w-16 h-1.5 rounded" style={{ backgroundColor: colors.text, opacity: 0.7 }}/>
              </div>
            ))}
            <div className="w-full h-px my-3" style={{ backgroundColor: colors.accent, opacity: 0.3 }}/>
            <div className="w-20 h-1.5 rounded mb-2" style={{ backgroundColor: colors.text, opacity: 0.5 }}/>
            <div className="flex justify-center gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-3 h-3 rounded-sm" style={{ backgroundColor: colors.accent, opacity: 0.6 }}/>
              ))}
            </div>
          </div>
        );

      case "wedding":
        // Wedding/Event timeline with elegant layout
        return (
          <div className="h-full w-full flex flex-col p-2" style={{ backgroundColor: colors.background }}>
            <div className="h-20 rounded-xl mb-2 relative" style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.accent}20` }}>
              <div className="absolute bottom-2 left-2 w-12 h-12 rounded-lg" style={{ backgroundColor: colors.accent, opacity: 0.2 }}/>
            </div>
            <div className="bg-white rounded-xl p-2 flex-1">
              <div className="w-16 h-2 rounded mb-2" style={{ backgroundColor: colors.accent }}/>
              <div className="space-y-1.5">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-1.5 items-center">
                    <div className="w-10 h-1.5 rounded" style={{ backgroundColor: colors.accent, opacity: 0.6 }}/>
                    <div className="flex-1">
                      <div className="w-full h-1.5 rounded mb-0.5" style={{ backgroundColor: colors.text, opacity: 0.7 }}/>
                      <div className="w-3/4 h-1 rounded" style={{ backgroundColor: colors.text, opacity: 0.4 }}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "musicartist":
        // Music artist / DJ style with bold visuals
        return (
          <div className="h-full w-full relative" style={{ background: `linear-gradient(180deg, ${colors.background} 0%, #000 100%)` }}>
            <div className="absolute inset-0 flex flex-col items-center p-2 pt-4">
              <div className="w-20 h-16 rounded-xl mb-3" style={{ backgroundColor: colors.accent, opacity: 0.3 }}/>
              <div className="w-24 h-4 rounded mb-1 bg-white"/>
              <div className="w-16 h-2 rounded mb-3 bg-white opacity-80"/>
              <div className="flex gap-2 mb-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-5 h-5 rounded-full bg-white opacity-90"/>
                ))}
              </div>
              <div className="w-[90%] space-y-1.5">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-2 p-1.5 rounded-lg" style={{ backgroundColor: colors.cardBg }}>
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: colors.accent, opacity: 0.5 }}/>
                    <div className="flex-1 h-1.5 rounded bg-white opacity-80"/>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "photostudio":
        // Photography portfolio - Black with white card and large typography (JAO BELLME style)
        return (
          <div className="h-full w-full flex items-center justify-center" style={{ backgroundColor: '#000' }}>
            <div className="bg-white rounded-3xl p-4 w-[85%] h-[92%] flex flex-col">
              <div className="text-center mb-2">
                <div className="text-xs font-light opacity-50 mb-1">PHOTOGRAPHER</div>
                <div className="text-2xl font-bold mb-0.5">JAO</div>
                <div className="text-2xl font-bold">BELLME</div>
              </div>
              <div className="w-20 h-20 rounded-full mx-auto mb-2 bg-gray-300"/>
              <div className="flex justify-center gap-2 mb-3">
                {['#1877f2', '#000', '#000', '#e4405f', '#ff0000', '#0077b5'].map((color, i) => (
                  <div key={i} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}/>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2 flex-1">
                <div className="rounded-xl" style={{ backgroundColor: '#fbbf24' }}/>
                <div className="rounded-xl" style={{ backgroundColor: '#dc2626' }}/>
                <div className="rounded-xl" style={{ backgroundColor: '#0ea5e9' }}/>
                <div className="rounded-xl" style={{ backgroundColor: '#10b981' }}/>
              </div>
            </div>
          </div>
        );

      case "beautycreator":
        // Beauty content creator - Numbered list with video preview (Rue Lagom style)
        return (
          <div className="h-full w-full p-2" style={{ backgroundColor: '#bfdbfe' }}>
            <div className="h-full rounded-3xl p-3 flex flex-col" style={{ backgroundColor: '#4c1d95' }}>
              <div className="rounded-2xl p-3 mb-3" style={{ backgroundColor: '#a78bfa' }}>
                <div className="text-center mb-2">
                  <div className="text-sm font-bold text-white">Rue Lagom</div>
                </div>
                <div className="flex justify-center gap-2">
                  {['#e4405f', '#000', '#ff0000'].map((color, i) => (
                    <div key={i} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}/>
                  ))}
                </div>
              </div>
              <div className="space-y-2 mb-3 px-2">
                {['AMAZON STOREFRONT', 'CURRENT MAKEUP MUST HAVES', 'THE BEST NO-MAKEUP MAKEUP'].map((text, i) => (
                  <div key={i} className="flex items-start gap-2 text-white">
                    <span className="text-xs font-bold opacity-60">0{i + 1}</span>
                    <div className="flex-1">
                      <div className="text-xs font-medium opacity-90">{text.substring(0, 20)}...</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex-1 rounded-xl relative overflow-hidden" style={{ backgroundColor: '#1e293b' }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center">
                    <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1"/>
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 right-2">
                  <div className="text-xs text-white opacity-70 mb-1">GRWM for NY Fashion Week!</div>
                  <div className="h-1 rounded-full bg-white opacity-30"/>
                </div>
              </div>
            </div>
          </div>
        );

      case "foodblogger":
        // Food content creator - Large hero image with rounded card (Juno Morgan style)
        return (
          <div className="h-full w-full flex items-center justify-center" style={{ backgroundColor: '#0e7490' }}>
            <div className="bg-white rounded-3xl w-[80%] h-[92%] overflow-hidden flex flex-col">
              <div className="flex-1 relative" style={{ backgroundColor: '#bae6fd' }}>
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full" style={{ backgroundColor: '#fb923c' }}/>
                <div className="absolute top-8 right-6 w-10 h-10 rounded-full" style={{ backgroundColor: '#fdba74' }}/>
                <div className="absolute top-14 right-10 w-8 h-8 rounded-full" style={{ backgroundColor: '#fed7aa' }}/>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-24 h-24 rounded-3xl border-4 border-white shadow-lg" style={{ backgroundColor: '#fb923c' }}/>
              </div>
              <div className="p-4 pt-14 text-center">
                <div className="text-base font-bold mb-0.5">Juno</div>
                <div className="text-base font-bold mb-2">Morgan</div>
                <div className="text-xs opacity-60 mb-3">ON A JOURNEY TO SAVOR EVERY FLAVOR</div>
                <div className="flex justify-center gap-2 mb-3">
                  {['#e4405f', '#000', '#ff0000', '#00acee'].map((color, i) => (
                    <div key={i} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}/>
                  ))}
                </div>
                <div className="h-12 rounded-2xl" style={{ backgroundColor: '#fed7aa' }}/>
              </div>
            </div>
          </div>
        );

      case "interiordesign":
        // Interior designer - Bold oversized typography overlay (SOLEIL M style)
        return (
          <div className="h-full w-full relative overflow-hidden" style={{ backgroundColor: '#ffc0cb' }}>
            <div className="absolute inset-0 p-3 flex flex-col justify-start">
              <div className="space-y-1 opacity-20">
                <div className="text-2xl font-bold" style={{ color: colors.text }}>SOLEIL M</div>
                <div className="text-2xl font-bold" style={{ color: colors.text }}>LEILMERA</div>
                <div className="text-2xl font-bold" style={{ color: colors.text }}>SI M</div>
                <div className="text-2xl font-bold" style={{ color: colors.text }}>EILMER</div>
                <div className="text-2xl font-bold" style={{ color: colors.text }}>LMERAK</div>
                <div className="text-2xl font-bold" style={{ color: colors.text }}>SOLEIL M</div>
              </div>
            </div>
            <div className="relative h-full flex flex-col items-center justify-center">
              <div className="w-28 h-32 rounded-3xl shadow-2xl overflow-hidden">
                <div className="h-full" style={{ backgroundColor: '#60a5fa' }}/>
              </div>
              <div className="mt-3 text-xs opacity-60">Interior Designer On Site &</div>
              <div className="flex gap-2 mt-2">
                {['#e4405f', '#000', '#ff0000'].map((color, i) => (
                  <div key={i} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}/>
                ))}
              </div>
            </div>
          </div>
        );

      case "techstartup":
        // Tech/SaaS startup style
        return (
          <div className="h-full relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${colors.background}, #0c0a1f)` }}>
            <div className="relative h-full flex flex-col p-3">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl" style={{ backgroundColor: colors.accent, opacity: 0.3 }}/>
                <div>
                  <div className="w-16 h-2 rounded mb-1" style={{ backgroundColor: colors.text }}/>
                  <div className="w-12 h-1 rounded" style={{ backgroundColor: colors.text, opacity: 0.6 }}/>
                </div>
              </div>
              <div className="flex justify-center gap-2 mb-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-5 h-5 rounded-lg" style={{ backgroundColor: colors.cardBg }}/>
                ))}
              </div>
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="rounded-xl p-2 border" style={{ backgroundColor: colors.cardBg, borderColor: colors.accent + '30' }}>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: colors.accent, opacity: 0.5 }}/>
                      <div className="flex-1 h-1.5 rounded" style={{ backgroundColor: colors.text, opacity: 0.7 }}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "fashionmodel":
        // Fashion model / influencer
        return (
          <div className="h-full relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${colors.background}, #db2777)` }}>
            <div className="absolute top-0 left-0 right-0 h-24 opacity-20" style={{ backgroundColor: colors.text }}/>
            <div className="relative h-full flex flex-col items-center justify-center p-3">
              <div className="w-20 h-20 rounded-full mb-3 border-4 border-white shadow-xl" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}/>
              <div className="w-28 h-4 rounded mb-2 font-bold" style={{ backgroundColor: colors.text }}/>
              <div className="w-20 h-2 rounded mb-4" style={{ backgroundColor: colors.text, opacity: 0.8 }}/>
              <div className="flex gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-5 h-5 rounded-full" style={{ backgroundColor: colors.text, opacity: 0.9 }}/>
                ))}
              </div>
              <div className="w-full space-y-2">
                {[1, 2].map((i) => (
                  <div key={i} className="w-full h-12 rounded-2xl" style={{ backgroundColor: colors.cardBg }}>
                    <div className="w-20 h-3 rounded mx-auto mt-4" style={{ backgroundColor: colors.background, opacity: 0.8 }}/>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "fitnesscoach":
        // Fitness coach / trainer
        return (
          <div className="h-full relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${colors.background}, #dc2626)` }}>
            <div className="relative h-full flex flex-col p-3">
              <div className="text-center mb-4">
                <div className="w-16 h-16 rounded-full mx-auto mb-2 border-4 border-white" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}/>
                <div className="w-20 h-3 rounded mx-auto mb-1" style={{ backgroundColor: colors.text }}/>
                <div className="w-24 h-2 rounded mx-auto" style={{ backgroundColor: colors.text, opacity: 0.8 }}/>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {['12K', '89', '5+'].map((stat, i) => (
                  <div key={i} className="rounded-lg p-2 text-center" style={{ backgroundColor: colors.cardBg }}>
                    <div className="w-8 h-2 rounded mx-auto mb-1" style={{ backgroundColor: colors.text }}/>
                    <div className="w-6 h-1 rounded mx-auto" style={{ backgroundColor: colors.text, opacity: 0.6 }}/>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                {[1, 2].map((i) => (
                  <div key={i} className="rounded-xl p-2" style={{ backgroundColor: colors.cardBg }}>
                    <div className="w-20 h-2 rounded mb-1" style={{ backgroundColor: colors.text }}/>
                    <div className="w-full h-1 rounded" style={{ backgroundColor: colors.text, opacity: 0.6 }}/>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "natureblog":
        // Nature / eco blog
        return (
          <div className="h-full flex flex-col p-2" style={{ background: `linear-gradient(135deg, ${colors.background}, #064e3b)` }}>
            <div className="flex items-center gap-2 mb-3 p-2">
              <div className="w-12 h-12 rounded-full border-2" style={{ borderColor: colors.accent, backgroundColor: colors.cardBg }}/>
              <div>
                <div className="w-16 h-2 rounded mb-1" style={{ backgroundColor: colors.text }}/>
                <div className="w-12 h-1 rounded" style={{ backgroundColor: colors.text, opacity: 0.7 }}/>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 flex-1">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="rounded-xl overflow-hidden">
                  <div className="h-full" style={{ backgroundColor: colors.accent, opacity: 0.2 + (i * 0.05) }}/>
                </div>
              ))}
            </div>
            <div className="mt-2 text-center">
              <div className="w-20 h-1.5 rounded mx-auto" style={{ backgroundColor: colors.text, opacity: 0.5 }}/>
            </div>
          </div>
        );

      case "minimalistpro":
        // Ultra minimal professional
        return (
          <div className="h-full flex flex-col items-center justify-center p-4" style={{ backgroundColor: colors.background }}>
            <div className="w-14 h-14 rounded-full mb-4 border-2" style={{ borderColor: colors.accent }}/>
            <div className="w-20 h-2.5 rounded mb-1" style={{ backgroundColor: colors.text }}/>
            <div className="w-16 h-1.5 rounded mb-6" style={{ backgroundColor: colors.text, opacity: 0.5 }}/>
            <div className="w-full h-px mb-5" style={{ backgroundColor: colors.text, opacity: 0.15 }}/>
            <div className="w-full space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-full h-10 rounded-lg border flex items-center justify-center" style={{ borderColor: colors.text + '20' }}>
                  <div className="w-16 h-1.5 rounded" style={{ backgroundColor: colors.text, opacity: 0.7 }}/>
                </div>
              ))}
            </div>
          </div>
        );

      case "neoncyber":
        // Neon cyberpunk style
        return (
          <div className="h-full relative overflow-hidden" style={{ backgroundColor: colors.background }}>
            <div className="absolute inset-0">
              <div className="absolute top-4 left-4 w-16 h-16 rounded-full blur-2xl opacity-50" style={{ backgroundColor: colors.text }}/>
              <div className="absolute bottom-4 right-4 w-20 h-20 rounded-full blur-2xl opacity-50" style={{ backgroundColor: colors.accent }}/>
            </div>
            <div className="relative h-full flex flex-col items-center justify-center p-3">
              <div className="w-16 h-16 rounded-xl mb-3 border-2 relative" style={{ borderColor: colors.text, boxShadow: `0 0 20px ${colors.text}` }}>
                <div className="absolute inset-2 rounded-lg" style={{ backgroundColor: colors.text, opacity: 0.2 }}/>
              </div>
              <div className="w-24 h-3 rounded mb-2" style={{ backgroundColor: colors.text, boxShadow: `0 0 10px ${colors.text}` }}/>
              <div className="w-20 h-2 rounded mb-4" style={{ backgroundColor: colors.accent, opacity: 0.8 }}/>
              <div className="w-full space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-full h-9 rounded-lg border-2" style={{ borderColor: colors.text, backgroundColor: colors.cardBg, boxShadow: `0 0 10px ${colors.text}40` }}>
                    <div className="w-16 h-2 rounded mx-auto mt-3" style={{ backgroundColor: colors.text, opacity: 0.9 }}/>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "categorygrid":
        // Multi-category grid
        return (
          <div className="h-full p-2 overflow-hidden">
            <div className="grid grid-cols-2 gap-2 h-full">
              {['#ec407a', '#0288d1', '#f57c00', '#ff5722'].map((col, index) => (
                <div key={index} className="rounded-xl overflow-hidden" style={{ backgroundColor: col }}>
                  <div className="h-14 relative" style={{ backgroundColor: 'rgba(0,0,0,0.15)' }}>
                    <div className="absolute top-2 left-2 w-8 h-8 rounded-full border-2 border-white"/>
                  </div>
                  <div className="p-2">
                    <div className="w-14 h-2 rounded mb-1 bg-white"/>
                    <div className="w-10 h-1 rounded bg-white opacity-70 mb-2"/>
                    <div className="flex gap-1 mb-2">
                      {[1,2,3,4].map(i => (
                        <div key={i} className="w-2 h-2 rounded-sm bg-white opacity-80"/>
                      ))}
                    </div>
                    <div className="w-12 h-1 rounded bg-white opacity-70 mb-1"/>
                    <div className="space-y-1">
                      {[1,2].map(i => (
                        <div key={i} className="w-full h-3 rounded bg-white opacity-20"/>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="border border-[#e0f2fe] max-w-2xl mx-auto mt-8 overflow-hidden">
      <CardHeader className="relative">
        <CardTitle className="text-lg font-bold text-gray-900 mb-1">
          Themes
        </CardTitle>
        <p className="text-gray-600 mb-4">Choose a theme for your page</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
          {themes.map((theme) => (
            <div
              key={theme.id}
              onClick={() => handleThemeSelect(theme.id)}
              className={`group relative cursor-pointer rounded-2xl transition-all duration-300 transform ${
                selected === theme.id 
                  ? 'scale-105 -translate-y-2' 
                  : 'hover:scale-102 hover:-translate-y-1'
              }`}
            >
              {/* Glow effect for selected theme */}
              {selected === theme.id && (
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300 animate-pulse"></div>
              )}
              
              <div
                className={`relative rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                  selected === theme.id 
                    ? 'border-blue-600 shadow-2xl' 
                    : 'border-gray-200 hover:border-gray-400 shadow-lg'
                }`}
              >
                {/* Theme Preview */}
                <div 
                  className="aspect-[3/4] relative overflow-hidden"
                  style={{ backgroundColor: theme.colors.background }}
                >
                  {/* Mock phone screen content with unique design */}
                  <div className="w-full h-full relative">
                    {renderThemeDesign(theme)}
                  </div>
                  
                  {/* Selected checkmark with animation */}
                  {selected === theme.id && (
                    <div className="absolute top-2 left-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-1.5 shadow-lg animate-bounce">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
                
                {/* Theme Name with gradient on hover */}
                <div className={`p-4 text-center transition-all duration-300 ${
                  selected === theme.id 
                    ? 'bg-gradient-to-r from-blue-50 to-purple-50' 
                    : 'bg-white group-hover:bg-gray-50'
                }`}>
                  <p className={`text-base font-semibold transition-all duration-300 ${
                    selected === theme.id 
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600' 
                      : 'text-gray-900'
                  }`}>
                    {theme.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ThemesCard;
