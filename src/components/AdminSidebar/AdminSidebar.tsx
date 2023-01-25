import "./adminSidebar.css";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {

  return (
    <div className="adminsidebar_container d-flex flex-column align-items-end gap-4">
          <NavLink
            to="/admin/customers"
            className="link"
          >
            CLIENTS
          </NavLink>
          <NavLink
            to="/admin/products"
            className="link"
          >
            PRODUITS
          </NavLink>
          <NavLink 
            to="/admin/categories"
            className="link"
          >
            CATEGORIES
          </NavLink>
          <NavLink 
            to="/admin/reservations"
            className="link"
          >
            RESERVATIONS
          </NavLink>
    </div>
  );
};

export default AdminSidebar;
