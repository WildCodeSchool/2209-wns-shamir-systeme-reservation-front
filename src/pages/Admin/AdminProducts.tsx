import "./admin.css";
import {
  MdOutlineDeleteOutline,
  MdOutlineModeEditOutline,
  MdOutlineAddTask,
} from "react-icons/md";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import IProduct from "../../interfaces/IProduct";
import { Button } from "react-bootstrap";
import AdminProductForm from "../../components/AdminProduct/AdminProductForm";
import { FlashMessage } from "../../components/Alert/FlashMessage";
import IAdminProductProps from "../../interfaces/IAdminProductProps";

const AdminProducts = ({ products, categories }: IAdminProductProps) => {
  const [productsAdmin, setProductsAdmin] = useState<IProduct[]>([]);
  
  useEffect(() => {
    setProductsAdmin(products);
  }, [products]);
  
  // Modal productForm
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);
  
  // Flash message
  const [flashMessageType, setFlashMessageType] = useState<string>('');
  const [flashMessageMessage, setFlashMessageMessage] = useState<string>('');
  const [showMessage, setShowMessage] = useState(false);
  const handleFlashMessage = (type: string, message: string) => {
    setFlashMessageType(type);
    setFlashMessageMessage(message);
  };
  useEffect(() => {
    if(flashMessageMessage !== '') {
      setShowMessage(true)
      const timer = setTimeout(() => setShowMessage(false), 4000);
      return () => clearTimeout(timer);
    }
    }, [flashMessageMessage]);

  return (
    <div className="admin_container">
      {showMessage && <FlashMessage type={flashMessageType} message={flashMessageMessage}/>}
      {show && (
        <AdminProductForm
          categories={categories}
          show={show}
          handleShow={handleShow}
          handleFlashMessage={handleFlashMessage}
        />
      )}
      <div className="d-flex">
        <AdminSidebar />
        <div className="product_container d-flex flex-column align-items-center">
          <h1 className="my-5">Produits</h1>

          <Button onClick={handleShow} className="align-self-end btnWild mb-5">
            <MdOutlineAddTask className="fs-1 me-2" />{" "}
            <span>Ajouter un produit</span>
          </Button>

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
                  <tr key={product.id}>
                    <td className="text-center">{product.id}</td>
                    <td>{product.name}</td>
                    <td className="text-center">{product.price}</td>
                    <td className="text-center">{product.quantity}</td>
                    <td>{product.category.name}</td>
                    <td className="d-flex justify-content-center align-items-center gap-2 flex-wrap">
                      <MdOutlineModeEditOutline className="edit_icon fs-1" />{" "}
                      <MdOutlineDeleteOutline className="delete_icon fs-1" />
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
