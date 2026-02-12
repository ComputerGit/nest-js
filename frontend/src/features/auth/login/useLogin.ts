import { useMutation } from "@tanstack/react-query";
import { loginUser } from "./api";
import type { LoginDTO } from "./types";

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginDTO) => loginUser(data),
    onSuccess: (data) => {
      // 1. Save Token
      localStorage.setItem("accessToken", data.accessToken);

      // 2. Save User Info (Optional: better to use a global store like Zustand/Context later)
      localStorage.setItem("user", JSON.stringify(data.user));

      console.log("Login Successful!", data.user.role);

      // 3. Redirect based on Role (RBAC)
      // We will handle navigation in the UI component
    },
    onError: (error: any) => {
      console.error("Login Failed", error);
      // You can trigger a toast notification here
    },
  });
};
