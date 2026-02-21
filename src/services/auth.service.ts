import { http, localHttp } from "./http";

export const AuthService = {
  login: (data: { email: string; password: string }) =>
    http.post("api/auth/login", data),

  register: (data: { name: string; email: string; password: string }) =>
    http.post("api/auth/register", data),

  me: () => http.get("/auth/me"),

  // Upload file using FormData instead of raw File
  uploadImage: (file: File, userId: string) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userId);
    
    console.log("uploadImage service: Creating FormData", { fileName: file.name, fileSize: file.size, userId });
    
    // Call the FRONTEND's /api/files/upload endpoint (not the backend)
    // Use localHttp to avoid baseURL prefix - calls frontend local API
    return localHttp.post("/api/files/upload", formData)
      .then(response => {
        console.log("uploadImage service: Success response", response.data);
        return response;
      })
      .catch(error => {
        const errorInfo = {
          name: error.name,
          message: String(error.message),
          status: error.response?.status,
          statusText: error.response?.statusText,
          responseData: error.response?.data,
          requestUrl: error.config?.url,
          requestMethod: error.config?.method,
          isAxiosError: error.isAxiosError,
          code: error.code
        };
        console.error("uploadImage service: Error INFO", errorInfo);
        console.error("uploadImage service: Full error", error);
        throw error;
      });
  },

  // Upload profile image to database
  uploadProfileImage: (formData: FormData) =>
    localHttp.post("/api/users/profile/image", formData),

  // Update user profile
  updateProfile: (data: { name?: string; email?: string; username?: string; bio?: string }) =>
    localHttp.patch("api/users/profile", data),

  // Update notification settings (bulk update)
  updateNotifications: (data: { emailNotifications?: boolean; weeklyReport?: boolean; marketingEmails?: boolean }) =>
    localHttp.patch("api/users/settings/notifications", data),

  // Individual notification APIs
  updateEmailNotification: (enabled: boolean) =>
    localHttp.patch("/api/email_notification", { enabled }),

  getEmailNotificationStatus: () =>
    localHttp.get("/api/email_notification"),

  updateWeeklyReport: (enabled: boolean) =>
    localHttp.patch("/api/weekly_report", { enabled }),

  getWeeklyReportStatus: () =>
    localHttp.get("/api/weekly_report"),

  updateMarketingEmail: (enabled: boolean) =>
    localHttp.patch("/api/market_email", { enabled }),

  getMarketingEmailStatus: () =>
    localHttp.get("/api/market_email"),

  // Change password
  changePassword: (data: { currentPassword: string; newPassword: string; confirmPassword: string }) =>
    localHttp.patch("/api/password", data),

  // Two-Factor Authentication
  sendTwoFactorOTP: (email: string) =>
    localHttp.post("/api/two_step_auth", { email }),

  verifyTwoFactorOTP: (email: string, otp: string) =>
    localHttp.patch("/api/two_step_auth", { email, otp }),

  getTwoFactorStatus: () =>
    localHttp.get("/api/two_step_auth"),

  disableTwoFactor: (password: string) =>
    localHttp.delete("/api/two_step_auth", { data: { password } }),

  // Delete account
  deleteAccount: (password: string) =>
    localHttp.post("api/users/delete-account", { password }),
};
