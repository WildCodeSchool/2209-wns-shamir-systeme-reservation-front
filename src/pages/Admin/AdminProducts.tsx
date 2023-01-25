import "./admin.css";
import {
  MdOutlineDeleteOutline,
  MdOutlineModeEditOutline,
} from "react-icons/md";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";
import Table from "react-bootstrap/Table";
import ICatalogProps from "../../interfaces/ICatalogProps";
import { useEffect, useState } from "react";
import IProduct from "../../interfaces/IProduct";

const AdminProducts = ({ products, categories }: ICatalogProps) => {
  const [productsAdmin, setProductsAdmin] = useState<IProduct[]>([]);

  useEffect(() => {
    setProductsAdmin(products);
  }, []);

  return (
    <div className="admin_container">
      <div className="d-flex">
        <AdminSidebar />
        <div className="product_container d-flex flex-column align-items-center">
          <h1 className="my-5">Produits</h1>
          <Table striped hover>
            <thead>
              <tr>
                <th className="text-center">#</th>
                <th>Nom</th>
                <th className="text-center">Prix/jour</th>
                <th className="text-center">Quantité</th>
                <th>Catégorie</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {productsAdmin &&
                productsAdmin.map((product) => (
                  <tr>
                    <td className="text-center">{product.id}</td>
                    <td>{product.name}</td>
                    <td className="text-center">{product.price}</td>
                    <td className="text-center">{product.quantity}</td>
                    <td>{product.category.name}</td>
                    <td>
                      <MdOutlineModeEditOutline className="edit_icon fs-1 me-3"/> <MdOutlineDeleteOutline className="delete_icon fs-1"/>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
