# Settings & Profile APIs - Complete Documentation

## Overview
This document outlines all the APIs for managing user settings, profile information, notifications, and account security.

---

## 1. PROFILE IMAGE UPLOAD & SAVE

### Endpoint: `POST /api/users/profile/image`
**Purpose**: Upload and save profile image to database
**Authentication**: Required (httpOnly cookie: `accessToken`)
**Content-Type**: `multipart/form-data` or `application/json`

#### Option A: FormData Upload
```bash
POST /api/users/profile/image HTTP/1.1
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary

------WebKitFormBoundary
Content-Disposition: form-data; name="image"; filename="profile.jpg"
Content-Type: image/jpeg

[binary image data]
------WebKitFormBoundary--
```

#### Option B: Base64 JSON
```json
POST /api/users/profile/image
{
  "imageBase64": "data:image/jpeg;base64,/9j/4AAQSkZJRg...",
  "imageName": "profile-picture.jpg"
}
```

#### Success Response (200)
```json
{
  "message": "Profile image saved successfully",
  "data": {
    "userId": "user-123",
    "imageUrl": "https://your-cdn.com/profile-images/profile-picture.jpg",
    "imageName": "profile-picture.jpg",
    "size": 245632,
    "savedAt": "2026-02-15T10:30:00Z"
  }
}
```

#### Error Responses
- **400**: File size > 2MB or invalid file type
- **401**: Unauthorized - missing/invalid token
- **500**: Server error

---

#### Endpoint: `GET /api/users/profile/image`
**Purpose**: Retrieve current profile image
**Response**: Current image URL and metadata

#### Endpoint: `DELETE /api/users/profile/image`
**Purpose**: Delete profile image
**Response**: Success message

---

## 2. EMAIL NOTIFICATIONS API

### Endpoint: `PATCH /api/email_notification`
**Purpose**: Toggle email notifications on/off
**Authentication**: Required (httpOnly cookie: `accessToken`)
**Content-Type**: `application/json`

#### Request
```json
{
  "enabled": true
}
```

#### Success Response (200)
```json
{
  "message": "Email notification preference updated successfully",
  "data": {
    "userId": "user-123",
    "emailNotificationEnabled": true,
    "updatedAt": "2026-02-15T10:30:00Z"
  }
}
```

#### Error Responses
- **400**: Invalid `enabled` value (must be boolean)
- **401**: Unauthorized
- **500**: Server error

---

#### Endpoint: `GET /api/email_notification`
**Purpose**: Get current email notification status
**Response**: Current enabled state

---

## 3. WEEKLY REPORT API

### Endpoint: `PATCH /api/weekly_report`
**Purpose**: Toggle weekly report emails on/off
**Authentication**: Required (httpOnly cookie: `accessToken`)
**Content-Type**: `application/json`

#### Request
```json
{
  "enabled": true
}
```

#### Success Response (200)
```json
{
  "message": "Weekly report preference updated successfully",
  "data": {
    "userId": "user-123",
    "weeklyReportEnabled": true,
    "updatedAt": "2026-02-15T10:30:00Z"
  }
}
```

#### Error Responses
- **400**: Invalid `enabled` value (must be boolean)
- **401**: Unauthorized
- **500**: Server error

---

#### Endpoint: `GET /api/weekly_report`
**Purpose**: Get current weekly report status
**Response**: Current enabled state

---

## 4. MARKETING EMAILS API

### Endpoint: `PATCH /api/market_email`
**Purpose**: Toggle marketing emails on/off
**Authentication**: Required (httpOnly cookie: `accessToken`)
**Content-Type**: `application/json`

#### Request
```json
{
  "enabled": false
}
```

#### Success Response (200)
```json
{
  "message": "Marketing email preference updated successfully",
  "data": {
    "userId": "user-123",
    "marketingEmailEnabled": false,
    "updatedAt": "2026-02-15T10:30:00Z"
  }
}
```

#### Error Responses
- **400**: Invalid `enabled` value (must be boolean)
- **401**: Unauthorized
- **500**: Server error

---

#### Endpoint: `GET /api/market_email`
**Purpose**: Get current marketing email status
**Response**: Current enabled state

---

## 5. PASSWORD CHANGE API

### Endpoint: `PATCH /api/password` or `POST /api/password`
**Purpose**: Change user password
**Authentication**: Required (httpOnly cookie: `accessToken`)
**Content-Type**: `application/json`

#### Request
```json
{
  "currentPassword": "oldPassword123",
  "newPassword": "newSecurePassword456",
  "confirmPassword": "newSecurePassword456"
}
```

#### Validation Rules
- `currentPassword`: Required, non-empty
- `newPassword`: Required, minimum 8 characters
- `confirmPassword`: Must match `newPassword`
- New password must be different from current password

#### Success Response (200)
```json
{
  "message": "Password changed successfully",
  "data": {
    "userId": "user-123",
    "message": "Password changed successfully",
    "changedAt": "2026-02-15T10:30:00Z"
  }
}
```

#### Error Responses
- **400**: Missing required fields, passwords don't match, or validation failed
- **401**: Unauthorized - missing/invalid token
- **500**: Server error

#### Error Details
```json
{
  "message": "New password must be at least 8 characters long",
  "status": 400
}
```

---

## 6. PROFILE API (Existing)

### Endpoint: `PATCH /api/users/profile`
**Purpose**: Update user profile information
**Authentication**: Required (httpOnly cookie: `accessToken`)
**Content-Type**: `application/json`

