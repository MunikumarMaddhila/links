"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Bell, Shield, Key, Smartphone, Trash2, Upload, Loader2 } from "lucide-react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AuthService } from "@/services/auth.service";
import { ChangePasswordModal } from "@/components/modals/ChangePasswordModal";
import { TwoFactorAuthModal } from "@/components/modals/TwoFactorAuthModal";
import { DeleteAccountModal } from "@/components/modals/DeleteAccountModal";

function SettingsContent() {
  const { user, logout } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Modal open states
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isTwoFactorOpen, setIsTwoFactorOpen] = useState(false);
  const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(false);

  // Profile form state
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    username: `@${user?.name?.toLowerCase().replace(" ", "") || ""}`,
    bio: ""
  });

  // Notification settings state
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    weeklyReport: true,
    marketingEmails: false
  });

  // Avatar and loading state
  const [avatarUrl, setAvatarUrl] = useState<string | null>(user?.avatar || null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingNotifications, setIsSavingNotifications] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Handle photo change and upload
  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) {
      console.warn("📸 Upload cancelled - no file or user");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("File size must be less than 2MB");
      return;
    }

    setIsUploading(true);
    setError(null);
    setSuccess(null);

    try {
      console.log("📸 Starting image upload:", { fileName: file.name, fileSize: file.size, userId: user.id });
      
      const response = await AuthService.uploadImage(file, user.id);
      
      console.log("📸 Upload response received:", response);
      console.log("📸 Response.data:", response.data);
      console.log("📸 Response.data keys:", Object.keys(response.data || {}));
      
      // Check for imageUrl or url in the response
      const uploadedUrl = response.data?.imageUrl || response.data?.url;
      
      console.log("📸 Uploaded URL extracted:", uploadedUrl);
      console.log("📸 Is URL valid?", !!uploadedUrl && uploadedUrl.length > 0);
      
      if (uploadedUrl && uploadedUrl.trim().length > 0) {
        console.log("📸 Setting avatar URL:", uploadedUrl);
        setAvatarUrl(uploadedUrl);
        setSuccess("Avatar uploaded successfully! ✓");
        
        // Test if URL is accessible
        const img = new Image();
        img.onload = () => console.log("✅ Image URL verified - image accessible");
        img.onerror = () => console.error("❌ Image URL failed - image not accessible at:", uploadedUrl);
        img.src = uploadedUrl;
        
        setTimeout(() => setSuccess(null), 5000);
      } else {
        console.error("❌ No valid image URL in response:", response.data);
        setError("Failed to get image URL from upload response. Check console for details.");
      }
    } catch (err: any) {
      console.error("❌ Image upload error:", err);
      console.error("❌ Error isAxiosError:", err.isAxiosError);
      console.error("❌ Error message:", err.message);
      console.error("❌ Error code:", err.code);
      console.error("❌ Error response:", err.response);
      
      // Handle network errors
      if (!err.response) {
        setError(`Network error (${err.code || err.message}). Check your connection and NEXT_PUBLIC_API_BASE_URL.`);
      } else if (err.response?.status === 404) {
        setError("Upload endpoint not found (404). Backend missing /api/files/upload.");
      } else if (err.response?.status === 500) {
        setError("Server error (500). Please try again later.");
      } else {
        setError(err.response?.data?.message || err.message || `Upload failed (${err.response?.status})`);
      }
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // Handle profile form changes
  const handleProfileChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  // Save profile changes
  const handleSaveProfile = async () => {
    setIsSavingProfile(true);
    setError(null);

    try {
      await AuthService.updateProfile({
        name: profileData.name,
        email: profileData.email,
        username: profileData.username,
        bio: profileData.bio
      });
      setSuccess("Profile updated successfully!");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      console.error("Profile update error:", err);
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setIsSavingProfile(false);
    }
  };

  // Handle notification toggle
  const handleNotificationChange = (key: keyof typeof notifications) => {
    const updatedNotifications = { ...notifications, [key]: !notifications[key] };
    setNotifications(updatedNotifications);
    // Optionally auto-save on toggle
    saveNotifications(updatedNotifications);
  };

  // Save notifications using individual APIs
  const saveNotifications = async (notifData = notifications) => {
    setIsSavingNotifications(true);
    setError(null);

    try {
      // Save each notification preference individually
      const promises = [
        AuthService.updateEmailNotification(notifData.emailNotifications),
        AuthService.updateWeeklyReport(notifData.weeklyReport),
        AuthService.updateMarketingEmail(notifData.marketingEmails)
      ];
      
      await Promise.all(promises);
      setSuccess("Notification settings updated!");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      console.error("Notification update error:", err);
      setError(err.response?.data?.message || "Failed to update notifications");
      // Revert the toggle if save failed
      setNotifications(prev => ({ ...prev }));
    } finally {
      setIsSavingNotifications(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl">
        {/* Error Message */}
        {error && (
          <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/50 text-destructive">
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/50 text-green-700">
            {success}
          </div>
        )}

        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-2xl md:text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your account settings and preferences.</p>
        </motion.div>

        {/* Profile Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                <CardTitle>Profile</CardTitle>
              </div>
              <CardDescription>Update your personal information and profile picture.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Upload */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar className="w-20 h-20">
                    {avatarUrl ? (
                      <AvatarImage 
                        key={avatarUrl}
                        src={avatarUrl} 
                        alt="User avatar"
                        onError={(e) => {
                          console.error("❌ Avatar image failed to load:", {
                            attemptedSrc: e.currentTarget.src,
                            avatarUrl,
                            userAvatar: user?.avatar
                          });
                        }}
                        onLoad={() => {
                          console.log("✅ Avatar image loaded successfully:", {
                            loadedSrc: avatarUrl
                          });
                        }}
                      />
                    ) : user?.avatar ? (
                      <AvatarImage 
                        src={user.avatar} 
                        alt="User avatar"
                        onError={(e) => {
                          console.error("❌ User avatar failed to load:", {
                            attemptedSrc: e.currentTarget.src
                          });
                        }}
                      />
                    ) : null}
                    <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {avatarUrl && (
                    <div className="absolute bottom-0 right-0 text-xs bg-green-500 text-white rounded-full p-1 shadow-md">
                      ✓
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handlePhotoChange}
                    accept="image/jpeg,image/png,image/gif"
                    className="hidden"
                    disabled={isUploading}
                  />
                  <Button 
                    variant="outline" 
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="gap-2"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        Change Photo
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-muted-foreground">JPG, PNG or GIF. Max 2MB.</p>
                  {avatarUrl && (
                    <div className="space-y-1">
                      <p className="text-xs text-green-600 font-medium">✓ Image Uploaded</p>
                      <code className="bg-green-50 px-2 py-1 rounded text-xs break-all block">
                        {avatarUrl}
                      </code>
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              {/* Profile Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    value={profileData.name}
                    onChange={(e) => handleProfileChange("name", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={profileData.email}
                    onChange={(e) => handleProfileChange("email", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input 
                    id="username" 
                    value={profileData.username}
                    onChange={(e) => handleProfileChange("username", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input 
                    id="bio" 
                    placeholder="Tell us about yourself"
                    value={profileData.bio}
                    onChange={(e) => handleProfileChange("bio", e.target.value)}
                  />
                </div>
              </div>

              <Button 
                className="gradient-primary text-primary-foreground"
                onClick={handleSaveProfile}
                disabled={isSavingProfile}
              >
                {isSavingProfile ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Notifications Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                <CardTitle>Notifications</CardTitle>
              </div>
              <CardDescription>Configure how you receive notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive email updates about your links</p>
                </div>
                <Switch 
                  checked={notifications.emailNotifications}
                  onCheckedChange={() => handleNotificationChange("emailNotifications")}
                  disabled={isSavingNotifications}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Weekly Report</Label>
                  <p className="text-sm text-muted-foreground">Get a weekly summary of your analytics</p>
                </div>
                <Switch 
                  checked={notifications.weeklyReport}
                  onCheckedChange={() => handleNotificationChange("weeklyReport")}
                  disabled={isSavingNotifications}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Marketing Emails</Label>
                  <p className="text-sm text-muted-foreground">Receive tips and product updates</p>
                </div>
                <Switch 
                  checked={notifications.marketingEmails}
                  onCheckedChange={() => handleNotificationChange("marketingEmails")}
                  disabled={isSavingNotifications}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Security Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                <CardTitle>Security</CardTitle>
              </div>
              <CardDescription>Manage your account security settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-secondary">
                <div className="flex items-center gap-3">
                  <Key className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Password</p>
                    <p className="text-sm text-muted-foreground">Change your password regularly</p>
                  </div>
                </div>
                <Button variant="outline" onClick={() => setIsChangePasswordOpen(true)}>
                  Change
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-secondary">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                  </div>
                </div>
                <Button variant="outline" onClick={() => setIsTwoFactorOpen(true)}>
                  Enable
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Danger Zone Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="border-destructive/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Trash2 className="w-5 h-5 text-destructive" />
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
              </div>
              <CardDescription>Irreversible and destructive actions.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 rounded-lg bg-destructive/5 border border-destructive/20">
                <div>
                  <p className="font-medium">Delete Account</p>
                  <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                </div>
                <Button 
                  variant="destructive"
                  onClick={() => setIsDeleteAccountOpen(true)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Modals */}
      <ChangePasswordModal 
        open={isChangePasswordOpen}
        onOpenChange={setIsChangePasswordOpen}
        onSuccess={(message) => {
          setSuccess(message);
          setTimeout(() => setSuccess(null), 3000);
        }}
        onError={(message) => {
          setError(message);
          setTimeout(() => setError(null), 3000);
        }}
      />

      <TwoFactorAuthModal 
        open={isTwoFactorOpen}
        onOpenChange={setIsTwoFactorOpen}
        onSuccess={(message) => {
          setSuccess(message);
          setTimeout(() => setSuccess(null), 3000);
        }}
        onError={(message) => {
          setError(message);
          setTimeout(() => setError(null), 3000);
        }}
      />

      <DeleteAccountModal 
        open={isDeleteAccountOpen}
        onOpenChange={setIsDeleteAccountOpen}
        onSuccess={() => {
          setSuccess("Account deleted successfully");
          setTimeout(() => logout(), 2000);
        }}
        onError={(message) => {
          setError(message);
          setTimeout(() => setError(null), 3000);
        }}
      />
    </DashboardLayout>
  );
}

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <SettingsContent />
    </ProtectedRoute>
  );
}
