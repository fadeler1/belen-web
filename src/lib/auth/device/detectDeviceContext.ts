import { AUTH_MOBILE_NAV_BREAKPOINT_PX } from "../config";
import type { DeviceChannel } from "../types";

export interface DeviceContext {
  channel: DeviceChannel;
  platform: string;
  browser: string;
  userAgent: string;
}

/** Canal fijo según layout de navegación: web (desktop) o web-mobile */
export function resolveDeviceChannel(): DeviceChannel {
  if (typeof window === "undefined") return "web";

  const isDesktopNav = window.matchMedia(
    `(min-width: ${AUTH_MOBILE_NAV_BREAKPOINT_PX}px)`
  ).matches;

  return isDesktopNav ? "web" : "web-mobile";
}

function detectBrowser(userAgent: string): string {
  if (userAgent.includes("Edg/")) return "Edge";
  if (userAgent.includes("OPR/") || userAgent.includes("Opera")) return "Opera";
  if (userAgent.includes("Firefox/")) return "Firefox";
  if (userAgent.includes("Chrome/") && !userAgent.includes("Edg/")) return "Chrome";
  if (userAgent.includes("Safari/") && !userAgent.includes("Chrome/")) return "Safari";
  return "Navegador";
}

function detectPlatform(userAgent: string): string {
  if (/iPhone|iPad|iPod/.test(userAgent)) return "iOS";
  if (userAgent.includes("Android")) return "Android";
  if (userAgent.includes("Windows")) return "Windows";
  if (userAgent.includes("Mac OS X") || userAgent.includes("Macintosh")) return "macOS";
  if (userAgent.includes("Linux")) return "Linux";
  return "Desconocido";
}

export function detectDeviceContext(
  userAgent: string = typeof navigator !== "undefined" ? navigator.userAgent : ""
): DeviceContext {
  return {
    channel: resolveDeviceChannel(),
    platform: detectPlatform(userAgent),
    browser: detectBrowser(userAgent),
    userAgent,
  };
}
