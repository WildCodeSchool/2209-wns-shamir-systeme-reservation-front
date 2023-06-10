import "./admin.css";
import { useEffect, useState } from "react";
import IReservation from "../../interfaces/IReservation";
import { useQuery } from "@apollo/client";
import { GET_ALL_RESERVATIONS } from "../../graphql/queries";
import { Table } from "react-bootstrap";
import { readableDate } from "../../tools/utils";
import DatePicker from "react-datepicker";
import { fr } from "date-fns/locale";
import { RxCrossCircled } from "react-icons/rx";

const AdminReservations = () => {
  const [reservationsAdmin, setReservationsAdmin] = useState<IReservation[]>(
    []
  );
  const [reservationsFiltered, setReservationsFiltered] = useState<
    IReservation[]
  >([]);
  const [dateFilter, setDateFilter] = useState<number>(Date.now());

  useEffect(() => {
    setReservationsFiltered(
      reservationsAdmin.filter(
        (reservation) => Date.parse(reservation.start) >= dateFilter
      )
    );
  }, []);

  useEffect(() => {
    setReservationsFiltered(
      reservationsAdmin.filter(
        (reservation) => Date.parse(reservation.start) >= dateFilter
      )
    );
  }, [dateFilter]);

  const {} = useQuery(GET_ALL_RESERVATIONS, {
    onCompleted: (dataAllReservations) => {
      setReservationsAdmin(dataAllReservations.getAllReservations);
    },
  });

  const filteredOrders: {
    id: number;
    total: number;
    client: string;
    status: number;
  }[] = [];
  reservationsFiltered.map((reservation) => {
    if (!filteredOrders.find((order) => order.id == reservation.order.id)) {
      filteredOrders.push({
        id: reservation.order.id,
        status: reservation.order.status,
        total: reservation.order.total_price,
        client: `${reservation.order.user.lastname} ${reservation.order.user.firstname}`,
      });
    }
  });
  filteredOrders.sort((a, b) => a.id - b.id);

  // Gestion du datepicker
  const [startDate, setStartDate] = useState(null);
  const onChange = (date: any) => {
    setStartDate(date);
    setDateFilter(Date.parse(date));
  };

  const resetDates = () => {
    setDateFilter(Date.now());
    setStartDate(null);
  };

  return (
    <div className="">
      <div className="product_container d-flex flex-column align-items-center">
        <h1 className="my-5">Réservations</h1>
        <div className="d-flex align-items-center mb-5">
          <label className="text-center me-3" htmlFor="startDate">
            Voir les commandes
          </label>
          <DatePicker
            className="w-100 text-center"
            onChange={onChange}
            startDate={startDate}
            locale={fr}
            dateFormat="dd/MM/yyyy"
            calendarStartDay={1}
            selected={startDate}
            withPortal
            placeholderText="à partir de..."
          />
          <RxCrossCircled
            className="fs-2 ms-3 text-danger"
            role="button"
            onClick={resetDates}
          />
        </div>

        <Table hover>
          <thead>
            <tr>
              <th className="text-center">Commande</th>
              <th className="text-center">Statut</th>
              <th className="text-center">Début</th>
              <th className="text-center">Fin</th>
              <th>Produit</th>
              <th className="text-center">Prix</th>
              <th>Client</th>
            </tr>
          </thead>
          <tbody>
            {reservationsFiltered &&
              filteredOrders &&
              filteredOrders.map((order) => (
                <>
                  <tr className="table-primary">
                    <th className="text-center"># {order.id}</th>
                    <th className="text-center">
                      {order.status == 0
                        ? "Annulée"
                        : order.status == 1
                        ? "Validée"
                        : "En cours"}
                    </th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th className="text-end pe-4">{order.total.toFixed(2)}</th>
                    <th>{order.client}</th>
                  </tr>
                  {reservationsFiltered
                    .filter((reservation) => reservation.order.id == order.id)
                    .map((filteredReservation) => (
                      <tr key={filteredReservation.id}>
                        <td></td>
                        <td></td>
                        <td className="text-center">
                          {readableDate(filteredReservation.start)}
                        </td>
                        <td className="text-center">
                          {readableDate(filteredReservation.end)}
                        </td>
                        <td>
                          {filteredReservation.product.id} -{" "}
                          {filteredReservation.product.name}{" "}
                        </td>
                        <td className="text-end pe-4">
                          {filteredReservation.price.toFixed(2)}
                        </td>
                        <td></td>
                      </tr>
                    ))}
                </>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default AdminReservations;
