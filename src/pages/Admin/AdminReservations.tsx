import "./admin.css";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";

const AdminReservations = () => {
  return (
    <div className="admin_container">
      <div className="d-flex">
        <AdminSidebar />
        <div className="reservation_container">
          <h1>Réservations</h1>
        </div>
      </div>
    </div>
  );
};

export default AdminReservations;
