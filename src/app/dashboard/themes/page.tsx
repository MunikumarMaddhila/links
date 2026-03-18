"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Palette, Type, MousePointer2, LayoutGrid, Smartphone, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme, type FontStyle, type ButtonStyle, type FontSize, type ButtonAnimation } from "@/contexts/ThemeContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  StandardLayout,
  OceanDreamerLayout,
  VinylNightsLayout,
  BeachLifestyleLayout,
  SurfRiderLayout,
  CountrySoulLayout,
  CyberNeonLayout,
  GlassAuroraLayout,
  StoryHighlightsLayout,
  BentoCreativeLayout,
  PhotoBackdropLayout,
  EditorialChicLayout,
  LifestyleCreatorLayout,
  TravelArchLayout,
  NaturePhotographerLayout,
  WellnessCoachLayout,
  LuxuryBusinessLayout,
  GradientWaveLayout,
  NeonGridLayout,
  MinimalCardLayout,
  PolaroidLayout,
  RetroSynthwaveLayout,
  BotanicalLayout,
  IsometricLayout,
  defaultProfileData,
} from "@/components/themes/layouts";
import { LayoutRenderer } from "@/components/themes/LayoutRenderer";

// Layout theme definitions
export const layoutThemes = [
  { id: "ocean-dreamer", name: "Ocean Dreamer", description: "Stunning blue gradient", category: "Influencer", component: OceanDreamerLayout },
  { id: "vinyl-nights", name: "Vinyl Nights", description: "Dark aesthetic", category: "Music", component: VinylNightsLayout },
  { id: "beach-lifestyle", name: "Beach Lifestyle", description: "Tropical teal", category: "Lifestyle", component: BeachLifestyleLayout },
  { id: "surf-rider", name: "Surf Rider", description: "Ocean waves", category: "Sports", component: SurfRiderLayout },
  { id: "country-soul", name: "Country Soul", description: "Warm rustic", category: "Lifestyle", component: CountrySoulLayout },
  { id: "lifestyle-creator", name: "Lifestyle Creator", description: "Soft pink", category: "Influencer", component: LifestyleCreatorLayout },
  { id: "cyber-neon", name: "Cyber Neon", description: "Futuristic glow", category: "Tech", component: CyberNeonLayout },
  { id: "editorial-chic", name: "Editorial Chic", description: "Magazine style", category: "Professional", component: EditorialChicLayout },
  { id: "glass-aurora", name: "Glass Aurora", description: "Frosted glass", category: "Creative", component: GlassAuroraLayout },
  { id: "story-highlights", name: "Story Highlights", description: "Story circles", category: "Social", component: StoryHighlightsLayout },
  { id: "bento-creative", name: "Bento Creative", description: "Grid layout", category: "Creative", component: BentoCreativeLayout },
  { id: "photo-backdrop", name: "Photo Backdrop", description: "Full image", category: "Photography", component: PhotoBackdropLayout },
  { id: "standard", name: "Standard", description: "Clean minimal", category: "Professional", component: StandardLayout },
  { id: "travel-arch", name: "Travel Arch", description: "Adventure", category: "Travel", component: TravelArchLayout },
  { id: "nature-photographer", name: "Nature Photographer", description: "Earthy greens", category: "Photography", component: NaturePhotographerLayout },
  { id: "wellness-coach", name: "Wellness Coach", description: "Calm serene", category: "Wellness", component: WellnessCoachLayout },
  { id: "luxury-business", name: "Luxury Business", description: "Premium dark", category: "Business", component: LuxuryBusinessLayout },
  { id: "gradient-wave", name: "Gradient Wave", description: "Flowing colors", category: "Creative", component: GradientWaveLayout },
  { id: "neon-grid", name: "Neon Grid", description: "Cyberpunk", category: "Tech", component: NeonGridLayout },
  { id: "minimal-card", name: "Minimal Card", description: "Card design", category: "Professional", component: MinimalCardLayout },
  { id: "polaroid", name: "Polaroid", description: "Vintage photo", category: "Photography", component: PolaroidLayout },
  { id: "retro-synthwave", name: "Retro Synthwave", description: "80s neon", category: "Music", component: RetroSynthwaveLayout },
  { id: "botanical", name: "Botanical", description: "Nature greens", category: "Wellness", component: BotanicalLayout },
  { id: "isometric", name: "Isometric", description: "3D geometric", category: "Creative", component: IsometricLayout },
];

