import { z } from "zod";

// 1. The Validation Schema (Matches your Backend DTO)
export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// 2. Derive TypeScript Type from Schema
export type LoginDTO = z.infer<typeof loginSchema>;

// 3. Define the Response Type (What the backend sends back)
// Adjust this based on your actual backend response!
export interface AuthResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    role: "admin" | "employee"; // RBAC Roles
    name: string;
  };
}
