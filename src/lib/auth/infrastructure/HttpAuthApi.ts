import { getAuthApiUrl } from "../config";
import { AuthApiError, parseApiErrorMessage } from "../errors";
import type { IAuthApi } from "../ports/IAuthApi";
import type {
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  RegisterUserRequest,
  RegisteredUser,
  LogoutRequest,
  UserProfile,
  UpdateProfileRequest,
} from "../types";

export class HttpAuthApi implements IAuthApi {
  constructor(private readonly baseUrl: string = getAuthApiUrl()) {}

  async register(data: RegisterUserRequest): Promise<RegisteredUser> {
    return this.request<RegisteredUser>("/users", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async login(data: LoginRequest): Promise<LoginResponse> {
    return this.request<LoginResponse>("/auth/login", {
      method: "POST",
      headers: {
        "User-Agent": this.resolveUserAgent(),
      },
      body: JSON.stringify(data),
    });
  }

  async getProfile(accessToken: string): Promise<UserProfile> {
    return this.request<UserProfile>("/auth/me", {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  }

  async refreshToken(data: RefreshTokenRequest): Promise<RefreshTokenResponse> {
    return this.request<RefreshTokenResponse>("/auth/refresh", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateUser(
    accessToken: string,
    userId: string,
    data: UpdateProfileRequest
  ): Promise<UserProfile> {
    return this.request<UserProfile>(`/users/${userId}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${accessToken}` },
      body: JSON.stringify(data),
    });
  }

  async logout(accessToken: string, data: LogoutRequest): Promise<void> {
    await this.request<void>("/auth/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "User-Agent": this.resolveUserAgent(),
      },
      body: JSON.stringify(data),
    });
  }

  private resolveUserAgent(): string {
    if (typeof navigator !== "undefined" && navigator.userAgent) {
      return navigator.userAgent;
    }
    return "BelenExpress-Web/1.0";
  }

  private async request<T>(path: string, init: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(init.headers ?? {}),
      },
    });

    const payload = await this.parseJson(response);

    if (!response.ok) {
      throw new AuthApiError(parseApiErrorMessage(payload), response.status);
    }

    return payload as T;
  }

  private async parseJson(response: Response): Promise<unknown> {
    try {
      return await response.json();
    } catch {
      return null;
    }
  }
}
