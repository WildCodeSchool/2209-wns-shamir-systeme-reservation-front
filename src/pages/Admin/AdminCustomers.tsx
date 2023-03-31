import "./admin.css";
import {
  MdOutlineAddTask,
  MdOutlineDeleteOutline,
  MdOutlineModeEditOutline,
} from "react-icons/md";
import { useState } from "react";
import { GET_ALL_CUSTOMERS } from "../../graphql/queries";
import IUser from "../../interfaces/IUser";
import { Button, Table } from "react-bootstrap";
import { useQuery } from "@apollo/client";

const AdminCustomers = () => {
  const [customersAdmin, setCustomersAdmin] = useState<IUser[]>([]);

  const {} = useQuery(GET_ALL_CUSTOMERS, {
    onCompleted: (dataAllCustomers) => {
      setCustomersAdmin(dataAllCustomers.getAllUsers);
    },
  });

  // TO DO : Desactivate customer

  return (
    <div className="">
      <div className="product_container d-flex flex-column align-items-center">
        <h1 className="my-5">Client</h1>

        <Button className="align-self-end btnWild mb-5 disabled">
          <MdOutlineAddTask className="fs-1 me-2" />{" "}
          <span>Ajouter un client</span>
        </Button>
        <div className="w-75">
          <Table striped hover>
            <thead>
              <tr>
                <th className="text-center">#</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Email</th>
                <th>Téléphone</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customersAdmin &&
                customersAdmin.map((customer) => (
                  <tr key={customer.id}>
                    <td className="text-center">{customer.id}</td>
                    <td>{customer.lastname}</td>
                    <td>{customer.firstname}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phone}</td>
                    <td className="d-flex justify-content-center align-items-center gap-2 flex-wrap">
                      <MdOutlineModeEditOutline className="edit_icon fs-1" />
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

export default AdminCustomers;
