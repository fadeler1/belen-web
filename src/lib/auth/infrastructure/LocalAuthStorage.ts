import { AUTH_STORAGE_KEYS } from "../config";
import type { IAuthStorage } from "../ports/IAuthStorage";
import type { AuthSession, AuthUser } from "../types";

export class LocalAuthStorage implements IAuthStorage {
  getUser(): AuthUser | null {
    return this.getSession()?.user ?? null;
  }

  getSession(): AuthSession | null {
    if (typeof window === "undefined") return null;

    try {
      const accessToken = localStorage.getItem(AUTH_STORAGE_KEYS.accessToken);
      const refreshToken = localStorage.getItem(AUTH_STORAGE_KEYS.refreshToken);
      const userRaw = localStorage.getItem(AUTH_STORAGE_KEYS.user);
      const cartRaw = localStorage.getItem(AUTH_STORAGE_KEYS.cart);

      if (!accessToken || !refreshToken || !userRaw || !cartRaw) {
        return null;
      }

      const user = JSON.parse(userRaw) as AuthUser;
      const cart = JSON.parse(cartRaw) as AuthSession["cart"];

      if (!user?.id || !user?.fullName) {
        return null;
      }

      return {
        accessToken,
        refreshToken,
        expiresIn: 900,
        user,
        cart,
      };
    } catch {
      return null;
    }
  }

  saveSession(session: AuthSession): void {
    localStorage.setItem(AUTH_STORAGE_KEYS.accessToken, session.accessToken);
    localStorage.setItem(AUTH_STORAGE_KEYS.refreshToken, session.refreshToken);
    localStorage.setItem(AUTH_STORAGE_KEYS.user, JSON.stringify(session.user));
    localStorage.setItem(AUTH_STORAGE_KEYS.cart, JSON.stringify(session.cart));
    localStorage.removeItem(AUTH_STORAGE_KEYS.guestSessionToken);
  }

  updateTokens(accessToken: string, refreshToken: string, expiresIn: number): void {
    localStorage.setItem(AUTH_STORAGE_KEYS.accessToken, accessToken);
    localStorage.setItem(AUTH_STORAGE_KEYS.refreshToken, refreshToken);
    void expiresIn;
  }

  updateUser(user: AuthUser): void {
    localStorage.setItem(AUTH_STORAGE_KEYS.user, JSON.stringify(user));
  }

  clearSession(): void {
    localStorage.removeItem(AUTH_STORAGE_KEYS.accessToken);
    localStorage.removeItem(AUTH_STORAGE_KEYS.refreshToken);
    localStorage.removeItem(AUTH_STORAGE_KEYS.user);
    localStorage.removeItem(AUTH_STORAGE_KEYS.cart);
  }

  getGuestSessionToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(AUTH_STORAGE_KEYS.guestSessionToken);
  }
}
