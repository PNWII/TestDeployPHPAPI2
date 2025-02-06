// Components/RoleBasedRoute.jsx
import { Navigate } from "react-router-dom";
function RoleBasedRoute({ role, children }) {
  const userRole = localStorage.getItem("role");
  if (userRole !== role) {
    alert("คุณไม่มีสิทธิ์เข้าถึงหน้านี้");
    return <Navigate to="/" replace />;
  }
  return children;
}

export default RoleBasedRoute;
