import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function RequiredAuth({ allowedRoles }) {
  const { auth } = useAuth();
  const location = useLocation();

  /**
   * You can access protected pages if you are logged in, so
   * 'auth?.userId' is not null and if your account type
   * is compliant with the ones that are allowed.
   */
  if (!auth?.userId) {
    return <Navigate to="login/" state={{ from: location }} replace />;
  }
  // You are logged in
  if (allowedRoles?.includes(auth?.accountType)) {
    return <Outlet />;
  } else {
    // if your account type is not compliant with the ones that are allowed,
    // then you are redirected to home.
    return <Navigate to="/" replace />;
  }
}

export default RequiredAuth;