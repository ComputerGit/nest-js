import { useEffect, useState } from "react";
import type { Employee } from "../../../entities/employee/employee.model";
import { employeeApi } from "../../../infrastructure/api/employee.api";

export function useEmployeeList() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    employeeApi
      .getAll()
      .then(setEmployees)
      .catch(() => setError("Failed to load employees"))
      .finally(() => setLoading(false));
  }, []);

  return { employees, loading, error };
}
