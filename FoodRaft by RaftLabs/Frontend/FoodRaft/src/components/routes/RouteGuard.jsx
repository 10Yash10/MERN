import { Outlet, Navigate } from "react-router-dom";
import { useGetMeQuery } from "../../features/auth/auth";

export const PrivateRoutes = () => {
  const { data } = useGetMeQuery();
  return data ? <Outlet /> : <Navigate to="/login" replace />;
};

export const PublicRoutes = () => {
  const { data } = useGetMeQuery();

  return !data ? <Outlet /> : <Navigate to="/menu" replace />;
};
