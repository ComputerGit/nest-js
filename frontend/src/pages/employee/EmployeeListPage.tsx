import { useEmployeeList } from "../../features/employee/list/useEmployeeList";

export default function EmployeeListPage() {
  const { employees, loading, error } = useEmployeeList();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Loading employees...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-600">
        {error}
      </div>
    );
  }

  if (employees.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        No employees found
      </div>
    );
  }

  console.log("EMPLOYEES RAW:", employees);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Employees</h1>

      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Role
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                City
              </th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 text-sm">
                  {emp.firstName} {emp.lastName}
                </td>

                <td className="px-4 py-3 text-sm">{emp.role}</td>

                <td className="px-4 py-3 text-sm">
                  {emp.addresses[0]?.city ?? "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
