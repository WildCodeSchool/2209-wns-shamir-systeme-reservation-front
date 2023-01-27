import { Outlet, Navigate } from "react-router-dom";
export type ProtectedRouteProps = {
  isUserAdmin: boolean;
};

export const ProtectedRoute = ({
  isUserAdmin,
}: ProtectedRouteProps) => {
  return (
    <div>
      {isUserAdmin && <Outlet/> }
    </div>
  )
}
