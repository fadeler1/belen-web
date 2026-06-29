import { AUTH_EVENTS, AUTH_SESSION_VALIDATION_TTL_MS } from "../config";
import { AuthApiError } from "../errors";
import type { IAuthApi } from "../ports/IAuthApi";
import type { IAuthStorage } from "../ports/IAuthStorage";
import type { IDeviceIdProvider } from "../ports/IDeviceIdProvider";
import type {
  AuthSession,
  AuthUser,
  LoginCredentials,
  LoginResponse,
  RegisterCredentials,
  RegisteredUser,
  SessionValidationResult,
  UpdateProfileRequest,
  UserProfile,
} from "../types";

interface ValidationCache {
  accessToken: string | null;
  result: SessionValidationResult | null;
  profile: UserProfile | null;
  validatedAt: number;
  inFlight: Promise<SessionValidationResult> | null;
}

function usersEqual(a: AuthUser | null, b: AuthUser): boolean {
  return (
    a?.id === b.id &&
    a?.email === b.email &&
    a?.fullName === b.fullName &&
    a?.role === b.role
  );
}

export class AuthService {
  private validationCache: ValidationCache = {
    accessToken: null,
    result: null,
    profile: null,
    validatedAt: 0,
    inFlight: null,
  };

  constructor(
    private readonly api: IAuthApi,
    private readonly storage: IAuthStorage,
    private readonly deviceIdProvider: IDeviceIdProvider
  ) {}

  getCurrentUser(): AuthUser | null {
    return this.storage.getUser();
  }

  getSession(): AuthSession | null {
    return this.storage.getSession();
  }

  getDeviceRegistration() {
    return this.deviceIdProvider.getRegistration();
  }

  getCachedProfile(): UserProfile | null {
    const session = this.storage.getSession();
    if (!session || !this.isValidationCacheFresh(session.accessToken)) {
      return null;
    }
    return this.validationCache.profile;
  }

  async validateSession(options?: { force?: boolean }): Promise<SessionValidationResult> {
    const session = this.storage.getSession();
    if (!session) {
      this.clearValidationCache();
      return { valid: false, user: null, profile: null };
    }

    const force = options?.force === true;
    const token = session.accessToken;

    if (
      !force &&
      this.isValidationCacheFresh(token) &&
      this.validationCache.result
    ) {
      return this.validationCache.result;
    }

    if (!force && this.validationCache.inFlight && this.validationCache.accessToken === token) {
      return this.validationCache.inFlight;
    }

    const validationPromise = this.fetchAndValidateSession(session);
    this.validationCache.inFlight = validationPromise;
    this.validationCache.accessToken = token;

    try {
      return await validationPromise;
    } finally {
      if (this.validationCache.inFlight === validationPromise) {
        this.validationCache.inFlight = null;
      }
    }
  }

  async register(credentials: RegisterCredentials): Promise<RegisteredUser> {
    return this.api.register({
      email: credentials.email.trim().toLowerCase(),
      password: credentials.password,
      fullName: credentials.fullName.trim(),
      rut: credentials.rut.trim(),
      role: "user",
    });
  }

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const deviceId = this.deviceIdProvider.getOrCreate();
    const guestSessionToken = this.storage.getGuestSessionToken() ?? undefined;

    const response = await this.api.login({
      email: credentials.email.trim().toLowerCase(),
      password: credentials.password,
      deviceId,
      ...(guestSessionToken ? { guestSessionToken } : {}),
    });

