import React from "react";
import { useCreateEmployee } from "./useCreateEmployee";
// 'type' modifier is required for interfaces/types under verbatimModuleSyntax
import type { CreateEmployeeDto } from "../types/employee.types";
import { EmployeeRoleType } from "../types/employee.types";
import { AddressType } from "../types/employee.types";

export const CreateEmployeeForm: React.FC = () => {
  const {
    formData,
    isLoading,
    error,
    handleChange,
    handleAddressChange,
    addAddress,
    removeAddress,
    handleSubmit,
  } = useCreateEmployee();

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md my-8"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
        Register New Employee
      </h2>

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded shadow-sm">
          <p className="font-bold text-sm">Error</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* --- Basic Info Section --- */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Employee ID
          </label>
          <input
            required
            type="text"
            name="empId"
            value={formData.empId}
            onChange={handleChange}
            placeholder="e.g. SE282"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            required
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            required
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            required
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 bg-white focus:ring-blue-500 focus:border-blue-500"
          >
            {Object.values(EmployeeRoleType).map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* --- Dynamic Addresses Section --- */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Addresses</h3>
          <button
            type="button"
            onClick={addAddress}
            className="text-sm bg-blue-600 text-white px-4 py-1.5 rounded-full hover:bg-blue-700 transition-all shadow-sm"
          >
            + Add Address
          </button>
        </div>

        {formData.addresses.map((address, index) => (
          <div
            key={index}
            className="p-4 border border-gray-200 rounded-md mb-4 bg-gray-50 relative animate-in fade-in duration-300"
          >
            {formData.addresses.length > 1 && (
              <button
                type="button"
                onClick={() => removeAddress(index)}
                className="absolute top-2 right-2 text-red-500 text-sm font-bold hover:bg-red-50 p-1 rounded"
              >
                ✕ Remove
              </button>
            )}

            <div className="grid grid-cols-2 gap-3 mt-2">
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-gray-500 uppercase">
                  Address Type
                </label>
                <select
                  name="type"
                  value={address.type}
                  onChange={(e) => handleAddressChange(index, e)}
                  className="mt-1 border p-2 rounded w-full bg-white"
                >
                  {Object.values(AddressType).map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-2">
                <input
                  required
                  type="text"
                  name="street"
                  placeholder="Street Address"
                  value={address.street}
                  onChange={(e) => handleAddressChange(index, e)}
                  className="border p-2 rounded w-full"
                />
              </div>
              <input
                required
                type="text"
                name="city"
                placeholder="City"
                value={address.city}
                onChange={(e) => handleAddressChange(index, e)}
                className="border p-2 rounded"
              />
              <input
                required
                type="text"
                name="state"
                placeholder="State/Province"
                value={address.state}
                onChange={(e) => handleAddressChange(index, e)}
                className="border p-2 rounded"
              />
              <input
                required
                type="text"
                name="postalCode"
                placeholder="Postal Code"
                value={address.postalCode}
                onChange={(e) => handleAddressChange(index, e)}
                className="border p-2 rounded"
              />
              <input
                required
                type="text"
                name="country"
                placeholder="Country"
                value={address.country}
                onChange={(e) => handleAddressChange(index, e)}
                className="border p-2 rounded"
              />
            </div>
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all shadow-lg flex justify-center items-center"
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing...
          </>
        ) : (
          "Register Employee"
        )}
      </button>
    </form>
  );
};
