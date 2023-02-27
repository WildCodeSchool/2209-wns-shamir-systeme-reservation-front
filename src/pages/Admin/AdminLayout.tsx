import "./admin.css";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="admin_container">
      <AdminSidebar />
      <div className="admin_right_side">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
