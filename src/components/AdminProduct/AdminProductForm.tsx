import "./adminProductForm.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import ICategory from "../../interfaces/ICategory";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_PRODUCT } from "../../tools/mutations";
import { GET_ALL_PRODUCTS } from "../../tools/queries";
import { regexAlpha, regexInput } from "../../tools/utils";

const AdminProductForm = ({
  show,
  categories,
  handleShow,
  handleFlashMessage,
}: any) => {
  const [nameProduct, setNameProduct] = useState<string>("");
  const [descriptionProduct, setDescriptionProduct] = useState<string>("");
  const [priceProduct, setPriceProduct] = useState<number>();
  const [quantityProduct, setQuantityProduct] = useState<number>();
  const [imageProduct, setImageProduct] = useState<string>("");
  const [categoryProduct, setCategoryProduct] = useState<ICategory>();

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleNameProduct = (e: any) => {
    try {
      const name: string = e.target.value;
      setNameProduct(name);
      if(name.length > 255) {
        setErrors({
          ...errors,
          name: "Le nom ne doit pas dépasser 255 caractères.",
        });
      } else {
        setErrors({
          ...errors,
          name: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDescriptionProduct = (e: any) => {
    try {
      const description: string = e.target.value;
      setDescriptionProduct(description);
    } catch (error) {
      console.log(error);
    }
  };
  const handlePriceProduct = (e: any) => {
    try {
      const price: number = parseFloat(e.target.value);
      setPriceProduct(price);
      if (regexAlpha.test(e.target.value)) {
        setErrors({
          ...errors,
          price: "Le prix doit être un nombre décimal. Pour séparer les euros des centimes privilégiez le point.",
        });
      } else {
        setErrors({
          ...errors,
          price: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleQuantityProduct = (e: any) => {
    try {
      const quantity = parseInt(e.target.value);
      setQuantityProduct(quantity);
      if (regexAlpha.test(e.target.value)) {
        setErrors({
          ...errors,
          quantity: "La quantité doit être un nombre entier.",
        });
      } else {
        setErrors({
          ...errors,
          quantity: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleImageProduct = (e: any) => {
    setImageProduct(e.target.value);
  };
  const handleCategoryProduct = (e: any) => {
    const categoryId = parseInt(e.target.value);
    const cat = categories.find(
      (category: ICategory) => category.id === categoryId
    );
    setCategoryProduct(cat);
  };

  const [createProduct, { loading: loading, error: error, data: data }] =
    useMutation(CREATE_PRODUCT, {
      refetchQueries: [{ query: GET_ALL_PRODUCTS }, "getAllProducts"],
    });

  const handleSubmitNewProduct = async (e: any) => {
    e.preventDefault();
    try {
      const newProduct = await createProduct({
        variables: {
          product: {
            name: nameProduct.trim().replace(regexInput, ""),
            description: descriptionProduct.trim().replace(regexInput, ""),
            price: priceProduct,
            quantity: quantityProduct,
            image: imageProduct,
            category: categoryProduct,
          },
        },
      });
      handleShow();
      handleFlashMessage("success", "Produit enregistré !");
    } catch (error) {}
  };

  return (
    <Modal show={show} onHide={handleShow} size="lg">
      <Modal.Header closeButton>
        <Modal.Title className="fs-1">Nouveau produit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmitNewProduct}>
          <Form.Group className="mb-3" controlId="productForm.name">
            <Form.Label size="lg">Nom du produit</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              name="name"
              onChange={handleNameProduct}
              autoFocus
              required
            />
            {errors.name && (
              <Form.Text className="text-danger">{errors.name}</Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="productForm.description">
            <Form.Label size="lg">Description</Form.Label>
            <Form.Control
              size="lg"
              as="textarea"
              rows={4}
              name="description"
              required
              onChange={handleDescriptionProduct}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="productForm.price">
            <Form.Label size="lg">Prix TTC par jour de location</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              name="price"
              autoFocus
              required
              onChange={handlePriceProduct}
            />
            {errors.price && (
              <Form.Text className="text-danger">{errors.price}</Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="productForm.quantity">
            <Form.Label size="lg">Quantité</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              name="quantity"
              autoFocus
              required
              onChange={handleQuantityProduct}
            />
            {errors.quantity && (
              <Form.Text className="text-danger">{errors.quantity}</Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="productForm.image">
            <Form.Label size="lg">Image</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              name="image"
              autoFocus
              required
              onChange={handleImageProduct}
            />
          </Form.Group>

          <Form.Label size="lg">Catégorie</Form.Label>
          <Form.Select
            size="lg"
            className="mb-3"
            onChange={handleCategoryProduct}
          >
            <option value="0">Choisir une catégorie</option>
            {categories &&
              categories.map((category: ICategory) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
          </Form.Select>
          <Button className="btnWild justify-self-end" type="submit">
            Ajouter
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AdminProductForm;
