import "./admin.css";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_ORDERS } from "../../graphql/queries";
import { Table } from "react-bootstrap";
import { readableDate } from "../../tools/utils";
import DatePicker from "react-datepicker";
import { fr } from "date-fns/locale";
import { RxCrossCircled } from "react-icons/rx";
import IOrderAdmin from "../../interfaces/IOrderAdmin";

const AdminReservations = () => {
  const [ordersAdmin, setOrdersAdmin] = useState<IOrderAdmin[]>(
    []
  );
  const [ordersFiltered, setOrdersFiltered] = useState<
    IOrderAdmin[]
  >([]);
  const [dateFilter, setDateFilter] = useState<number>(Date.now());
  const [numOrder, setNumOrder] = useState<string | undefined>(undefined);
  const [clientName, setClientName] = useState<string | undefined>(undefined);

  const filterOrdersByDate = () => {
    let ordersFilt: IOrderAdmin[] = [];
    ordersAdmin.forEach(order => {
      const reservationsFiltered = order.reservations.filter((reservation) => (Date.parse(reservation.start) > dateFilter - 60 * 60 * 24 * 1000))
      if (reservationsFiltered.length) {
        ordersFilt.push(order);
      }
    });
    setOrdersFiltered(ordersFilt);
  }

  useEffect(() => {
    filterOrdersByDate();
  }, []);

  useEffect(() => {
    filterOrdersByDate();
  }, [dateFilter]);

  useEffect(() => {
    if (numOrder) {
      setOrdersFiltered(ordersAdmin.filter(order => order.id.toString().startsWith(numOrder)))
    } else {
      resetDates();
    }
  }, [numOrder]);

  useEffect(() => {
    if (clientName) {
      setOrdersFiltered(ordersAdmin.filter(order => order.user.lastname?.toLowerCase().startsWith(clientName.toLowerCase())))
    } else {
      resetDates();
    }
  }, [clientName]);

  const {} = useQuery(GET_ALL_ORDERS, {
    onCompleted: (dataAllOrders) => {
      setOrdersAdmin(dataAllOrders.getAllOrders);
    },
  });

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

  const filterByClientName = (e: any) => {
    setClientName(e.target.value);
  };

  const resetClientName = () => {
    setClientName(undefined)
    setDateFilter(Date.now());
    setStartDate(new Date(Date.now()));
  };

  return (
    <div className="">
      <div className="product_container d-flex flex-column align-items-center">
        <h1 className="my-5">Réservations</h1>
        <div className="w-100 d-flex align-items-center justify-content-between mb-5">
          <div className="d-flex flex-column align-items-center">
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
          <div className="d-flex flex-column align-items-center">
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
          <div className="d-flex flex-column align-items-center">
            <label className="text-center me-3" htmlFor="numOrder">
              Nom du client
            </label>
            <input
              className="w-100"
              name="clientName"
              type="text"
              onChange={filterByClientName}
              value={clientName ? clientName : ""}
            />
            {clientName && 
              <RxCrossCircled
              className="fs-2 ms-3 text-danger"
              role="button"
              onClick={resetClientName}
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
              {ordersFiltered
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
                    <th className="text-end pe-4">{order.total_price.toFixed(2)}</th>
                    <th><div data-bs-toggle="tooltip" title={order.user.phone}>{`${order.user.lastname} ${order.user.firstname}` }</div></th>
                  </tr>
                  {order.reservations
                    .map((reservation) => (
                      <tr key={reservation.id}>
                        <td colSpan={2}></td>
                        <td className="text-center">
                          {readableDate(reservation.start)}
                        </td>
                        <td className="text-center">
                          {readableDate(reservation.end)}
                        </td>
                        <td>
                          {reservation.product.id} -{" "}
                          {reservation.product.name}{" "}
                        </td>
                        <td className="text-end pe-4">
                          {reservation.price.toFixed(2)}
                        </td>
                        <td></td>
                      </tr>
                    ))}
                </>
              ))}
          </tbody>
        </Table>
        {ordersFiltered.length == 0 && !numOrder && <div className="mt-5 fs-3">Aucune réservation après le {(startDate.toLocaleDateString())}</div>}
        {ordersFiltered.length == 0 && numOrder && <div className="mt-5 fs-3">Aucune commande trouvée</div>}
      </div>
    </div>
  );
};

export default AdminReservations;
