import { type ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./types";

type PrivateRouteProps = {
  children: ReactNode;
};

export function PrivateRoute({ children }: PrivateRouteProps) {
  const userContext = useContext(UserContext);
  const hasUser =
    userContext && userContext.user && userContext.user !== "ERROR";

  if (!hasUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
