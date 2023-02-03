import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../store";

export const ProtectedRoute = () => {
  const userAdminStore = useSelector((state: RootState) => state.user.isAdmin);

  return <div>{userAdminStore ? <Outlet /> : <Navigate to="/" /> }</div>;
};
