// path : frontend\src\features\employee\types\types.ts

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  // Make sure this matches your other fields
  addresses: {
    city: string;
    street?: string; // Add other address fields if needed
  }[];

  // ✅ ADD THIS LINE TO FIX THE ERROR
  isActive: boolean;
}