    this.persistLogin(response);
    return response;
  }

  async registerAndLogin(credentials: RegisterCredentials): Promise<LoginResponse> {
    await this.register(credentials);
    return this.login({
      email: credentials.email,
      password: credentials.password,
    });
  }

  logout(): void {
    const session = this.storage.getSession();
    const deviceId = this.deviceIdProvider.getOrCreate();

    this.storage.clearSession();
    this.clearValidationCache();
    this.notifyAuthChanged();

    if (session?.accessToken) {
      void this.api.logout(session.accessToken, { deviceId }).catch(() => {
        // La sesión local ya fue cerrada.
      });
    }
  }

  async updateProfile(data: UpdateProfileRequest): Promise<UserProfile> {
    const session = this.storage.getSession();
    if (!session) {
      throw new AuthApiError("Tu sesión no es válida. Inicia sesión nuevamente.", 401);
    }

    const profile = await this.api.updateUser(
      session.accessToken,
      session.user.id,
      data
    );
    const user = this.mapProfileToUser(profile);
    this.storage.updateUser(user);
    this.setValidationCache(session.accessToken, {
      valid: true,
      user,
      profile,
    });
    this.notifyAuthChanged();
    return profile;
  }

  private async fetchAndValidateSession(
    session: AuthSession
  ): Promise<SessionValidationResult> {
    try {
      const profile = await this.api.getProfile(session.accessToken);
      const user = this.mapProfileToUser(profile);
      const previousUser = this.storage.getUser();
      this.storage.updateUser(user);

      const result: SessionValidationResult = { valid: true, user, profile };
      this.setValidationCache(session.accessToken, result);

      if (!usersEqual(previousUser, user)) {
        this.notifyAuthChanged();
      }

      return result;
    } catch (error) {
      if (error instanceof AuthApiError && error.statusCode === 401) {
        return this.tryRefreshSession(session);
      }

      const invalid: SessionValidationResult = {
        valid: false,
        user: null,
        profile: null,
      };
      this.setValidationCache(session.accessToken, invalid);
      return invalid;
    }
  }

  private async tryRefreshSession(
    session: AuthSession
  ): Promise<SessionValidationResult> {
    try {
      const refreshed = await this.api.refreshToken({
        refreshToken: session.refreshToken,
        deviceId: this.deviceIdProvider.getOrCreate(),
      });

      this.storage.updateTokens(
        refreshed.accessToken,
        refreshed.refreshToken,
        refreshed.expiresIn
      );

      const profile = await this.api.getProfile(refreshed.accessToken);
      const user = this.mapProfileToUser(profile);
      this.storage.updateUser(user);

      const result: SessionValidationResult = { valid: true, user, profile };
      this.setValidationCache(refreshed.accessToken, result);
      this.notifyAuthChanged();

      return result;
    } catch {
      this.storage.clearSession();
      this.clearValidationCache();
      this.notifyAuthChanged();
      return { valid: false, user: null, profile: null };
    }
  }

  private isValidationCacheFresh(accessToken: string): boolean {
    if (
      this.validationCache.accessToken !== accessToken ||
      !this.validationCache.result?.valid
    ) {
      return false;
    }

    return Date.now() - this.validationCache.validatedAt < AUTH_SESSION_VALIDATION_TTL_MS;
  }

  private setValidationCache(
    accessToken: string,
    result: SessionValidationResult
  ): void {
    this.validationCache = {
      accessToken,
      result,
      profile: result.profile,
      validatedAt: Date.now(),
      inFlight: null,
    };
  }

  private clearValidationCache(): void {
    this.validationCache = {
      accessToken: null,
      result: null,
      profile: null,
      validatedAt: 0,
      inFlight: null,
    };
  }

  private mapProfileToUser(profile: UserProfile): AuthUser {
    return {
      id: profile._id,
      email: profile.email,
      fullName: profile.fullName,
      role: profile.role,
    };
  }

  private persistLogin(response: LoginResponse): void {
    this.clearValidationCache();
    this.deviceIdProvider.recordLogin();
    this.storage.saveSession({
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
      expiresIn: response.expiresIn,
      user: response.user,
      cart: response.cart,
    });
    this.setValidationCache(response.accessToken, {
      valid: true,
      user: response.user,
      profile: {
        _id: response.user.id,
        email: response.user.email,
        fullName: response.user.fullName,
        role: response.user.role,
      },
    });
    this.notifyAuthChanged();
  }

  private notifyAuthChanged(): void {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event(AUTH_EVENTS.changed));
    }
  }
}
