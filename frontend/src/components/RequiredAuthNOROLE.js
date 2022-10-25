import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function RequiredAuth() {
  const { auth } = useAuth();
  const location = useLocation();

  // If you are logged in, then 'auth?.userId' is not null
  // and so you can access the protected page.
  return auth?.userId ? (
    <Outlet />
  ) : (
    // If you are not logged in, you are redirected to the login page
    <Navigate to="login/" state={{ from: location }} replace />
  );
}

export default RequiredAuth;