import apiClient from "../../../infrastructure/http/client";
import type { AuthResponse } from "./types";
import type { LoginDTO } from "./types";

export const loginUser = async (data: LoginDTO): Promise<AuthResponse> => {
  // This sends POST to http://localhost:3000/api/v1/auth/login
  return apiClient.post("/auth/login", data);
};
