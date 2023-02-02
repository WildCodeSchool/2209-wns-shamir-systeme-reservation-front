import { Route } from "react-router-dom";
import Admin from "../pages/Admin/Admin";
import AdminCategories from "../pages/Admin/AdminCategories";
import AdminCustomers from "../pages/Admin/AdminCustomers";
import AdminProducts from "../pages/Admin/AdminProducts";
import AdminReservations from "../pages/Admin/AdminReservations";
import { ProtectedRoute } from "../tools/ProtectedRoute";

function AdminRouter() {
  return (
    <Route element={<ProtectedRoute />}>
      <Route path="/admin">
        <Route index element={<Admin />} />
        <Route path="customers" element={<AdminCustomers />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="categories" element={<AdminCategories />} />
        <Route path="reservations" element={<AdminReservations />} />
      </Route>
    </Route>
  );
}

export default AdminRouter;
