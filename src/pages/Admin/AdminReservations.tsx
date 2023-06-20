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
  const [numOrder, setNumOrder] = useState<string | undefined>(undefined);

  useEffect(() => {
    setReservationsFiltered(
      reservationsAdmin.filter(
        (reservation) => (Date.parse(reservation.start) > dateFilter - 60 * 60 * 24 * 1000)
      )
    );
  }, []);

  useEffect(() => {
    setReservationsFiltered(
      reservationsAdmin.filter(
        (reservation) => (Date.parse(reservation.start) > dateFilter - 60 * 60 * 24 * 1000)
      )
    );
  }, [dateFilter]);

  useEffect(() => {
    if (numOrder) {
      setReservationsFiltered(
        reservationsAdmin.filter(
          (reservation) => (reservation.order.id.toString().startsWith(numOrder))
        )
      );
    } else {
      resetDates();
    }
  }, [numOrder]);

  const {} = useQuery(GET_ALL_RESERVATIONS, {
    onCompleted: (dataAllReservations) => {
      setReservationsAdmin(dataAllReservations.getAllReservations);
    },
  });

  type filteredOrders = {
    id: number;
    total: number;
    client: string;
    clientPhone?: string;
    status: number;
  }[]

  const filteredOrders: filteredOrders = [];

  reservationsFiltered.forEach(reservation => {
    if (!filteredOrders.find((order) => order.id == reservation.order.id)) {
      filteredOrders.push({
        id: reservation.order.id,
        status: reservation.order.status,
        total: reservation.order.total_price,
        client: `${reservation.order.user.lastname} ${reservation.order.user.firstname}`,
        clientPhone: reservation.order.user.phone
      });
    }
    
  });

  filteredOrders.sort((a, b) => a.id - b.id);

  // Gestion du datepicker
  const [startDate, setStartDate] = useState(new Date(Date.now()));
  const onChange = (date: any) => {
    setStartDate(date);
    setDateFilter(Date.parse(date));
  };

  const resetDates = () => {
    setDateFilter(Date.now());
    setStartDate(new Date(Date.now()));
  };

  const filterByNumOrder = (e: any) => {
    setNumOrder(e.target.value);
  };

  const resetNumOrder = () => {
    setNumOrder(undefined)
    setDateFilter(Date.now());
    setStartDate(new Date(Date.now()));
  };

  return (
    <div className="">
      <div className="product_container d-flex flex-column align-items-center">
        <h1 className="my-5">Réservations</h1>
        <div className="d-flex align-items-center mb-5">
          <div className="d-flex align-items-center mb-5 me-5">
            <label className="text-center me-3" htmlFor="numOrder">
              N° commande
            </label>
            <input
              className="w-25"
              name="numOrder"
              min={0}
              type="number"
              onChange={filterByNumOrder}
              value={numOrder ? numOrder : ""}
            />
            {numOrder && 
              <RxCrossCircled
              className="fs-2 ms-3 text-danger"
              role="button"
              onClick={resetNumOrder}
              />
            }
          </div>
          <div className="d-flex align-items-center mb-5">
            <label className="text-center me-3" htmlFor="startDate">
              Voir les réservations débutant le
            </label>
            <DatePicker
              className="w-100 text-center"
              onChange={onChange}
              startDate={numOrder ? null : startDate}
              locale={fr}
              dateFormat="dd/MM/yyyy"
              calendarStartDay={1}
              selected={startDate}
              withPortal
            />
            {Math.round(dateFilter/1000) != Math.round(Date.now()/1000) && !numOrder &&
              <RxCrossCircled
                className="fs-2 ms-3 text-danger"
                role="button"
                onClick={resetDates}
              />
            }
          </div>
        </div>

        <Table hover>
          <thead>
            <tr>
              <th className="text-center">Commande</th>
              <th className="text-center">Statut</th>
              <th className="text-center">Début</th>
              <th className="text-center">Fin</th>
              <th>Produit</th>
              <th className="text-end pe-4">Prix</th>
              <th>Client</th>
            </tr>
          </thead>
          <tbody>
            {reservationsFiltered &&
              filteredOrders &&
              filteredOrders
              .filter(order => order.status == 1)
              .map((order) => (
                <>
                  <tr key={order.id} className="table-primary">
                    <th className="text-center"># {order.id}</th>
                    <th className="text-center">
                      {order.status == 0
                        ? "Annulée"
                        : order.status == 1
                        ? "Validée"
                        : "Non validée"}
                    </th>
                    <th colSpan={3}></th>
                    <th className="text-end pe-4">{order.total.toFixed(2)}</th>
                    <th><div data-bs-toggle="tooltip" title={order.clientPhone}>{order.client}</div></th>
                  </tr>
                  {reservationsFiltered
                    .filter((reservation) => reservation.order.id == order.id)
                    .map((filteredReservation) => (
                      <tr key={filteredReservation.id}>
                        <td colSpan={2}></td>
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
        {reservationsFiltered.length == 0 && !numOrder && <div className="mt-5 fs-3">Aucune réservation après le {(startDate.toLocaleDateString())}</div>}
        {reservationsFiltered.length == 0 && numOrder && <div className="mt-5 fs-3">Aucune commande trouvée</div>}
      </div>
    </div>
  );
};

export default AdminReservations;
