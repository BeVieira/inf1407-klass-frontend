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

export async function registerUser(payload: RegisterPayload) {
  return apiRequest<User>("/api/account/users", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function loginUser(payload: LoginPayload) {
  return apiRequest<{ token?: string; user?: User }>("/api/login/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function fetchCurrentUser() {
  return apiRequest<User>("/api/me/", {
    method: "GET",
  });
}
