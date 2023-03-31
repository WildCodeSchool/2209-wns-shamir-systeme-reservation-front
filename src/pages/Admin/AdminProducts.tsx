import "./admin.css";
import {
  MdOutlineDeleteOutline,
  MdOutlineModeEditOutline,
  MdOutlineAddTask,
} from "react-icons/md";
import Table from "react-bootstrap/Table";
import { useState } from "react";
import IProduct from "../../interfaces/IProduct";
import { Button } from "react-bootstrap";
import AdminProductForm from "../../components/AdminProduct/AdminProductForm";
import { DELETE_PRODUCT } from "../../graphql/mutations";
import { useMutation } from "@apollo/client";
import { GET_ALL_PRODUCTS } from "../../graphql/queries";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Swal from "sweetalert2";
import { Toast } from "../../tools/utils";

const AdminProducts = () => {
  const productsStore = useSelector(
    (state: RootState) => state.products.products
  );
  const categoriesStore = useSelector(
    (state: RootState) => state.products.categories
  );

  const [productToEdit, setProductToEdit] = useState<IProduct>();

  // Modal productForm
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(!show);
    if (!show) {
      setProductToEdit(undefined);
    }
  };

  // Edit Product
  const handleEditProduct = (product: IProduct) => {
    setProductToEdit(product);
    setShow(true);
  };

  // DeleteProduct
  const [deleteProduct, {}] = useMutation(DELETE_PRODUCT, {
    refetchQueries: [{ query: GET_ALL_PRODUCTS }, "getAllProducts"],
  });

  const handleDeleteProduct = (productId: number) => {
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir supprimer ce produit ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer !',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct({
          variables: { deleteProductId: productId },
        });
        Toast.fire({
          icon: 'success',
          title: '<h3 class="m-0">Votre produit est supprimé.</h3>',
          width: '45rem'
        })
      }
    })
  };

  return (
    <div className="">
      {show && (
        <AdminProductForm
          productToEdit={productToEdit}
          categories={categoriesStore}
          show={show}
          handleShow={handleShow}
        />
      )}
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
            {productsStore &&
              productsStore.map((product) => (
                <tr key={product.id}>
                  <td className="text-center">{product.id}</td>
                  <td>{product.name}</td>
                  <td className="text-center">{product.price}</td>
                  <td className="text-center">{product.quantity}</td>
                  <td>{product.category.name}</td>
                  <td className="d-flex justify-content-center align-items-center gap-2 flex-wrap">
                    <MdOutlineModeEditOutline
                      className="edit_icon fs-1"
                      onClick={() => handleEditProduct(product)}
                    />
                    <MdOutlineDeleteOutline
                      className="delete_icon fs-1"
                      onClick={() => handleDeleteProduct(product.id)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default AdminProducts;
