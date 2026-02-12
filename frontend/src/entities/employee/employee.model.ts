export type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  role: "ADMIN" | "USER" | "EMPLOYEE";
  status: "ACTIVE" | "INACTIVE";
  addresses: Address[];
};

export type Address = {
  type: string;
  line1: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};
