import "./admin.css";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";

const AdminCategories = () => {
  return (
    <div className="admin_container">
      <div className="d-flex">
        <AdminSidebar />
        <div className="category_container">
          <h1>Catégories</h1>
        </div>
      </div>
    </div>
  );
};

export default AdminCategories;
