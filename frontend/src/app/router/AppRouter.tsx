import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PageLoader } from "../../shared/ui/PageLoader";

// --- LAZY IMPORTS ---
// This is the "magic". These files are NOT loaded until needed.
// Webpack/Vite will split these into separate chunks (e.g., Home.js, Login.js)
const HomePage = lazy(() =>
  import("../../pages/home/HomePage").then((module) => ({
    default: module.HomePage,
  })),
);
const LoginForm = lazy(() =>
  import("../../features/auth/login/LoginForm").then((module) => ({
    default: module.LoginForm,
  })),
);

// You can add more later:
// const EmployeeList = lazy(() => import('../../pages/employee/EmployeeList'));

export const AppRouter = () => {
  return (
    <BrowserRouter>
      {/* Suspense catches the "loading" state while the lazy file downloads */}
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />

          {/* Protected Routes (We will add these later) */}
          {/* <Route path="/dashboard" element={<DashboardLayout />}> ... </Route> */}

          {/* 404 / Catch All */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
