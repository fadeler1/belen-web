import type {
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  RegisterUserRequest,
  RegisteredUser,
  LogoutRequest,
  UpdateProfileRequest,
  UserProfile,
} from "../types";

export interface IAuthApi {
  register(data: RegisterUserRequest): Promise<RegisteredUser>;
  login(data: LoginRequest): Promise<LoginResponse>;
  getProfile(accessToken: string): Promise<UserProfile>;
  refreshToken(data: RefreshTokenRequest): Promise<RefreshTokenResponse>;
  updateUser(
    accessToken: string,
    userId: string,
    data: UpdateProfileRequest
  ): Promise<UserProfile>;
  logout(accessToken: string, data: LogoutRequest): Promise<void>;
}