#### Request
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "username": "@johndoe",
  "bio": "Software Developer"
}
```

#### Success Response (200)
```json
{
  "message": "Profile updated successfully",
  "user": {
    "id": "mock-user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "username": "@johndoe",
    "bio": "Software Developer",
    "updatedAt": "2026-02-15T10:30:00Z"
  }
}
```

---

## 7. NOTIFICATIONS API (Bulk Update - Existing)

### Endpoint: `PATCH /api/users/settings/notifications`
**Purpose**: Update all notification settings at once (alternative to individual endpoints)
**Authentication**: Required (httpOnly cookie: `accessToken`)
**Content-Type**: `application/json`

#### Request
```json
{
  "emailNotifications": true,
  "weeklyReport": true,
  "marketingEmails": false
}
```

#### Success Response (200)
```json
{
  "message": "Notification settings updated successfully",
  "settings": {
    "emailNotifications": true,
    "weeklyReport": true,
    "marketingEmails": false,
    "updatedAt": "2026-02-15T10:30:00Z"
  }
}
```

---

## Frontend Integration Examples

### Using AuthService Methods

```typescript
// Individual notification APIs
await AuthService.updateEmailNotification(true);
await AuthService.updateWeeklyReport(true);
await AuthService.updateMarketingEmail(false);

// Get notification status
const emailStatus = await AuthService.getEmailNotificationStatus();
const weeklyStatus = await AuthService.getWeeklyReportStatus();
const marketingStatus = await AuthService.getMarketingEmailStatus();

// Change password
await AuthService.changePassword({
  currentPassword: "oldPass",
  newPassword: "newPass",
  confirmPassword: "newPass"
});

// Upload profile image
const formData = new FormData();
formData.append("image", fileInput.files[0]);
await AuthService.uploadProfileImage(formData);
```

---

## Database Schema Requirements (Backend TODO)

### Users Table Additions
```sql
ALTER TABLE users ADD COLUMN (
  profile_image VARCHAR(500),
  email_notification BOOLEAN DEFAULT true,
  weekly_report BOOLEAN DEFAULT true,
  marketing_email BOOLEAN DEFAULT false,
  password_changed_at TIMESTAMP,
  last_login TIMESTAMP
);

CREATE TABLE user_notifications (
  id UUID PRIMARY KEY,
  user_id UUID FOREIGN KEY REFERENCES users(id),
  email_notification BOOLEAN DEFAULT true,
  weekly_report BOOLEAN DEFAULT true,
  marketing_email BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id)
);

CREATE TABLE user_profile_images (
  id UUID PRIMARY KEY,
  user_id UUID FOREIGN KEY REFERENCES users(id),
  image_url VARCHAR(500),
  image_name VARCHAR(255),
  file_size INT,
  mime_type VARCHAR(50),
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id)
);
```

---

## TODO: Backend Implementation Checklist

### Profile Image Upload
- [ ] Extract `userId` from JWT token
- [ ] Save image to Cloud Storage (S3, Azure Blob, etc.)
- [ ] Update `users.profile_image` with image URL
- [ ] Return actual image URL in response
- [ ] Implement image validation and optimization

### Email Notifications
- [ ] Extract `userId` from JWT token
- [ ] Update `user_notifications.email_notification` in database
- [ ] Validate enabled/disabled state
- [ ] Log preference change event

### Weekly Report
- [ ] Extract `userId` from JWT token
- [ ] Update `user_notifications.weekly_report` in database
- [ ] Schedule weekly email job if enabled
- [ ] Log preference change event

### Marketing Emails
- [ ] Extract `userId` from JWT token
- [ ] Update `user_notifications.marketing_email` in database
- [ ] Add/remove user from marketing email list
- [ ] Log preference change event

### Password Change
- [ ] Extract `userId` from JWT token
- [ ] Verify current password matches stored hash
- [ ] Hash new password
- [ ] Update `users.password_hash` in database
- [ ] Update `users.password_changed_at` timestamp
- [ ] Invalidate all other sessions (optional but recommended)
- [ ] Log password change event for security
- [ ] Send confirmation email

### Profile Data
- [ ] Extract `userId` from JWT token
- [ ] Update `users.name`, `users.email`, `users.bio` as provided
- [ ] Validate email format and uniqueness
- [ ] Return updated user object

---

## Security Considerations

1. **Token Verification**: All endpoints require valid `accessToken` cookie
2. **Password**: Should be hashed with bcrypt or similar before storage
3. **Rate Limiting**: Implement rate limiting on password change and file upload
4. **File Upload**: 
   - Validate file type and size
   - Scan for malware before storing
   - Store outside web root
5. **Notifications**: Log all preference changes for compliance (GDPR, etc.)
6. **Session Invalidation**: Consider invalidating all sessions after password change

---

## Testing Endpoints with cURL

### Change Password
```bash
curl -X PATCH http://localhost:3000/api/password \
  -H "Content-Type: application/json" \
  -d '{
    "currentPassword": "oldPass123",
    "newPassword": "newPass456",
    "confirmPassword": "newPass456"
  }'
```

### Toggle Email Notification
```bash
curl -X PATCH http://localhost:3000/api/email_notification \
  -H "Content-Type: application/json" \
  -d '{"enabled": true}'
```

### Upload Profile Image (FormData)
```bash
curl -X POST http://localhost:3000/api/users/profile/image \
  -F "image=@/path/to/image.jpg"
```

---

## Response Status Codes Reference

| Code | Meaning |
|------|---------|
| 200  | Success |
| 400  | Bad Request (validation error) |
| 401  | Unauthorized (missing/invalid token) |
| 404  | Not Found |
| 500  | Server Error |

---

## Notes

- All timestamps are in ISO 8601 format
- All `userId` values in responses are placeholders - extract from JWT token in backend
- Replace `https://your-cdn.com` with actual CDN URL
- Implement proper error logging on backend
- Consider adding audit trails for security-sensitive operations
