export class AuthApiError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number
  ) {
    super(message);
    this.name = "AuthApiError";
  }
}

export function parseApiErrorMessage(payload: unknown): string {
  if (!payload || typeof payload !== "object") {
    return "Ocurrió un error inesperado. Intenta nuevamente.";
  }

  const body = payload as { message?: string | string[] };

  if (Array.isArray(body.message)) {
    return body.message.join(". ");
  }

  if (typeof body.message === "string" && body.message.trim()) {
    return body.message;
  }

  return "Ocurrió un error inesperado. Intenta nuevamente.";
}
