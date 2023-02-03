import { Route, Routes } from "react-router-dom";
import AdminCategories from "../pages/Admin/AdminCategories";
import AdminProducts from "../pages/Admin/AdminProducts";
import AdminReservations from "../pages/Admin/AdminReservations";
import AdminCustomers from "../pages/Admin/AdminCustomers";
import { ProtectedRoute } from "./ProtectedRoute";
import AdminLayout from "../pages/Admin/AdminLayout";

function AdminRouter() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route index element={<AdminCustomers />} />
          <Route path="clients" element={<AdminCustomers />} />
          <Route path="produits" element={<AdminProducts />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="reservations" element={<AdminReservations />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AdminRouter;
