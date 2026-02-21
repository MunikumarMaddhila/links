import axios from "axios";

// For backend API calls (proxied through env)
export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true  // Important: Allow cookies in requests and responses
});

// For frontend-only API calls (like /api/files/upload)
// This bypasses the baseURL and calls the frontend's local API
export const localHttp = axios.create({
  withCredentials: true  // Important: Allow cookies in requests and responses
});

// REQUEST → handle credentials and FormData
http.interceptors.request.use((config) => {
  // Token is sent via httpOnly cookie automatically
  config.withCredentials = true;
  
  // Don't set Content-Type header for FormData - let axios handle it
  // This allows axios to properly set multipart/form-data with boundary
  if (!(config.data instanceof FormData)) {
    // Only set default Content-Type for non-FormData requests
    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }
  } else {
    // Remove Content-Type header for FormData to let axios auto-set it
    delete config.headers["Content-Type"];
  }
  
  return config;
});

// Same handling for localHttp
localHttp.interceptors.request.use((config) => {
  config.withCredentials = true;
  
  if (!(config.data instanceof FormData)) {
    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }
  } else {
    delete config.headers["Content-Type"];
  }
  
  return config;
});

// RESPONSE → handle auth errors (both http clients)
const errorHandler = (err: any) => {
  if (err.response?.status === 401) {
    // Redirect to login on unauthorized
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  }
  return Promise.reject(err);
};

http.interceptors.response.use(
  (res) => res,
  errorHandler
);

localHttp.interceptors.response.use(
  (res) => res,
  errorHandler
);
