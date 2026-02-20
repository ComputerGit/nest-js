export const EmployeeRoleType = {
  ADMIN: "ADMIN",
  USER: "USER",
  MANAGER: "MANAGER",
} as const;

// This creates a type from the object values
export type EmployeeRoleType =
  (typeof EmployeeRoleType)[keyof typeof EmployeeRoleType];

export const AddressType = {
  HOME: "HOME",
  WORK: "WORK",
} as const;

export type AddressType = (typeof AddressType)[keyof typeof AddressType];

export interface AddressDto {
  type: AddressType;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface CreateEmployeeDto {
  empId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: EmployeeRoleType;
  addresses: AddressDto[];
}
