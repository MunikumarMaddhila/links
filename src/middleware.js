import { NextResponse } from "next/server";

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Protected ROUTES requiring authentication (page routes)
  const protectedRoutes = ["/dashboard", "/admin", "/super-admin", "/settings", "/profile"];
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));
  
  // Debug: Log all cookies received
  const allCookies = Array.from(request.cookies).map(([key, value]) => `${key}=${value.value.substring(0, 20)}...`).join(", ");
  console.log(`[Middleware] Path: ${pathname}, Cookies: ${allCookies || "NONE FOUND"}`);
  
  // Check for auth token in cookies (set by /api/auth/login)
  const authToken = request.cookies.get("accessToken")?.value || 
                    request.cookies.get("l_access_token")?.value || 
                    request.cookies.get("authToken")?.value;
  
  console.log(`[Middleware] Auth Token Found: ${authToken ? "Yes" : "No"}`);
  
  // Enforce authentication on protected page routes
  // Note: API endpoints have their own token verification via verifyToken() utility
  if (isProtectedRoute && !authToken) {
    console.log(`[Middleware] ❌ Blocking ${pathname} - no token found, redirecting to /`);
    return NextResponse.redirect(new URL("/", request.url));
  }
  
  if (isProtectedRoute && authToken) {
    console.log(`[Middleware] ✅ Allowing ${pathname} - token found`);
  }
  
  return NextResponse.next();

  // Legacy code below (commented out)
  //   return NextResponse.next();
  //   const response = NextResponse.next();
  // const access_token = response.cookies.get("l_access_token")?.value;
  // const refresh_token = response.cookies.get("l_refresh_token")?.value;
  // const userCookie = response.cookies.get("l_user_deail");
  // const userData = userCookie?.value ? JSON.parse(userCookie.value) : null;

  //  const token = req.cookies.get("token")?.value;
  //  console.log("token",token);
  // console.log("access_token_middleware",access_token);
  // const { pathname } = request.nextUrl;
  // const basePath = request.nextUrl.basePath || ""; // auto set by Next.js if basePath is in config

  // // Strip basePath for internal logic
  // const relativePath = pathname.replace(basePath, "") || "/";

  // const protectedRoutes = ["/dashboard", "/super-admin", "/admin"];
  // const isProtected = protectedRoutes.some((route) =>
  //   relativePath.startsWith(route),
  // );

  // // 1. Redirect root to login
  // if (relativePath === "/") {
  //   return NextResponse.redirect(new URL(`${basePath}/`, request.url));
  // }

  // // 2. Redirect to login if no tokens and accessing protected routes
  // if (!access_token && !refresh_token && isProtected) {
  //   if (relativePath !== "/") {
  //     return NextResponse.redirect(new URL(`${basePath}/`, request.url));
  //   }
  // }

  // // 3. If access token missing but refresh token exists, try to refresh tokens
  // if (!access_token && refresh_token) {
  //   try {
  //     const refreshResponse = await fetch(
  //       `${process.env.API_URL}api/auth/refresh`,
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ refresh_token }),
  //       },
  //     );

  //     if (refreshResponse.ok) {
  //       const refreshedData = await refreshResponse.json();

  //       const response = NextResponse.redirect(new URL(request.url)); // Reload same URL

  //       response.cookies.set("l_access_token", refreshedData?.access_token, {
  //         httpOnly: true,
  //         maxAge: 15 * 60, // 15 mins
  //         path: "/",
  //         sameSite: "Strict",
  //         secure: true,
  //       });

  //       response.cookies.set("l_refresh_token", refreshedData?.refresh_token, {
  //         httpOnly: true,
  //         maxAge: 60 * 60, // 1 hour or as needed
  //         path: "/",
  //         sameSite: "Strict",
  //         secure: true,
  //       });

  //       if (refreshedData.data) {
  //         response.cookies.set(
  //           "l_user_deail",
  //           JSON.stringify(refreshedData.data),
  //           {
  //             httpOnly: false,
  //             maxAge: 24 * 60 * 60, // 24 hours
  //             path: "/",
  //           },
  //         );
  //       }

  //       return response;
  //     } else {
  //       // Token refresh failed — cleanup
  //       const response = NextResponse.redirect(
  //         new URL(`${basePath}/login`, request.url),
  //       );
  //       response.cookies.delete("l_access_token");
  //       response.cookies.delete("l_refresh_token");
  //       response.cookies.delete("l_user_deail");
  //       return response;
  //     }
  //   } catch (error) {
  //     const response = NextResponse.redirect(
  //       new URL(`${basePath}/`, request.url),
  //     );
  //     response.cookies.delete("l_access_token");
  //     response.cookies.delete("l_refresh_token");
  //     response.cookies.delete("l_user_deail");
  //     return response;
  //   }
  // }

  // // 4. Redirect authenticated users away from / or /login to role-based home
  // if (
  //   userCookie &&
  //   access_token &&
  //   (relativePath === "/")
  // ) {
  //   const defaultHome = `${basePath}/home`;
  //   const roleBasedRedirect =
  //     userData?.user_type === "super-admin"
  //       ? `${basePath}/super-admin`
  //       : userData?.user_type === "admin"
  //         ? `${basePath}/admin`
  //         : defaultHome;

  //   if (pathname !== roleBasedRedirect) {
  //     return NextResponse.redirect(new URL(roleBasedRedirect, request.url));
  //   }
  // }

  // // 5. Role-based access enforcement
  // if (userCookie && access_token && userData?.user_type) {
  //   if (
  //     userData.user_type === "SUPER_ADMIN" &&
  //     relativePath.startsWith("/super-admin")
  //   ) {
  //     if (relativePath !== "/super-admin") {
  //       return NextResponse.redirect(
  //         new URL(`${basePath}/super-admin`, request.url),
  //       );
  //     }
  //   }

  //   if (
  //     userData.user_type === "ADMIN" &&
  //     (relativePath.startsWith("/admin"))
  //   ) {
  //     if (relativePath !== "/admin") {
  //       return NextResponse.redirect(
  //         new URL(`${basePath}/admin`, request.url),
  //       );
  //     }
  //   }

  //   if (
  //     userData.user_type !== "USER" &&
  //     (relativePath.startsWith("/dashboard") )
  //   ) {
  //     if (relativePath !== "/dashboard") {
  //       return NextResponse.redirect(new URL(`${basePath}/dashboard`, request.url));
  //     }
  //   }
  // }

  // return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/super-admin/:path*",
    "/admin/:path*",
    "/settings/:path*",
    "/profile/:path*"
  ],
};
