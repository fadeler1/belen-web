const MAX_RUT_CHARS = 10;

export function cleanRut(value: string): string {
  return value.replace(/[^0-9kK]/g, "").toUpperCase().slice(0, MAX_RUT_CHARS);
}

export function formatRut(value: string): string {
  const cleaned = cleanRut(value);
  if (!cleaned) return "";

  if (cleaned.length <= 1) {
    return cleaned;
  }

  const verifier = cleaned.slice(-1);
  const body = cleaned.slice(0, -1);

  const formattedBody = body
    .split("")
    .reverse()
    .join("")
    .replace(/(\d{3})(?=\d)/g, "$1.")
    .split("")
    .reverse()
    .join("");

  return `${formattedBody}-${verifier}`;
}

export function normalizeRutForApi(value: string): string {
  const cleaned = cleanRut(value);
  if (!cleaned) return "";
  if (cleaned.length <= 1) return cleaned;

  const verifier = cleaned.slice(-1);
  const body = cleaned.slice(0, -1);
  return `${body}-${verifier}`;
}
