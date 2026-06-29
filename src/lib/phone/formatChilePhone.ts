export const CHILE_PHONE_CARRIER = "+56";

export function cleanChilePhoneLocal(value: string): string {
  let digits = value.replace(/\D/g, "");
  if (digits.startsWith("56")) {
    digits = digits.slice(2);
  }
  return digits.slice(0, 9);
}

export function formatChilePhoneLocal(value: string): string {
  const digits = cleanChilePhoneLocal(value);
  if (!digits) return "";
  if (digits.length <= 1) return digits;
  if (digits.length <= 5) return `${digits.slice(0, 1)} ${digits.slice(1)}`;
  return `${digits.slice(0, 1)} ${digits.slice(1, 5)} ${digits.slice(5)}`;
}

export function normalizeChilePhoneForApi(localValue: string): string {
  const digits = cleanChilePhoneLocal(localValue);
  if (!digits) return "";
  return `${CHILE_PHONE_CARRIER}${digits}`;
}

export function isValidChileMobileLocal(value: string): boolean {
  const digits = cleanChilePhoneLocal(value);
  return digits.length === 9 && digits.startsWith("9");
}
