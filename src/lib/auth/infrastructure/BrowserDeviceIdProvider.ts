import { AUTH_STORAGE_KEYS } from "../config";
import { detectDeviceContext } from "../device/detectDeviceContext";
import type { IDeviceIdProvider } from "../ports/IDeviceIdProvider";
import type { DeviceChannel, DeviceRegistration } from "../types";

export class BrowserDeviceIdProvider implements IDeviceIdProvider {
  getOrCreate(): string {
    if (typeof window === "undefined") {
      return "server-placeholder";
    }

    const existing = localStorage.getItem(AUTH_STORAGE_KEYS.deviceId);
    if (existing) return existing;

    const context = detectDeviceContext();
    const deviceId = this.createDeviceId(context.channel);
    const registration: DeviceRegistration = {
      deviceId,
      channel: context.channel,
      platform: context.platform,
      browser: context.browser,
      userAgent: context.userAgent,
      registeredAt: new Date().toISOString(),
      lastLoginAt: null,
    };

    localStorage.setItem(AUTH_STORAGE_KEYS.deviceId, deviceId);
    localStorage.setItem(AUTH_STORAGE_KEYS.deviceInfo, JSON.stringify(registration));
    return deviceId;
  }

  getRegistration(): DeviceRegistration | null {
    if (typeof window === "undefined") return null;

    const raw = localStorage.getItem(AUTH_STORAGE_KEYS.deviceInfo);
    if (!raw) {
      const deviceId = localStorage.getItem(AUTH_STORAGE_KEYS.deviceId);
      if (!deviceId) return null;

      const context = detectDeviceContext();
      return {
        deviceId,
        channel: context.channel,
        platform: context.platform,
        browser: context.browser,
        userAgent: context.userAgent,
        registeredAt: new Date().toISOString(),
        lastLoginAt: null,
      };
    }

    try {
      return JSON.parse(raw) as DeviceRegistration;
    } catch {
      return null;
    }
  }

  recordLogin(): void {
    if (typeof window === "undefined") return;

    const deviceId = this.getOrCreate();
    const context = detectDeviceContext();
    const current = this.getRegistration();
    const registration: DeviceRegistration = {
      deviceId,
      channel: context.channel,
      platform: context.platform,
      browser: context.browser,
      userAgent: context.userAgent,
      registeredAt: current?.registeredAt ?? new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
    };

    localStorage.setItem(AUTH_STORAGE_KEYS.deviceId, deviceId);
    localStorage.setItem(AUTH_STORAGE_KEYS.deviceInfo, JSON.stringify(registration));
  }

  private createDeviceId(channel: DeviceChannel): string {
    const suffix =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : String(Date.now());

    return `belen-${channel}-${suffix}`;
  }
}
