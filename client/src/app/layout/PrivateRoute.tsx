import { Navigate, useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";
import { ReactNode } from "react";
import { toast } from "react-toastify";

interface PrivateRouteProps {
  children: ReactNode;
  roles?: string[];
}

export default function PrivateRoute({ children, roles }: PrivateRouteProps) {
  const user = useAppSelector((state) => state.account.user);

  // return user ? <>{children}</> : <Navigate to="/login" />;
  if (!user) {
    return <Navigate to="/login" />;
  }
  if (roles && !roles?.some((r) => user?.roles?.includes(r))) {
    toast.error("Not authorized to access Inventory", { theme: "colored" });
    return <Navigate to="/catalog" />;
  }

  return <>{children}</>;
}
