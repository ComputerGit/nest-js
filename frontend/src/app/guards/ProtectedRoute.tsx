import { Navigate, Outlet, useLocation } from "react-router-dom";

// In the future, this will come from your global AuthContext
// For now, we mock it to test the logic
const useAuth = () => {
  const user = {
    isAuthenticated: true, // Try changing to false to see the redirect
    role: "admin", // Try changing to 'employee' to test permission denial
  };
  return user;
};

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, role } = useAuth();
  const location = useLocation();

  // 1. Check Authentication: If not logged in, go to Login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. Check Authorization: If role is not allowed, go to Unauthorized page
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // 3. Access Granted: Render the Child Route
  return <Outlet />;
};
