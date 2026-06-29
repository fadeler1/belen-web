import type { DeviceRegistration } from "../types";

export interface IDeviceIdProvider {
  getOrCreate(): string;
  getRegistration(): DeviceRegistration | null;
  recordLogin(): void;
}
