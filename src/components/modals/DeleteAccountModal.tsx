import React, { useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthService } from "@/services/auth.service";

interface DeleteAccountModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  onError?: (message: string) => void;
}

export function DeleteAccountModal({
  open,
  onOpenChange,
  onSuccess,
  onError,
}: DeleteAccountModalProps) {
  const [step, setStep] = useState<"confirm" | "password">("confirm");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirmDelete = () => {
    setStep("password");
    setError(null);
  };

  const handleDeleteAccount = async () => {
    if (!password) {
      setError("Password is required");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await AuthService.deleteAccount(password);
      console.log("✅ Account deleted successfully");
      
      // Show success and logout
      onOpenChange(false);
      setTimeout(() => {
        onSuccess?.();
        // Redirect to home/login
        window.location.href = "/";
      }, 1000);
    } catch (err: any) {
      console.error("❌ Delete account error:", err);
      const errorMsg = err.response?.data?.message || "Failed to delete account. Please check your password.";
      setError(errorMsg);
      if (onError) {
        onError(errorMsg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open && step === "password") {
      // Reset when closing
      setStep("confirm");
      setPassword("");
      setError(null);
    }
    onOpenChange(open);
  };

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogContent className="max-w-md border-destructive/20">
        <AlertDialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <AlertDialogTitle className="text-destructive text-lg">
                Delete Account
              </AlertDialogTitle>
              <AlertDialogDescription className="text-xs mt-1">
                This action cannot be undone
              </AlertDialogDescription>
            </div>
          </div>
        </AlertDialogHeader>

        <div className="mt-4">
          {step === "confirm" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4">
                <p className="text-sm text-foreground font-medium mb-2">
                  Are you sure you want to delete your account?
                </p>
                <ul className="text-xs text-muted-foreground space-y-1 ml-4 list-disc">
                  <li>All your data will be permanently deleted</li>
                  <li>This action cannot be reversed</li>
                  <li>You will lose access to your profile and links</li>
                </ul>
              </div>
            </motion.div>
          )}

          {step === "password" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                <p className="text-xs text-yellow-800 dark:text-yellow-200">
                  <strong>Required:</strong> Enter your password to confirm deletion
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="delete-password">Password</Label>
                <Input
                  id="delete-password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(null);
                  }}
                  disabled={isLoading}
                  className="border-destructive/30 focus:border-destructive"
                />
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-xs">
                  {error}
                </div>
              )}
            </motion.div>
          )}
        </div>

        <div className="flex gap-3 justify-end mt-6">
          <AlertDialogCancel
            disabled={isLoading}
            onClick={() => {
              setStep("confirm");
              setPassword("");
              setError(null);
            }}
          >
            Cancel
          </AlertDialogCancel>

          {step === "confirm" ? (
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-destructive hover:bg-destructive/90 text-white"
            >
              Yes, Delete
            </AlertDialogAction>
          ) : (
            <button
              onClick={handleDeleteAccount}
              disabled={isLoading || !password}
              className="px-4 py-2 rounded-lg bg-destructive hover:bg-destructive/90 text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm font-medium transition-colors"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Confirm Delete"
              )}
            </button>
          )}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
