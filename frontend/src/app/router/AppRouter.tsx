import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PageLoader } from "../../shared/ui/PageLoader";

// --- LAZY IMPORTS ---
const MainLayout = lazy(() =>
  import("../../shared/layouts/MainLayout.tsx").then((m) => ({
    default: m.MainLayout,
  })),
);
const HomePage = lazy(() =>
  import("../../pages/home/HomePage").then((m) => ({ default: m.HomePage })),
);
const LoginPage = lazy(() =>
  import("../../pages/auth/LoginPage.tsx").then((m) => ({
    default: m.LoginPage,
  })),
);
const AdminDashboard = lazy(() =>
  import("../../pages/admin/AdminDashboard.tsx").then((m) => ({
    default: m.AdminDashboard,
  })),
);

const CreateEmployeePage = lazy(() =>
  import("../../pages/employee/CreateEmployeePage").then((m) => ({
    // If you used 'export default' in the page file, just use 'm.default'
    default: m.default,
  })),
);

// Guards
import { ProtectedRoute } from "../guards/ProtectedRoute.tsx";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* ================= PUBLIC ZONE ================= */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/unauthorized" element={<div>Access Denied</div>} />

          {/* ================= PRIVATE ZONE ================= */}
          {/* 1. The Layout Shell (Sidebar + Header) */}
          <Route element={<MainLayout />}>
            {/* 2. Security Check (Must be Logged In) */}
            <Route element={<ProtectedRoute />}>
              {/* Common Routes */}
              <Route path="/profile" element={<div>My Profile</div>} />

              {/* 🚨 THE FIX IS HERE: */}
              {/* 3. Admin Check (Must be 'admin') */}
              <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                {/* ✅ WE ADDED THE ACTUAL PATH HERE: */}
                <Route path="/admin" element={<AdminDashboard />} />
              </Route>

              <Route
                path="/admin/register-employee"
                element={<CreateEmployeePage />}
              />

              {/* 4. Employee Check */}
              <Route
                element={
                  <ProtectedRoute allowedRoles={["employee", "admin"]} />
                }
              >
                <Route path="/workspace" element={<div>My Workspace</div>} />
              </Route>
            </Route>
          </Route>

          {/* ================= FALLBACK ================= */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
