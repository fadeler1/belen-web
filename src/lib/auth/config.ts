const DEFAULT_AUTH_API_URL = "https://auth-service-ms.vercel.app";

export function getAuthApiUrl(): string {
  const baseUrl = process.env.NEXT_PUBLIC_AUTH_API_URL ?? DEFAULT_AUTH_API_URL;
  return baseUrl.replace(/\/$/, "");
}

export const AUTH_STORAGE_KEYS = {
  accessToken: "accessToken",
  refreshToken: "refreshToken",
  user: "user",
  cart: "cart",
  deviceId: "deviceId",
  deviceInfo: "deviceInfo",
  guestSessionToken: "guestSessionToken",
} as const;

export const AUTH_EVENTS = {
  changed: "belen:auth-changed",
  openProfile: "belen:open-profile",
} as const;

/** Breakpoint de navegación mobile/desktop (alineado con stylo.css) */
export const AUTH_MOBILE_NAV_BREAKPOINT_PX = 600;

/** Tiempo mínimo entre llamadas a GET /auth/me para la misma sesión */
export const AUTH_SESSION_VALIDATION_TTL_MS = 5 * 60 * 1000;
