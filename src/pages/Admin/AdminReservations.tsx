import "./admin.css";
import { useState } from "react";
import IReservation from "../../interfaces/IReservation";
import { useQuery } from "@apollo/client";
import { GET_ALL_RESERVATIONS } from "../../graphql/queries";
import { Table } from "react-bootstrap";
import { readableDate } from "../../tools/utils";

const AdminReservations = () => {
  const [reservationsAdmin, setReservationsAdmin] = useState<IReservation[]>(
    []
  );

  const {} = useQuery(GET_ALL_RESERVATIONS, {
    onCompleted: (dataAllReservations) => {
      setReservationsAdmin(dataAllReservations.getAllReservations);
    },
  });

  return (
    <div className="">
      <div className="product_container d-flex flex-column align-items-center">
        <h1 className="my-5">Réservations</h1>

        <Table striped hover>
          <thead>
            <tr>
              <th className="text-center">#</th>
              <th className="text-center">Début</th>
              <th className="text-center">Fin</th>
              <th className="text-center">Prix</th>
              {/* <th>Statut</th> */}
              <th>Produit</th>
              <th className="text-center">Commande</th>
              <th>Client</th>
            </tr>
          </thead>
          <tbody>
            {reservationsAdmin &&
              reservationsAdmin.map((reservation) => (
                <tr key={reservation.id}>
                  <td className="text-center">{reservation.id}</td>
                  <td>{readableDate(reservation.start)}</td>
                  <td className="text-center">
                    {readableDate(reservation.end)}
                  </td>
                  <td className="text-center">{reservation.price}</td>
                  {/* <td>{reservation.status}</td> */}
                  <td>
                    {reservation.product.id} - {reservation.product.name}{" "}
                  </td>
                  <td className="text-center"># {reservation.order.id}</td>
                  <td>
                    {reservation.order.user.id} - {reservation.order.user.email}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default AdminReservations;
