export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000";

export class ApiError extends Error {
  status: number;

  details?: unknown;

  constructor(status: number, message: string, details?: unknown) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

const defaultHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
} as const;

export function buildApiUrl(path: string) {
  return new URL(path, API_BASE_URL).toString();
}

async function parseJsonSafely(response: Response) {
  try {
    return await response.json();
  } catch (error) {
    console.warn("Resposta sem JSON válido", error);
    return undefined;
  }
}

function extractMessageFromPayload(payload: unknown) {
  if (!payload || typeof payload !== "object") return undefined;

  if (typeof (payload as { detail?: unknown }).detail === "string") {
    return (payload as { detail: string }).detail;
  }

  const objectValues = Object.values(payload).flat();
  const stringMessages = objectValues.filter(
    (item): item is string => typeof item === "string"
  );

  if (stringMessages.length > 0) {
    return stringMessages.join(" ");
  }

  return undefined;
}

export async function apiRequest<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const url = buildApiUrl(path);

  const response = await fetch(url, {
    ...init,
    headers: {
      ...defaultHeaders,
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    const payload = await parseJsonSafely(response);
    const message =
      extractMessageFromPayload(payload) ??
      `Erro ao comunicar com o servidor (${response.status}). Tente novamente.`;

    throw new ApiError(response.status, message, payload);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const data = await parseJsonSafely(response);
  return data as T;
}
