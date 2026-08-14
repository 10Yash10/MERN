import { Outlet, Navigate } from "react-router-dom";
import { useGetMeQuery } from "../../features/auth/auth";
import Loader from "../layout/Loader";

export const PrivateRoutes = () => {
  const { data, isLoading, isError } = useGetMeQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !data) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export const PublicRoutes = () => {
  const { data, isLoading, isError } = useGetMeQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !data) {
    return <Outlet />;
  }

  return <Navigate to="/menu" replace />;
};
