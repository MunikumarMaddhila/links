"use client";

import { useRef, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Check, Upload, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { ThemeProvider, useTheme, colorThemes } from "@/contexts/ThemeContext";
import { LinksProvider } from "@/contexts/LinksContext";
import { AppearancePreview } from "@/components/dashboard/AppearancePreview";
import { LivePreviewPanel } from "@/components/dashboard/LivePreviewPanel";

function AppearanceContent() {
  const { 
    colorTheme, 
    setColorTheme, 
    buttonStyle, 
    setButtonStyle, 
    fontStyle, 
    setFontStyle,
    profileName, 
    setProfileName, 
    profileBio, 
    setProfileBio,
    profileImage,
    setProfileImage
  } = useTheme();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setMessage({ type: 'error', text: 'File size must be less than 2MB' });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
        setMessage({ type: 'success', text: 'Photo updated' });
        setTimeout(() => setMessage(null), 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setMessage(null);

      const payload = {
        profileName,
        profileBio,
        profileImage: profileImage?.startsWith('data:') ? profileImage : null,
        colorThemeId: colorTheme.id,
        buttonStyle,
        fontStyle,
      };

      const response = await fetch('/api/users/appearance', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save appearance settings');
      }

      const data = await response.json();
      setMessage({ type: 'success', text: 'Appearance settings saved successfully!' });
      
      // Clear message after 5 seconds
      setTimeout(() => setMessage(null), 5000);
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to save appearance settings',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-2xl md:text-3xl font-bold">Appearance</h1>
          <p className="text-muted-foreground mt-1">Customize how your profile page looks to visitors.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Settings - Takes 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Section */}
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Customize your profile appearance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar */}
                <div className="flex items-center gap-6">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={profileImage || ""} />
                    <AvatarFallback className="bg-linear-to-br from-blue-500 to-purple-600 text-white text-2xl font-bold">
                      {profileName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handlePhotoChange}
                      accept="image/jpeg,image/png,image/gif"
                      className="hidden"
                    />
                    <Button variant="outline" size="sm" className="gap-2" onClick={() => fileInputRef.current?.click()}>
                      <Upload className="w-4 h-4" />
                      Change Photo
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      Recommended: 400x400px
                    </p>
                  </div>
                </div>

                {/* Page Title */}
                <div className="space-y-2">
                  <Label htmlFor="page-title">Page Title</Label>
                  <Input
                    id="page-title"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    placeholder="Your name"
                  />
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileBio}
                    onChange={(e) => setProfileBio(e.target.value)}
                    placeholder="Tell visitors about yourself"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Theme Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🎨</span>
                  Theme
                </CardTitle>
                <CardDescription>Choose a color theme for your page</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  {colorThemes.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => setColorTheme(theme)}
                      className={cn(
                        "relative rounded-xl border-2 transition-all hover:scale-105 overflow-hidden h-24",
                        colorTheme.id === theme.id 
                          ? "border-blue-500 ring-2 ring-blue-500 ring-offset-2" 
                          : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                      )}
                      style={{ background: theme.background }}
                    >
                      <p className="absolute bottom-2 left-0 right-0 text-sm font-medium text-center text-white drop-shadow-lg">
                        {theme.name}
                      </p>
                      {colorTheme.id === theme.id && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Button Style Section */}
            <Card>
              <CardHeader>
                <CardTitle>Button Style</CardTitle>
                <CardDescription>Choose how your link buttons look</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setButtonStyle('rounded')}
                    className={cn(
                      "relative p-6 rounded-xl border-2 transition-all hover:scale-105",
                      buttonStyle === 'rounded'
                        ? "border-blue-500 ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-background" 
                        : "border-border hover:border-muted-foreground/30"
                    )}
                  >
                    <div className="flex items-center justify-center mb-3">
                      <div className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg">
                        Link Button
                      </div>
                    </div>
                    <p className="text-sm font-medium text-center">Rounded</p>
                    {buttonStyle === 'rounded' && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </button>

                  <button
                    onClick={() => setButtonStyle('pill')}
                    className={cn(
                      "relative p-6 rounded-xl border-2 transition-all hover:scale-105",
                      buttonStyle === 'pill'
                        ? "border-blue-500 ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-background" 
                        : "border-border hover:border-muted-foreground/30"
                    )}
                  >
                    <div className="flex items-center justify-center mb-3">
                      <div className="w-full py-3 bg-blue-600 text-white font-medium rounded-full">
                        Link Button
                      </div>
                    </div>
                    <p className="text-sm font-medium text-center">Pill</p>
                    {buttonStyle === 'pill' && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </button>

                  <button
                    onClick={() => setButtonStyle('sharp')}
                    className={cn(
                      "relative p-6 rounded-xl border-2 transition-all hover:scale-105",
                      buttonStyle === 'sharp'
                        ? "border-blue-500 ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-background" 
                        : "border-border hover:border-muted-foreground/30"
                    )}
                  >
                    <div className="flex items-center justify-center mb-3">
                      <div className="w-full py-3 bg-blue-600 text-white font-medium">
                        Link Button
                      </div>
                    </div>
                    <p className="text-sm font-medium text-center">Sharp</p>
                    {buttonStyle === 'sharp' && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </button>

                  <button
                    onClick={() => setButtonStyle('outline')}
                    className={cn(
                      "relative p-6 rounded-xl border-2 transition-all hover:scale-105",
                      buttonStyle === 'outline'
                        ? "border-blue-500 ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-background" 
                        : "border-border hover:border-muted-foreground/30"
                    )}
                  >
                    <div className="flex items-center justify-center mb-3">
                      <div className="w-full py-3 bg-transparent border-2 border-blue-600 text-blue-600 font-medium rounded-lg">
                        Link Button
                      </div>
                    </div>
                    <p className="text-sm font-medium text-center">Outline</p>
                    {buttonStyle === 'outline' && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </button>

                  {/* Icon Button Styles */}
                  <button
                    onClick={() => setButtonStyle('icon-left')}
                    className={cn(
                      "relative p-6 rounded-xl border-2 transition-all hover:scale-105",
                      buttonStyle === 'icon-left'
                        ? "border-blue-500 ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-background" 
                        : "border-border hover:border-muted-foreground/30"
                    )}
                  >
                    <div className="flex items-center justify-center mb-3">
                      <div className="w-full py-3 bg-card border-2 border-border text-foreground font-medium rounded-full flex items-center pl-2 gap-3 shadow-sm">
                        <div className="w-8 h-8 bg-linear-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-white shadow-md">
                          <span className="text-sm">↓</span>
                        </div>
                        Link Button
                      </div>
                    </div>
                    <p className="text-sm font-medium text-center">Icon Circle</p>
                    {buttonStyle === 'icon-left' && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </button>

                  <button
                    onClick={() => setButtonStyle('icon-left-rounded')}
                    className={cn(
                      "relative p-6 rounded-xl border-2 transition-all hover:scale-105",
                      buttonStyle === 'icon-left-rounded'
                        ? "border-blue-500 ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-background" 
                        : "border-border hover:border-muted-foreground/30"
                    )}
                  >
                    <div className="flex items-center justify-center mb-3">
                      <div className="w-full py-3 bg-linear-to-r from-orange-400 to-yellow-400 text-white font-medium rounded-full flex items-center pl-3 gap-3 shadow-md">
                        <div className="w-7 h-7 bg-white/30 rounded-full flex items-center justify-center">
                          <span className="text-sm">»</span>
                        </div>
                        Link Button
                      </div>
                    </div>
                    <p className="text-sm font-medium text-center">Gradient Pill</p>
                    {buttonStyle === 'icon-left-rounded' && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </button>

                  <button
                    onClick={() => setButtonStyle('icon-circle')}
                    className={cn(
                      "relative p-6 rounded-xl border-2 transition-all hover:scale-105",
                      buttonStyle === 'icon-circle'
                        ? "border-blue-500 ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-background" 
                        : "border-border hover:border-muted-foreground/30"
                    )}
                  >
                    <div className="flex items-center justify-center mb-3">
                      <div className="w-full py-3 bg-linear-to-r from-teal-400 to-blue-500 text-white font-medium rounded-full flex items-center pl-3 gap-3 shadow-md">
                        <div className="w-7 h-7 bg-white/30 rounded-full flex items-center justify-center">
                          <span className="text-sm">→</span>
                        </div>
                        Link Button
                      </div>
                    </div>
                    <p className="text-sm font-medium text-center">Teal Gradient</p>
                    {buttonStyle === 'icon-circle' && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </button>

                  <button
                    onClick={() => setButtonStyle('icon-float')}
                    className={cn(
                      "relative p-6 rounded-xl border-2 transition-all hover:scale-105",
                      buttonStyle === 'icon-float'
                        ? "border-blue-500 ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-background" 
                        : "border-border hover:border-muted-foreground/30"
                    )}
                  >
                    <div className="flex items-center justify-center mb-3">
                      <div className="w-full py-3 bg-card border-2 border-border text-purple-600 dark:text-purple-400 font-medium rounded-full flex items-center pl-2 gap-3 shadow-sm">
                        <div className="w-8 h-8 bg-linear-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white shadow-md">
                          <span className="text-sm">⟨</span>
                        </div>
                        Link Button
                      </div>
                    </div>
                    <p className="text-sm font-medium text-center">Purple Icon</p>
                    {buttonStyle === 'icon-float' && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Font Section */}
            <Card>
              <CardHeader>
                <CardTitle>Font</CardTitle>
                <CardDescription>Choose your page font</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <button
                    onClick={() => setFontStyle('inter')}
                    className={cn(
                      "relative p-6 rounded-xl border-2 transition-all hover:scale-105",
                      fontStyle === 'inter'
                        ? "border-blue-500 ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-background" 
                        : "border-border hover:border-muted-foreground/30"
                    )}
                  >
                    <p className="text-2xl font-medium text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Inter
                    </p>
                    {fontStyle === 'inter' && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </button>

                  <button
                    onClick={() => setFontStyle('serif')}
                    className={cn(
                      "relative p-6 rounded-xl border-2 transition-all hover:scale-105",
                      fontStyle === 'serif'
                        ? "border-blue-500 ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-background" 
                        : "border-border hover:border-muted-foreground/30"
                    )}
                  >
                    <p className="text-2xl font-medium text-center" style={{ fontFamily: 'Georgia, serif' }}>
                      Serif
                    </p>
                    {fontStyle === 'serif' && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </button>

                  <button
                    onClick={() => setFontStyle('mono')}
                    className={cn(
                      "relative p-6 rounded-xl border-2 transition-all hover:scale-105",
                      fontStyle === 'mono'
                        ? "border-blue-500 ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-background" 
                        : "border-border hover:border-muted-foreground/30"
                    )}
                  >
                    <p className="text-2xl font-medium text-center" style={{ fontFamily: 'monospace' }}>
                      Mono
                    </p>
                    {fontStyle === 'mono' && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="space-y-3">
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={cn(
                    "p-4 rounded-lg font-medium text-sm",
                    message.type === 'success'
                      ? "bg-green-50 dark:bg-green-950 text-green-800 dark:text-green-100 border border-green-200 dark:border-green-800"
                      : "bg-red-50 dark:bg-red-950 text-red-800 dark:text-red-100 border border-red-200 dark:border-red-800"
                  )}
                >
                  {message.type === 'success' ? '✓ ' : '✕ '}
                  {message.text}
                </motion.div>
              )}
              <Button 
                onClick={handleSave}
                disabled={loading}
                className="w-full h-12 text-base font-semibold bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </div>
          </div>

          {/* Preview - Takes 1 column, hidden on mobile */}
          <div className="hidden lg:block">
            <LivePreviewPanel />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default function AppearancePage() {
  return (
    <ProtectedRoute allowedRoles={["user"]}>
      <ThemeProvider>
        <LinksProvider>
          <AppearanceContent />
        </LinksProvider>
      </ThemeProvider>
    </ProtectedRoute>
  );
}
