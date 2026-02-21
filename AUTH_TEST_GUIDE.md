# Authentication Testing Guide

## Changes Made
✅ Removed localStorage from AuthContext  
✅ Updated http service to use httpOnly cookies  
✅ Added middleware for route protection  
✅ Updated login-modal to work with server-side auth  

## How to Test 3 Login Flows

### Prerequisites
- Backend API must set httpOnly cookie on successful login (e.g., `authToken`, `l_access_token`, or `accessToken`)
- Backend should return `role` in response (string format: "user", "admin", "super_admin" OR object format: {name: "USER"})

### Test Case 1: USER Login
```
Email: user@example.com
Password: password123

Expected:
1. AuthService.login() returns response with user.role = "user" (or {name: "USER"})
2. Backend sets httpOnly cookie with auth token
3. Browser redirects to /dashboard
4. Middleware allows access (authToken cookie present)
5. useAuth() hook returns user data from API call to /api/auth/me
```

### Test Case 2: ADMIN Login
```
Email: admin@example.com
Password: password123

Expected:
1. AuthService.login() returns response with user.role = "admin" (or {name: "ADMIN"})
2. Backend sets httpOnly cookie with auth token
3. Browser redirects to /admin
4. Middleware allows access (authToken cookie present)
5. useAuth() hook returns user data with admin role
6. ProtectedRoute component allows admin-only components to render
```

### Test Case 3: SUPER_ADMIN Login
```
Email: superadmin@example.com
Password: password123

Expected:
1. AuthService.login() returns response with user.role = "super_admin" (or {name: "SUPER_ADMIN"})
2. Backend sets httpOnly cookie with auth token
3. Browser redirects to /super-admin
4. Middleware allows access (authToken cookie present)
5. useAuth() hook returns user data with super_admin role
6. ProtectedRoute component allows super-admin-only components to render
```

## Verification Steps

### 1. Check Browser Network Tab
- Go to login page
- Enter credentials and submit
- Observe request to `/api/auth/login`
- Verify response status is 200 and includes user data
- Check **Cookies** tab → Verify httpOnly cookie is set (e.g., `authToken`, `l_access_token`, or `accessToken`)

### 2. Check Redirect
- After login, verify you're redirected to:
  - `/dashboard` for USER role
  - `/admin` for ADMIN role
  - `/super-admin` for SUPER_ADMIN role

### 3. Check localStorage (should be EMPTY)
- Open DevTools → Application → Storage → Local Storage
- Verify NO `userInfo` or `accessToken` keys exist
- Token should only exist as httpOnly cookie (not visible in DevTools)

### 4. Test Route Protection (Middleware)
- While logged in, visit protected routes → should work
- Logout (browser clears cookie)
- Try to access `/dashboard`, `/admin`, or `/super-admin`
- Should redirect to home (`/`)

### 5. Check useAuth Hook
- In a client component with `"use client"`, call `useAuth()`
- Verify `user` object contains correct role
- Verify `isAuthenticated` is `true` when logged in
- Call `logout()` → should clear user state and redirect

### 6. Check API Credentials
- All API calls to `AuthService` should include credentials
- Backend should validate httpOnly cookie and return user data
- Endpoint: `GET /api/auth/me` should work with just cookie (no Authorization header needed)

## Common Issues & Fixes

### Issue: "useAuth must be used within AuthProvider"
- **Fix:** Ensure component has `"use client"` at top
- **Fix:** Ensure AuthProvider wraps the component (via AppProviders in layout.tsx)

### Issue: User not persisted on refresh
- **Fix:** Ensure `GET /api/auth/me` endpoint exists and returns user data
- **Fix:** Endpoint must check httpOnly cookie for authentication
- **Fix:** Ensure `AuthContext.useEffect()` is calling this endpoint

### Issue: localStorage still being used
- **Check:** Verify http.ts does NOT have `localStorage.get/set`
- **Check:** Verify AuthContext does NOT have `localStorage.get/set`
- **Check:** Verify login-modal does NOT have `localStorage.set`
- **Search:** Use command `Ctrl+Shift+F` → search "localStorage" to find any remaining references

### Issue: Middleware not working
- **Fix:** Ensure `middleware.js` is in `src/` folder (at root level, not in `app/`)
- **Fix:** Verify cookie names match backend: `authToken`, `l_access_token`, or `accessToken`
- **Fix:** Check Next.js version supports middleware (Next.js 12+)

### Issue: Redirect loop
- **Fix:** Ensure login redirect logic checks role correctly (string vs object)
- **Fix:** Ensure ProtectedRoute has `&& !allowedRoles.includes(user.role)` condition (no unconditional redirect)

## Testing Command
```bash
npm run dev
```

Then navigate to:
1. http://localhost:3000 → home page (should work)
2. http://localhost:3000/login → login page
3. Test login with each role
4. Verify redirects and middleware work
5. Test logout
