import { useState, useCallback } from "react";
// Explicitly separate Types from React
import type { ChangeEvent, FormEvent } from "react";

// Import Types and Enums separately from your employee types
import { EmployeeRoleType, AddressType } from "../types/employee.types";
import type { CreateEmployeeDto } from "../types/employee.types";

export const useCreateEmployee = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<CreateEmployeeDto>({
    empId: "",
    firstName: "",
    lastName: "",
    email: "",
    role: EmployeeRoleType.USER,
    addresses: [
      {
        type: AddressType.HOME,
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "India",
      },
    ],
  });

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    [],
  );

  const handleAddressChange = useCallback(
    (index: number, e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => {
        const updatedAddresses = [...prev.addresses];
        // We cast name as key of our address object for type safety
        updatedAddresses[index] = {
          ...updatedAddresses[index],
          [name]: value,
        };
        return { ...prev, addresses: updatedAddresses };
      });
    },
    [],
  );

  const addAddress = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      addresses: [
        ...prev.addresses,
        {
          type: AddressType.WORK,
          street: "",
          city: "",
          state: "",
          postalCode: "",
          country: "India",
        },
      ],
    }));
  }, []);

  const removeAddress = useCallback((indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      addresses: prev.addresses.filter((_, index) => index !== indexToRemove),
    }));
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          Array.isArray(errorData.message)
            ? errorData.message.join(", ")
            : errorData.message || "Failed to create employee",
        );
      }

      alert("Employee Created Successfully!");
    } catch (err: any) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    isLoading,
    error,
    handleChange,
    handleAddressChange,
    addAddress,
    removeAddress,
    handleSubmit,
  };
};
