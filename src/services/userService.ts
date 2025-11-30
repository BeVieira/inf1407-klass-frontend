import { apiRequest } from "./api";
import type { User } from "../types/User";

export type RegisterPayload = {
  username: string;
  email: string;
  registration: string;
  password: string;
};

export type LoginPayload = {
  login: string;
  password: string;
};

export type TokenPair = {
  access: string;
  refresh: string;
};

export async function registerUser(payload: RegisterPayload) {
  return apiRequest<User>("/api/accounts/users/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function loginUser(payload: LoginPayload) {
  console.log( "login payload", payload);
  return apiRequest<TokenPair>("/api/auth/token/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function refreshAccessToken(refresh: string) {
  return apiRequest<{ access: string }>("/api/auth/token/refresh/", {
    method: "POST",
    body: JSON.stringify({ refresh }),
  });
}

export async function fetchCurrentUser(token?: string) {
  const headers: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {};
  return apiRequest<User>("/api/auth/me/", {
    method: "GET",
    headers,
  }); 
}