// Preset color palettes
const colorPresets = [
  { id: "ocean", name: "Ocean", bg: "#667eea", gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", text: "#ffffff", accent: "#667eea" },
  { id: "sunset", name: "Sunset", bg: "#f5576c", gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", text: "#ffffff", accent: "#f5576c" },
  { id: "forest", name: "Forest", bg: "#56ab2f", gradient: "linear-gradient(135deg, #56ab2f 0%, #a8e063 100%)", text: "#ffffff", accent: "#56ab2f" },
  { id: "midnight", name: "Midnight", bg: "#1a1a2e", gradient: "linear-gradient(135deg, #2c3e50 0%, #1a1a2e 100%)", text: "#ffffff", accent: "#3498db" },
  { id: "candy", name: "Candy", bg: "#d946ef", gradient: "linear-gradient(135deg, #d946ef 0%, #a855f7 100%)", text: "#ffffff", accent: "#d946ef" },
  { id: "mint", name: "Mint", bg: "#68d391", gradient: "linear-gradient(135deg, #a8edea 0%, #68d391 100%)", text: "#2d3748", accent: "#38a169" },
  { id: "rose", name: "Rose", bg: "#f472b6", gradient: "linear-gradient(135deg, #fda4af 0%, #f472b6 100%)", text: "#ffffff", accent: "#ec4899" },
  { id: "cyber", name: "Cyber", bg: "#00ff88", gradient: "linear-gradient(135deg, #141E30 0%, #243B55 100%)", text: "#00ff88", accent: "#00ff88" },
  { id: "warm", name: "Warm", bg: "#f59e0b", gradient: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)", text: "#ffffff", accent: "#f59e0b" },
  { id: "coral", name: "Coral", bg: "#fb7185", gradient: "linear-gradient(135deg, #fda4af 0%, #fb7185 100%)", text: "#ffffff", accent: "#f43f5e" },
  { id: "lavender", name: "Lavender", bg: "#a78bfa", gradient: "linear-gradient(135deg, #c4b5fd 0%, #a78bfa 100%)", text: "#ffffff", accent: "#8b5cf6" },
  { id: "teal", name: "Teal", bg: "#14b8a6", gradient: "linear-gradient(135deg, #5eead4 0%, #14b8a6 100%)", text: "#ffffff", accent: "#14b8a6" },
];

// Font options
const fontOptions: { id: FontStyle; name: string; preview: string; family: string }[] = [
  { id: "inter", name: "Inter", preview: "Modern & Clean", family: "Inter, sans-serif" },
  { id: "poppins", name: "Poppins", preview: "Friendly & Round", family: "Poppins, sans-serif" },
  { id: "playfair", name: "Playfair", preview: "Elegant & Serif", family: "Playfair Display, serif" },
  { id: "space-grotesk", name: "Space Grotesk", preview: "Tech & Bold", family: "Space Grotesk, sans-serif" },
  { id: "serif", name: "Georgia", preview: "Classic Serif", family: "Georgia, serif" },
  { id: "mono", name: "Monospace", preview: "Code Style", family: "JetBrains Mono, monospace" },
];

// Button style options with corresponding border radius
const buttonStyleOptions: { id: ButtonStyle; name: string; borderRadius: number }[] = [
  { id: "rounded", name: "Rounded", borderRadius: 12 },
  { id: "pill", name: "Pill", borderRadius: 9999 },
  { id: "sharp", name: "Sharp", borderRadius: 0 },
  { id: "outline", name: "Outline", borderRadius: 12 },
  { id: "icon-left", name: "Icon Circle", borderRadius: 9999 },
  { id: "icon-left-rounded", name: "Gradient Pill", borderRadius: 9999 },
  { id: "icon-circle", name: "Teal Gradient", borderRadius: 9999 },
  { id: "icon-float", name: "Purple Icon", borderRadius: 9999 },
];

// Button animation options
const buttonAnimations: { id: ButtonAnimation; name: string }[] = [
  { id: "none", name: "None" },
  { id: "hover-lift", name: "Hover Lift" },
  { id: "pulse", name: "Pulse" },
  { id: "glow", name: "Glow" },
];

// Mini preview for layouts
function ThemeMiniPreview({ theme }: { theme: typeof layoutThemes[0] }) {
  const LayoutComponent = theme.component;
  return (
    <div className="w-full h-full overflow-hidden pointer-events-none">
      <div style={{ transform: "scale(0.42)", transformOrigin: "top left", width: "238%", height: "238%" }}>
        <LayoutComponent profile={defaultProfileData} embedded={true} />
      </div>
    </div>
  );
}

function ThemesContent() {
  const { 
    layoutThemeId, 
    setLayoutThemeId,
    customColors,
    setCustomColors,
    useCustomColors,
    setUseCustomColors,
    customFonts,
    setCustomFonts,
    customButtons,
    setCustomButtons,
  } = useTheme();
  
  // Disable global page scrolling while on the Themes screen
  useEffect(() => {
    document.body.classList.add('no-scroll-themes');
    return () => document.body.classList.remove('no-scroll-themes');
  }, []);
  
  const [activeTab, setActiveTab] = useState("layouts");
  
  const selectedTheme = layoutThemes.find(t => t.id === layoutThemeId) || layoutThemes[0];

  const handleThemeSelect = (theme: typeof layoutThemes[0]) => {
    setLayoutThemeId(theme.id);
  };

  const handleColorPreset = (preset: typeof colorPresets[0]) => {
    setUseCustomColors(true); // Enable custom colors when user selects a preset
    setCustomColors({
      ...customColors,
      backgroundColor: preset.bg,
      backgroundGradient: preset.gradient,
      textColor: preset.text,
      accentColor: preset.accent,
      buttonText: preset.accent,
    });
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col lg:flex-row gap-6 h-full overflow-y-hidden">
        {/* Customization Panel - Left Side */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Themes
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Customize your page appearance</p>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="themes-tablist grid grid-cols-4 mb-4 p-1 rounded-xl">
              <TabsTrigger value="layouts" className="themes-tab flex items-center gap-1.5 text-xs sm:text-sm rounded-lg">
                <LayoutGrid className="w-4 h-4" />
                <span className="hidden sm:inline">Layouts</span>
              </TabsTrigger>
              <TabsTrigger value="colors" className="themes-tab flex items-center gap-1.5 text-xs sm:text-sm rounded-lg">
                <Palette className="w-4 h-4" />
                <span className="hidden sm:inline">Colors</span>
              </TabsTrigger>
              <TabsTrigger value="fonts" className="themes-tab flex items-center gap-1.5 text-xs sm:text-sm rounded-lg">
                <Type className="w-4 h-4" />
                <span className="hidden sm:inline">Fonts</span>
              </TabsTrigger>
              <TabsTrigger value="buttons" className="themes-tab flex items-center gap-1.5 text-xs sm:text-sm rounded-lg">
                <MousePointer2 className="w-4 h-4" />
                <span className="hidden sm:inline">Buttons</span>
              </TabsTrigger>
            </TabsList>

            {/* Layouts Tab */}
            <TabsContent value="layouts" className="mt-0">
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 max-h-[calc(100vh-220px)] overflow-y-auto w-full pb-4">
                {layoutThemes.map((theme, index) => {
                  const isSelected = layoutThemeId === theme.id;
                  return (
                    <motion.button
                      key={theme.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.02, duration: 0.3 }}
                      onClick={() => handleThemeSelect(theme)}
                      className={cn(
                        "group relative rounded-xl transition-all duration-300 overflow-hidden text-left",
                        "bg-white dark:bg-gray-900 shadow-sm hover:shadow-lg",
                        isSelected
                          ? "ring-2 ring-blue-500 ring-offset-1"
                          : "border border-gray-100 dark:border-gray-800 hover:border-gray-200"
                      )}
                    >
                      <div className="relative h-[180px] overflow-hidden rounded-t-xl">
                        <ThemeMiniPreview theme={theme} />
                        <AnimatePresence>
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                              className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg"
                            >
                              <Check className="w-4 h-4 text-white" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      <div className="p-2">
                        <h3 className="font-medium text-xs text-gray-900 dark:text-white truncate">
                          {theme.name}
                        </h3>
                        <p className="text-[10px] text-gray-500 truncate">{theme.description}</p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </TabsContent>

            {/* Colors Tab */}
            <TabsContent value="colors" className="mt-0">
              <div className="space-y-6 max-h-[calc(100vh-220px)] overflow-y-auto pr-1 pb-4">
                {/* Use Layout Colors Toggle */}
                <Card>
                  <CardContent className="py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">Use Layout Colors</p>
                        <p className="text-xs text-gray-500">When enabled, uses the selected layout&apos;s original colors</p>
                      </div>
                      <button
                        onClick={() => setUseCustomColors(!useCustomColors)}
                        className={cn(
                          "relative w-12 h-6 rounded-full transition-colors",
                          !useCustomColors ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-600"
                        )}
                      >
                        <span
                          className={cn(
                            "absolute top-1 w-4 h-4 bg-white rounded-full transition-transform shadow",
                            !useCustomColors ? "left-7" : "left-1"
                          )}
                        />
                      </button>
                    </div>
                  </CardContent>
                </Card>

                {/* Color Presets */}
                <Card className={cn(!useCustomColors && "opacity-50 pointer-events-none")}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Color Presets</CardTitle>
                    <CardDescription className="text-xs">Quick color schemes (selecting enables custom colors)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                      {colorPresets.map((preset) => (
                        <button
                          key={preset.id}
                          onClick={() => handleColorPreset(preset)}
                          className={cn(
                            "group relative aspect-square rounded-xl transition-all hover:scale-105",
                            useCustomColors && customColors.accentColor === preset.accent && "ring-2 ring-blue-500 ring-offset-2"
                          )}
                          style={{ background: preset.gradient }}
                        >
                          <span className="absolute inset-x-0 bottom-1 text-[9px] font-medium text-center text-white drop-shadow-md">
                            {preset.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Custom Colors */}
                <Card className={cn(!useCustomColors && "opacity-50 pointer-events-none")}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Custom Colors</CardTitle>
                    <CardDescription className="text-xs">Fine-tune your colors</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-xs">Background</Label>
                        <div className="flex gap-2">
                          <Input
                            type="color"
                            value={customColors.backgroundColor}
                            onChange={(e) => { setUseCustomColors(true); setCustomColors({ ...customColors, backgroundColor: e.target.value }); }}
                            className="w-12 h-9 p-1 cursor-pointer"
                          />
                          <Input
                            value={customColors.backgroundColor}
                            onChange={(e) => { setUseCustomColors(true); setCustomColors({ ...customColors, backgroundColor: e.target.value }); }}
                            className="flex-1 text-xs"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">Text Color</Label>
                        <div className="flex gap-2">
                          <Input
                            type="color"
                            value={customColors.textColor}
                            onChange={(e) => { setUseCustomColors(true); setCustomColors({ ...customColors, textColor: e.target.value }); }}
                            className="w-12 h-9 p-1 cursor-pointer"
                          />
                          <Input
                            value={customColors.textColor}
                            onChange={(e) => { setUseCustomColors(true); setCustomColors({ ...customColors, textColor: e.target.value }); }}
                            className="flex-1 text-xs"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">Button Background</Label>
                        <div className="flex gap-2">
                          <Input
                            type="color"
                            value={customColors.buttonBackground}
                            onChange={(e) => { setUseCustomColors(true); setCustomColors({ ...customColors, buttonBackground: e.target.value }); }}
                            className="w-12 h-9 p-1 cursor-pointer"
                          />
                          <Input
                            value={customColors.buttonBackground}
                            onChange={(e) => { setUseCustomColors(true); setCustomColors({ ...customColors, buttonBackground: e.target.value }); }}
                            className="flex-1 text-xs"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">Button Text</Label>
                        <div className="flex gap-2">
                          <Input
                            type="color"
                            value={customColors.buttonText}
                            onChange={(e) => { setUseCustomColors(true); setCustomColors({ ...customColors, buttonText: e.target.value }); }}
                            className="w-12 h-9 p-1 cursor-pointer"
                          />
                          <Input
                            value={customColors.buttonText}
                            onChange={(e) => { setUseCustomColors(true); setCustomColors({ ...customColors, buttonText: e.target.value }); }}
                            className="flex-1 text-xs"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">Accent Color</Label>
                        <div className="flex gap-2">
                          <Input
                            type="color"
                            value={customColors.accentColor}
                            onChange={(e) => { setUseCustomColors(true); setCustomColors({ ...customColors, accentColor: e.target.value }); }}
                            className="w-12 h-9 p-1 cursor-pointer"
                          />
                          <Input
                            value={customColors.accentColor}
                            onChange={(e) => { setUseCustomColors(true); setCustomColors({ ...customColors, accentColor: e.target.value }); }}
                            className="flex-1 text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Background Type */}
                <Card className={cn(!useCustomColors && "opacity-50 pointer-events-none")}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Background Type</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-3">
                      {["solid", "gradient", "image"].map((type) => (
                        <button
                          key={type}
                          onClick={() => { setUseCustomColors(true); setCustomColors({ ...customColors, backgroundType: type as any }); }}
                          className={cn(
                            "p-4 rounded-xl border-2 transition-all text-center capitalize text-sm font-medium",
                            customColors.backgroundType === type
                              ? "border-blue-500 bg-blue-50 dark:bg-blue-950 text-blue-600"
                              : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                          )}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                    
                    {/* Image Upload - show only when image type is selected */}
                    {customColors.backgroundType === 'image' && (
                      <div className="space-y-3">
                        <Label className="text-xs">Upload Background Image</Label>
                        <div className="flex items-center gap-3">
                          <label className="flex-1 cursor-pointer">
                            <div className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors">
                              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {customColors.backgroundImage ? 'Change Image' : 'Choose Image'}
                              </span>
                            </div>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    setCustomColors({ ...customColors, backgroundImage: reader.result as string });
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                          </label>
                          {customColors.backgroundImage && (
                            <button
                              onClick={() => setCustomColors({ ...customColors, backgroundImage: '' })}
                              className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg transition-colors"
                              title="Remove image"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          )}
                        </div>
                        {customColors.backgroundImage && (
                          <div className="relative aspect-video rounded-lg overflow-hidden border">
                            <img 
                              src={customColors.backgroundImage} 
                              alt="Background preview" 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Fonts Tab */}
            <TabsContent value="fonts" className="mt-0">
              <div className="space-y-6 max-h-[calc(100vh-220px)] overflow-y-auto pr-1 pb-4">
                {/* Heading Font */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Heading Font</CardTitle>
                    <CardDescription className="text-xs">Used for names and titles</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {fontOptions.map((font) => (
                        <button
                          key={font.id}
                          onClick={() => setCustomFonts({ ...customFonts, headingFont: font.id })}
                          className={cn(
                            "p-4 rounded-xl border-2 transition-all text-left",
                            customFonts.headingFont === font.id
                              ? "border-blue-500 bg-transparent dark:bg-transparent ring-1 ring-blue-500/20"
                              : "border-gray-200 dark:border-gray-700"
                          )}
                        >
                          <p className="text-lg font-semibold text-gray-900 dark:text-white" style={{ fontFamily: font.family }}>
                            {font.name}
                          </p>
                          <p className="text-xs text-gray-500 mt-1 dark:text-gray-300">{font.preview}</p>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Body Font */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Body Font</CardTitle>
                    <CardDescription className="text-xs">Used for descriptions and text</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {fontOptions.map((font) => (
                        <button
                          key={font.id}
                          onClick={() => setCustomFonts({ ...customFonts, bodyFont: font.id })}
                          className={cn(
                            "p-4 rounded-xl border-2 transition-all text-left",
                            customFonts.bodyFont === font.id
                              ? "border-blue-500 bg-transparent dark:bg-transparent ring-1 ring-blue-500/20"
                              : "border-gray-200 dark:border-gray-700"
                          )}
                        >
                          <p className="text-base text-gray-900 dark:text-white" style={{ fontFamily: font.family }}>
                            {font.name}
                          </p>
                          <p className="text-xs text-gray-500 mt-1 dark:text-gray-300">{font.preview}</p>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Font Size */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Font Size</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-3">
                      {(["small", "medium", "large"] as FontSize[]).map((size) => (
                        <button
                          key={size}
                          onClick={() => setCustomFonts({ ...customFonts, fontSize: size })}
                          className={cn(
                            "p-4 rounded-xl border-2 transition-all text-center",
                            customFonts.fontSize === size
                              ? "border-blue-500 bg-transparent dark:bg-transparent ring-1 ring-blue-500/20"
                              : "border-gray-200 dark:border-gray-700"
                          )}
                        >
                          <span className={cn(
                            "font-medium capitalize",
                            size === "small" && "text-sm",
                            size === "medium" && "text-base",
                            size === "large" && "text-lg"
                          )}>
                            {size}
                          </span>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Buttons Tab */}
            <TabsContent value="buttons" className="mt-0">
              <div className="space-y-6 max-h-[calc(100vh-220px)] overflow-y-auto pr-1 pb-4">
                {/* Button Style */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Button Style</CardTitle>
                    <CardDescription className="text-xs">Choose your link button appearance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      {buttonStyleOptions.map((style) => (
                        <button
                          key={style.id}
                          onClick={() => setCustomButtons({ ...customButtons, style: style.id, borderRadius: style.borderRadius })}
                          className={cn(
                            "p-4 rounded-xl border-2 transition-all",
                            customButtons.style === style.id
                              ? "border-blue-500 bg-transparent dark:bg-transparent ring-1 ring-blue-500/20"
                              : "border-gray-200 dark:border-gray-700"
                          )}
                        >
                          <div className="mb-2">
                            <div
                              className={cn(
                                "w-full py-2.5 text-sm font-medium flex items-center justify-center gap-2",
                                style.id === "rounded" && "bg-blue-600 text-white rounded-lg",
                                style.id === "pill" && "bg-blue-600 text-white rounded-full",
                                style.id === "sharp" && "bg-blue-600 text-white",
                                style.id === "outline" && "bg-transparent border-2 border-blue-600 text-blue-600 rounded-lg",
                                style.id === "icon-left" && "bg-gray-100 dark:bg-gray-900 text-black rounded-full pl-2",
                                style.id === "icon-left-rounded" && "bg-gradient-to-r from-orange-400 to-yellow-400 text-white rounded-full",
                                style.id === "icon-circle" && "bg-gradient-to-r from-teal-400 to-blue-500 text-white rounded-full",
                                style.id === "icon-float" && "bg-gray-100 dark:bg-gray-800 text-purple-600 rounded-full"
                              )}
                            >
                              {style.id.includes("icon") && (
                                <span className="w-5 h-5 bg-white dark:bg-white/10 rounded-full text-xs flex items-center justify-center text-black dark:text-white">→</span>
                              )}
                              Button
                            </div>
                          </div>
                          <p className="text-xs text-center font-medium text-gray-700 dark:text-gray-300">{style.name}</p>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Button Animation */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Button Animation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {buttonAnimations.map((anim) => (
                        <button
                          key={anim.id}
                          onClick={() => setCustomButtons({ ...customButtons, animation: anim.id })}
                          className={cn(
                            "p-4 rounded-xl border-2 transition-all text-center",
                            customButtons.animation === anim.id
                              ? "border-blue-500 bg-transparent dark:bg-transparent ring-1 ring-blue-500/20"
                              : "border-gray-200 dark:border-gray-700"
                          )}
                        >
                          <span className="text-sm font-medium">{anim.name}</span>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Button Shadow */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Button Shadow</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setCustomButtons({ ...customButtons, shadow: false })}
                        className={cn(
                          "p-4 rounded-xl border-2 transition-all",
                          !customButtons.shadow
                            ? "border-blue-500 bg-transparent dark:bg-transparent ring-1 ring-blue-500/20"
                            : "border-gray-200 dark:border-gray-700"
                        )}
                      >
                        <div className="w-full py-2 bg-blue-600 text-white rounded-lg text-sm mb-2">
                          No Shadow
                        </div>
                        <p className="text-xs text-center text-gray-500">Flat look</p>
                      </button>
                      <button
                        onClick={() => setCustomButtons({ ...customButtons, shadow: true })}
                        className={cn(
                          "p-4 rounded-xl border-2 transition-all",
                          customButtons.shadow
                            ? "border-blue-500 bg-transparent dark:bg-transparent ring-1 ring-blue-500/20"
                            : "border-gray-200 dark:border-gray-700"
                        )}
                      >
                        <div className="w-full py-2 bg-blue-600 text-white rounded-lg text-sm mb-2 shadow-lg shadow-blue-600/30">
                          With Shadow
                        </div>
                        <p className="text-xs text-center text-gray-500">Elevated look</p>
                      </button>
                    </div>
                  </CardContent>
                </Card>

                {/* Border Radius */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Border Radius</CardTitle>
                    <CardDescription className="text-xs">Adjust button corner roundness</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Slider
                      value={[customButtons.borderRadius]}
                      onValueChange={(value) => setCustomButtons({ ...customButtons, borderRadius: value[0] })}
                      max={30}
                      step={2}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Sharp (0px)</span>
                      <span>{customButtons.borderRadius}px</span>
                      <span>Round (30px)</span>
                    </div>
                    <div
                      className="w-full py-3 bg-blue-600 text-white text-sm font-medium text-center"
                      style={{ borderRadius: `${customButtons.borderRadius}px` }}
                    >
                      Preview Button
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Live Preview - Right Side */}
        <div className="lg:w-[340px] lg:min-w-[340px] flex-shrink-0 w-full overflow-x-hidden">
          <div className="sticky top-4">
            {/* Preview Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                  <Smartphone className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h2 className="font-medium text-sm text-gray-900 dark:text-white">Live Preview</h2>
                  <p className="text-xs text-gray-500">{selectedTheme.name}</p>
                </div>
              </div>
            </div>

            {/* Phone Frame */}
            <div className="flex justify-center">
              <motion.div
                key={layoutThemeId}
                initial={{ opacity: 0.8, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                {/* Glow */}
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl rounded-full opacity-50" />
                
                {/* Phone shadow */}
                <div className="absolute inset-4 bg-black/20 blur-3xl rounded-[45px]" />
                
                {/* Phone body */}
                <div
                  className="relative rounded-[45px] overflow-hidden bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900 border border-gray-600/50"
                  style={{
                    width: 280,
                    height: 550,
                    padding: "10px",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
                  }}
                >
                  {/* Dynamic Island */}
                  <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-[90px] h-[28px] bg-black rounded-full z-20 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-800 mr-5" />
                  </div>
                  
                  {/* Screen Content */}
                  <div
                    className="phone-screen h-full w-full overflow-y-auto bg-white rounded-[35px] relative"
                    style={{ fontSize: '13px', lineHeight: 1.18 }}
                  >
                    <LayoutRenderer profile={defaultProfileData} embedded={true} />
                  </div>
                  
                  {/* Home indicator */}
                  <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/40 rounded-full" />
                </div>
              </motion.div>
            </div>

            {/* Live indicator */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs text-gray-500">Live updates enabled</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default function ThemesPage() {
  return (
    <ProtectedRoute allowedRoles={["user"]}>
      <ThemesContent />
    </ProtectedRoute>
  );
}
