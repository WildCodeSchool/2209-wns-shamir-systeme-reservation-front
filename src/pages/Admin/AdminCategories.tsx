import "./admin.css";
import {
  MdOutlineAddTask,
  MdOutlineDeleteOutline,
  MdOutlineModeEditOutline,
} from "react-icons/md";
import ICategory from "../../interfaces/ICategory";
import { useEffect, useState } from "react";
import { GET_ALL_CATEGORIES } from "../../tools/queries";
import { useMutation, useQuery } from "@apollo/client";
import { FlashMessage } from "../../components/Alert/FlashMessage";
import { Button, Table } from "react-bootstrap";
import { DELETE_CATEGORY } from "../../tools/mutations";

const AdminCategories = () => {
  const [categoriesAdmin, setCategoriesAdmin] = useState<ICategory[]>([]);

  const {} = useQuery(GET_ALL_CATEGORIES, {
    onCompleted: (dataAllCategories) => {
      setCategoriesAdmin(dataAllCategories.getAllCategories);
    },
  });

  // Delete category
  const [deleteCategory, {}] = useMutation(DELETE_CATEGORY, {
    refetchQueries: [{ query: GET_ALL_CATEGORIES }, "getAllCategories"],
  });

  const handleDeleteCategory = async (id: number) => {
    const confirmation = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cette catégorie ?"
    );
    if (confirmation) {
      const response = await deleteCategory({
        variables: { deleteCategoryId: id },
      });
      if (response.data.deleteCategory === "Catégorie supprimée.") {
        handleFlashMessage("success", "La catégorie a bien été supprimée.");
      } else {
        handleFlashMessage("danger", response.data.deleteCategory);
      }
    }
  };

  // Flash message
  const [flashMessageType, setFlashMessageType] = useState<string>("");
  const [flashMessageMessage, setFlashMessageMessage] = useState<string>("");
  const [showMessage, setShowMessage] = useState(false);
  const handleFlashMessage = (type: string, message: string) => {
    setFlashMessageType(type);
    setFlashMessageMessage(message);
  };
  useEffect(() => {
    if (flashMessageMessage !== "") {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
        setFlashMessageMessage("");
        setFlashMessageType("");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [flashMessageMessage]);

  return (
    <div className="">
      {showMessage && (
        <FlashMessage type={flashMessageType} message={flashMessageMessage} />
      )}
      <div className="product_container d-flex flex-column align-items-center">
        <h1 className="my-5">Catégories</h1>

        <Button className="align-self-end btnWild mb-5 disabled">
          <MdOutlineAddTask className="fs-1 me-2" />{" "}
          <span>Ajouter une catégorie</span>
        </Button>
        <div className="w-50">
          <Table striped hover>
            <thead>
              <tr>
                <th className="text-center">#</th>
                <th>Nom</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categoriesAdmin &&
                categoriesAdmin.map((category) => (
                  <tr key={category.id}>
                    <td className="text-center">{category.id}</td>
                    <td>{category.name}</td>
                    <td className="d-flex justify-content-center align-items-center gap-2 flex-wrap">
                      <MdOutlineModeEditOutline className="edit_icon fs-1" />
                      <MdOutlineDeleteOutline
                        className="delete_icon fs-1"
                        onClick={() => handleDeleteCategory(category.id)}
                      />
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

export default AdminCategories;
