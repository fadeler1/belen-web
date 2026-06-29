export { getAuthService, createAuthService } from "./factories/createAuthService";
export { AuthService } from "./services/AuthService";
export { AuthApiError } from "./errors";
export {
  getAuthApiUrl,
  AUTH_STORAGE_KEYS,
  AUTH_EVENTS,
  AUTH_MOBILE_NAV_BREAKPOINT_PX,
} from "./config";
export { resolveDeviceChannel } from "./device/detectDeviceContext";
export type {
  AuthUser,
  AuthSession,
  AuthCart,
  LoginCredentials,
  RegisterCredentials,
  LoginResponse,
  RegisteredUser,
  SessionValidationResult,
  UpdateProfileRequest,
  UserProfile,
  DeviceRegistration,
  DeviceChannel,
} from "./types";
