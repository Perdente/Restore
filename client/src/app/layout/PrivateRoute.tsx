import { Navigate, useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";
import { ReactNode } from "react";

interface PrivateRouteProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const user = useAppSelector((state) => state.account.user);
  const navigate = useNavigate();
  return user ? <>{children}</> : <Navigate to="/login" />;
}
