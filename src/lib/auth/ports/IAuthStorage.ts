import type { AuthSession, AuthUser } from "../types";

export interface IAuthStorage {
  getUser(): AuthUser | null;
  getSession(): AuthSession | null;
  saveSession(session: AuthSession): void;
  updateTokens(accessToken: string, refreshToken: string, expiresIn: number): void;
  updateUser(user: AuthUser): void;
  clearSession(): void;
  getGuestSessionToken(): string | null;
}
