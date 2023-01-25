import "./admin.css";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";

const AdminCustomers = () => {
  return (
    <div className="admin_container">
      <div className="d-flex">
        <AdminSidebar />
        <div className="customer_container">
          <h1>Clients</h1>
        </div>
      </div>
    </div>
  );
};

export default AdminCustomers;
