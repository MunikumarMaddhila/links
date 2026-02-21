import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Loader2, 
  CheckCircle, 
  AlertCircle, 
  Copy, 
  Eye, 
  EyeOff,
  Mail 
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AuthService } from "@/services/auth.service";

interface TwoFactorAuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
}

type Step = "email" | "otp" | "backup" | "complete";

export function TwoFactorAuthModal({
  open,
  onOpenChange,
  onSuccess,
  onError,
}: TwoFactorAuthModalProps) {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [otpSent, setOtpSent] = useState(false);
  const [showBackupCodes, setShowBackupCodes] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Auto-focus OTP input and format input
  const handleOtpChange = (value: string) => {
    const digits = value.replace(/\D/g, "");
    setOtp(digits.slice(0, 6));
    setError(null);
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      const msg = "Email is required";
      setError(msg);
      if (onError) onError(msg);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      const msg = "Invalid email format";
      setError(msg);
      if (onError) onError(msg);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await AuthService.sendTwoFactorOTP(email);
      console.log("✅ OTP sent to email:", email);
      setOtpSent(true);
      setStep("otp");
    } catch (err: any) {
      console.error("❌ Error sending OTP:", err);
      const errorMsg = err.response?.data?.message || "Failed to send OTP. Please try again.";
      setError(errorMsg);
      if (onError) onError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otp.length !== 6) {
      const msg = "Please enter a 6-digit OTP";
      setError(msg);
      if (onError) onError(msg);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await AuthService.verifyTwoFactorOTP(email, otp);
      console.log("✅ OTP verified successfully");
      setBackupCodes(response.data.data.backupCodes);
      setStep("backup");
    } catch (err: any) {
      console.error("❌ Error verifying OTP:", err);
      const errorMsg = err.response?.data?.message || "Invalid or expired OTP. Please try again.";
      setError(errorMsg);
      if (onError) onError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleComplete = () => {
    setStep("complete");
    setTimeout(() => {
      setEmail("");
      setOtp("");
      setBackupCodes([]);
      setOtpSent(false);
      onOpenChange(false);
      if (onSuccess) {
        onSuccess("Two-factor authentication enabled successfully!");
      }
    }, 2000);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setStep("email");
      setEmail("");
      setOtp("");
      setError(null);
      setOtpSent(false);
      setBackupCodes([]);
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Set Up Two-Factor Authentication</DialogTitle>
          <DialogDescription>
            Add an extra layer of security to your account
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6">
          {/* Step 1: Enter Email */}
          {step === "email" && (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSendOTP}
              className="space-y-4"
            >
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 flex gap-2">
                <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-blue-800 dark:text-blue-200">
                  We'll send a verification code to your email
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="2fa-email">Email Address</Label>
                <Input
                  id="2fa-email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError(null);
                  }}
                  disabled={isLoading}
                />
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-xs flex gap-2"
                >
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}

              <Button
                type="submit"
                disabled={isLoading || !email}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  "Send Verification Code"
                )}
              </Button>
            </motion.form>
          )}

          {/* Step 2: Enter OTP */}
          {step === "otp" && (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleVerifyOTP}
              className="space-y-4"
            >
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                <p className="text-xs text-green-800 dark:text-green-200">
                  <strong>Code sent!</strong> Check your email for a 6-digit verification code
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="otp-input">Verification Code</Label>
                <Input
                  id="otp-input"
                  type="text"
                  placeholder="000000"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => handleOtpChange(e.target.value)}
                  disabled={isLoading}
                  className="text-center text-2xl tracking-widest font-mono"
                />
                <p className="text-xs text-muted-foreground">
                  Enter the code from your email
                </p>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-xs flex gap-2"
                >
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}

              <Button
                type="submit"
                disabled={isLoading || otp.length !== 6}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Verifying...
                  </>
                ) : (
                  "Verify Code"
                )}
              </Button>

              <Button
                type="button"
                variant="ghost"
                className="w-full text-xs"
                onClick={() => setStep("email")}
                disabled={isLoading}
              >
                Use different email
              </Button>
            </motion.form>
          )}

          {/* Step 3: Backup Codes */}
          {step === "backup" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                <p className="text-xs text-yellow-800 dark:text-yellow-200">
                  <strong>Save these backup codes!</strong> You'll need them if you lose access to your email.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Backup Codes</Label>
                  <button
                    type="button"
                    onClick={() => setShowBackupCodes(!showBackupCodes)}
                    className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                  >
                    {showBackupCodes ? (
                      <>
                        <EyeOff className="w-3 h-3" />
                        Hide
                      </>
                    ) : (
                      <>
                        <Eye className="w-3 h-3" />
                        Show
                      </>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 bg-secondary/30 p-3 rounded-lg border">
                  {backupCodes.map((code, index) => (
                    <div
                      key={index}
                      className="relative group"
                    >
                      <button
                        type="button"
                        onClick={() => copyToClipboard(code)}
                        className="w-full text-left p-2 rounded bg-secondary hover:bg-secondary/80 transition-colors text-xs font-mono"
                      >
                        {showBackupCodes ? code : "••••••••"}
                      </button>
                      {copiedCode === code && (
                        <div className="absolute inset-0 flex items-center justify-center rounded bg-green-500/20">
                          <Copy className="w-3 h-3 text-green-600" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <Button
                type="button"
                onClick={handleComplete}
                className="w-full gradient-primary text-primary-foreground"
              >
                I've Saved My Backup Codes
              </Button>
            </motion.div>
          )}

          {/* Step 4: Complete */}
          {step === "complete" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="w-16 h-16 mx-auto bg-green-500/10 rounded-full flex items-center justify-center"
              >
                <CheckCircle className="w-8 h-8 text-green-600" />
              </motion.div>

              <div>
                <h3 className="font-semibold text-green-600 dark:text-green-400">
                  2FA Enabled!
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Your account is now more secure
                </p>
              </div>

              <Button
                type="button"
                onClick={() => handleOpenChange(false)}
                className="w-full"
              >
                Done
              </Button>
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
