import apiClient from "../../../infrastructure/http/client";
import { CreateEmployeeInput, EmployeeResponse } from "../types";

export const createEmployee = async (
  data: CreateEmployeeInput,
): Promise<EmployeeResponse> => {
  // apiClient interceptor already returns 'response.data', so we just return the result
  return apiClient.post("/employee", data);
};
