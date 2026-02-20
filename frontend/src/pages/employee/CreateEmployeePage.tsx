import React from "react";
import { CreateEmployeeForm } from "../../features/employee/create/CreateEmployeeForm";

const CreateEmployeePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      {/* In the future, you can wrap this in a Layout component like:
        <DashboardLayout>
      */}
      <div className="max-w-7xl mx-auto">
        <CreateEmployeeForm />
      </div>
      {/* </DashboardLayout> */}
    </div>
  );
};

export default CreateEmployeePage;
