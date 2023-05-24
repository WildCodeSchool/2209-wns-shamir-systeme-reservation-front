import "./admin.css";
import {
  MdOutlineAddTask,
  MdOutlineDeleteOutline,
  MdOutlineModeEditOutline,
} from "react-icons/md";
import ICategory from "../../interfaces/ICategory";
import { useState } from "react";
import { GET_ALL_CATEGORIES } from "../../graphql/queries";
import { useMutation, useQuery } from "@apollo/client";
import { Button, Table } from "react-bootstrap";
import { DELETE_CATEGORY } from "../../graphql/mutations";
import Swal from "sweetalert2";

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
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir supprimer cette catégorie ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer !',
      cancelButtonText: 'Annuler'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await deleteCategory({
          variables: { deleteCategoryId: id },
        });
        if (response.data.deleteCategory === "Catégorie supprimée.") {
          Swal.fire(
            'Catégorie supprimée',
            '',
            'success'
          )
        } else {
          Swal.fire(
            'Une erreur est survenue',
            '',
            'warning'
          )
        }
      }
    })
  };

  return (
    <div className="">
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
