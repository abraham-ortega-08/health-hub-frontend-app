import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

const CONTENT_TYPE = "application/json";
const ACCEPT = "application/json";
const DATASOURCE = "develop";

export const apiBaseURL =
  process.env.NEXT_PUBLIC_API_BACKEND_URL || "http://localhost:3000";

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: `${apiBaseURL}/`,
});

// Request interceptor
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // Add Bearer token if available (adjust based on your auth implementation)
  const token = localStorage.getItem("token"); // or use your auth state management
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data; // Return the data directly
  },
  async (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem("token");
      window.location.href = "/auth";
    }
    return Promise.reject(error?.response?.data || error);
  }
);

// Set default headers
api.defaults.headers.post["Content-Type"] = CONTENT_TYPE;
api.defaults.headers.common["Accept"] = ACCEPT;

if (process.env.NODE_ENV !== "production") {
  api.defaults.headers.common["x-Data-Source"] = DATASOURCE;
}

/**
 * Helper to get common API headers (for fetch calls that need streaming)
 */
export const getApiHeaders = (additionalHeaders?: HeadersInit): HeadersInit => {
  const headers: Record<string, string> = {
    ...(additionalHeaders as Record<string, string> || {}),
  };

  if (typeof localStorage !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    headers['x-Data-Source'] = DATASOURCE;
  }

  return headers;
};

/**
 * Fetch wrapper for streaming requests (SSE) with axios configuration
 * Use this for endpoints that need ReadableStream access
 */
export const streamingFetch = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  const headers = getApiHeaders(options.headers);
  
  const response = await fetch(`${apiBaseURL}${endpoint}`, {
    ...options,
    headers,
  });

  // Handle 401 like axios interceptor
  if (response.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/auth";
  }

  return response;
};

export default api;
