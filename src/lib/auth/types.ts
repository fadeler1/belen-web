export interface AuthAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault?: boolean;
}

export interface RegisterUserRequest {
  email: string;
  password: string;
  fullName: string;
  rut: string;
  role?: string;
  addresses?: AuthAddress[];
}

export interface RegisteredUser {
  _id: string;
  email: string;
  fullName: string;
  rut: string;
  role: string;
  addresses: AuthAddress[];
  createdAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  deviceId: string;
  guestSessionToken?: string;
}

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  role: string;
}

export interface AuthCart {
  _id: string;
  userId: string;
  items: unknown[];
  status: string;
  updatedAt: string;
  createdAt: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: AuthUser;
  cart: AuthCart;
}

export interface AuthSession {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: AuthUser;
  cart: AuthCart;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  fullName: string;
  rut: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
  deviceId: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export type DeviceChannel = "web" | "web-mobile";

export interface DeviceRegistration {
  deviceId: string;
  channel: DeviceChannel;
  platform: string;
  browser: string;
  userAgent: string;
  registeredAt: string;
  lastLoginAt: string | null;
}

export interface LogoutRequest {
  deviceId: string;
  sessionId?: string;
}

export interface UserProfile {
  _id: string;
  email: string;
  fullName: string;
  rut?: string;
  role: string;
  addresses?: AuthAddress[];
  createdAt?: string;
}

export interface SessionValidationResult {
  valid: boolean;
  user: AuthUser | null;
  profile: UserProfile | null;
}

export interface UpdateProfileRequest {
  fullName?: string;
  rut?: string;
  email?: string;
  password?: string;
}
