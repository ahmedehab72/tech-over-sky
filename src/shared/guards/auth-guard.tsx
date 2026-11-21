import { Outlet } from "react-router-dom";

export function AuthGuard() {
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return null;
  }

  return <Outlet />;
}
