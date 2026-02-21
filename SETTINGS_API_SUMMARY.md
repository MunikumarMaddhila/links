# Settings APIs - Quick Reference Guide

## All New Endpoints Created

### 1. Profile Image Management
```
POST   /api/users/profile/image      - Upload/save profile image
GET    /api/users/profile/image      - Get profile image details
DELETE /api/users/profile/image      - Delete profile image
```

### 2. Email Notifications
```
PATCH  /api/email_notification       - Toggle email notifications
GET    /api/email_notification       - Get email notification status
```

### 3. Weekly Reports
```
PATCH  /api/weekly_report            - Toggle weekly report emails
GET    /api/weekly_report            - Get weekly report status
```

### 4. Marketing Emails
```
PATCH  /api/market_email             - Toggle marketing emails
GET    /api/market_email             - Get marketing email status
```

### 5. Password Management
```
PATCH  /api/password                 - Change password (PATCH method)
POST   /api/password                 - Change password (POST method - alternative)
```

---

## File Locations

```
src/app/api/
├── email_notification/
│   └── route.ts                     (Email notification toggle API)
├── weekly_report/
│   └── route.ts                     (Weekly report toggle API)
├── market_email/
│   └── route.ts                     (Marketing email toggle API)
├── password/
│   └── route.ts                     (Password change API)
└── users/
    ├── profile/
    │   ├── route.ts                 (Existing profile update API)
    │   └── image/
    │       └── route.ts             (Profile image upload API - NEW)
    ├── settings/
    │   └── notifications/
    │       └── route.ts             (Bulk notifications update API)
    └── appearance/
        └── route.ts                 (Appearance customization API)
```

---

## AuthService Methods (Updated)

Located in: `src/services/auth.service.ts`

```typescript
// Profile image
AuthService.uploadProfileImage(formData)

// Individual notification APIs
AuthService.updateEmailNotification(enabled: boolean)
AuthService.getEmailNotificationStatus()
AuthService.updateWeeklyReport(enabled: boolean)
AuthService.getWeeklyReportStatus()
AuthService.updateMarketingEmail(enabled: boolean)
AuthService.getMarketingEmailStatus()

// Password
AuthService.changePassword(data: {
  currentPassword: string,
  newPassword: string,
  confirmPassword: string
})
```

---

## Settings Page Changes

File: `src/app/settings/page.tsx`

### Updated Functions:
- `handlePhotoChange()` - Upload profile image
- `handleProfileChange()` - Update profile fields
- `handleSaveProfile()` - Save profile changes
- `handleNotificationChange()` - Toggle notification
- `saveNotifications()` - **UPDATED**: Now uses individual notification APIs

### UI Components:
- ✅ Avatar upload with file validation
- ✅ Profile form fields (name, email, username, bio)
- ✅ Notification toggles (email, weekly report, marketing)
- ✅ Security section (password change, 2FA)
- ✅ Danger zone (delete account)

---

## Request/Response Examples

### Change Password
```bash
Request:
PATCH /api/password
{
  "currentPassword": "oldPass123",
  "newPassword": "newSecure@123",
  "confirmPassword": "newSecure@123"
}

Response (200):
{
  "message": "Password changed successfully",
  "data": {
    "userId": "user-id",
    "changedAt": "2026-02-15T10:30:00Z"
  }
}
```

### Upload Profile Image
```bash
Request:
POST /api/users/profile/image
FormData: { image: <file> }

Response (200):
{
  "message": "Profile image saved successfully",
  "data": {
    "imageUrl": "https://cdn.example.com/profile-images/...",
    "imageName": "profile-picture.jpg",
    "size": 245632,
    "savedAt": "2026-02-15T10:30:00Z"
  }
}
```

### Toggle Email Notifications
```bash
Request:
PATCH /api/email_notification
{ "enabled": true }

Response (200):
{
  "message": "Email notification preference updated successfully",
  "data": {
    "emailNotificationEnabled": true,
    "updatedAt": "2026-02-15T10:30:00Z"
  }
}
```

---

## Build Status

✅ **All endpoints created and compiled successfully**

Current build: `Compiled successfully in 9.5s`

---

## Next Steps (Backend Implementation)

1. **Profile Image**
   - Extract userId from JWT token
   - Save image to cloud storage (S3, Azure, etc.)
   - Update database: `users.profile_image` = URL

2. **Notifications**
   - Extract userId from JWT token
   - Save preference to database
   - Trigger email jobs based on preferences

3. **Password**
   - Extract userId from JWT token
   - Verify current password
   - Hash and save new password
   - Optionally invalidate other sessions

4. **Data Persistence**
   - All endpoints currently use mock responses
   - Connect to actual database in each endpoint
   - Return real data from database

---

## Authentication

All endpoints require:
- **Cookie**: `accessToken` (httpOnly, set via `/api/auth/login`)
- **Verified by**: `verifyToken()` utility function
- **Token verification**: Happens automatically on all protected routes

---

## Testing the APIs

Start the dev server:
```bash
npm run dev
```

The application will be available at: `http://localhost:3000`

Settings page: `http://localhost:3000/settings`

All APIs are ready to be integrated with your backend database!

---

## Summary

✅ Created 9 new API endpoints
✅ Updated AuthService with all new methods
✅ Updated settings page to use individual notification APIs
✅ Added comprehensive API documentation
✅ All code compiled successfully
✅ Ready for backend database integration
