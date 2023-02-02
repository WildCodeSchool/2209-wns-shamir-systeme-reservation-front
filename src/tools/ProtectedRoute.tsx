import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { RootState } from "../store";

export const ProtectedRoute = () => {
  const userAdminStore = useSelector((state: RootState) => state.user.isAdmin);

  return <div>{userAdminStore && <Outlet /> }</div>;
};
