
import { Navigate } from "react-router-dom";
import { getUserRole } from "../services/auth";

export default function ProtectedRoute({ children, allowedRoles }) {
  const role = getUserRole();

  if (!role) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}