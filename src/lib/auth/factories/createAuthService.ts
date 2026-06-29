import { HttpAuthApi } from "../infrastructure/HttpAuthApi";
import { LocalAuthStorage } from "../infrastructure/LocalAuthStorage";
import { BrowserDeviceIdProvider } from "../infrastructure/BrowserDeviceIdProvider";
import { AuthService } from "../services/AuthService";

let authServiceInstance: AuthService | null = null;

export function createAuthService(): AuthService {
  return new AuthService(
    new HttpAuthApi(),
    new LocalAuthStorage(),
    new BrowserDeviceIdProvider()
  );
}

export function getAuthService(): AuthService {
  if (!authServiceInstance) {
    authServiceInstance = createAuthService();
  }
  return authServiceInstance;
}
