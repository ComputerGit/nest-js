import apiClient from "../http/client";
import type { Employee } from "../../entities/employee/employee.model";

export type CreateEmployeePayload = {
  firstName: string;
  lastName: string;
  role: "ADMIN" | "USER" | "EMPLOYEE";
  addresses: {
    type: "HOME" | "OFFICE";
    line1: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  }[];
};

export const employeeApi = {
  async getAll(): Promise<Employee[]> {
    const res = await apiClient.get<any[]>("/employee");

    return res.data.map((emp) => ({
      id: emp.id.value,
      firstName: emp.name.firstName,
      lastName: emp.name.lastName,
      role: emp.role.value,
      status: emp.status,
      addresses: emp.addresses,
    }));
  },
};
