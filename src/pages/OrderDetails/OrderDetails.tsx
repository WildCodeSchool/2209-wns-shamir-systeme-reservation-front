import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Link, useParams } from "react-router-dom";
import { GET_ORDER_BY_ID } from "../../graphql/queries";
import IOrder from "../../interfaces/IOrder";
import IUser from "../../interfaces/IUser";
import ReservationCard from "../../components/ReservationCard/ReservationCard";
import IReservation from "../../interfaces/IReservation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { PDFDownloadLink } from "@react-pdf/renderer";
import FacturePdf from "../../components/FacturePdf/FacturePdf";
import loading from "../../assets/images/loading.gif";
import { formatDate } from "../../tools/utils";

import "./order.css";

function OrderDetails() {
  const [order, setOrder] = useState<IOrder>();
  const [isOrderLoaded, setIsOrderLoaded] = useState<boolean>(false);
  const [reservationProductsPDF, setReservationProductsPDF] = useState<any>();
  const [currentUserPDF, setCurrentUserPDF] = useState<IUser>();

  const { id } = useParams();
  const currentUser = useSelector((state: RootState) => state.user.user);

  const [getOrderById] = useLazyQuery(GET_ORDER_BY_ID);

  const handleGetOrderById = (id: string | undefined) => {
    getOrderById({ variables: { id } })
      .then(({ data }) => {
        setOrder(data.getOrderById[0]);
        setIsOrderLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    handleGetOrderById(id);
  }, []);

  // Function pour filtrer les reservation:
  // on crée un nouveau tableau avec un seul objet par produit reservé sur les memes dates
  // avec la quantité des produits ajoutés
  const reservationFilter = (reservations: IReservation[] | undefined) => {
    let reservationProducts: any[] = [];

    reservations?.forEach((reservation) => {
      const productId = reservation.product.id;

      // pour chaque reservation on recherche dans le tableau reservationProducts si on a déjà un produit avec le meme ID
      const existingProducts = reservationProducts.filter(
        (reservationProduct) => reservationProduct.product.id === productId
      );

      let foundSameDate = false;

      // pour tous les produits(reservations) déjà existant on regarde si on trouve les memes dates de location
      existingProducts?.forEach((existingProduct) => {
        if (
          existingProduct.reservation.start === reservation.start &&
          existingProduct.reservation.end === reservation.end
        ) {
          // si c'est le cas, on inctremente la quantité et on passe à true la variable foundSameDate
          existingProduct.quantity++;
          foundSameDate = true;
        }
      });

      // Si le dates ne sont pas les memes alors on crée un nouvel objet avec quantity = 1
      if (!foundSameDate) {
        reservationProducts.push({
          reservation: {
            id: reservation.id,
            start: reservation.start,
            end: reservation.end,
            price: reservation.price,
          },
          product: reservation.product,
          quantity: 1,
        });
      }
    });

    // Ordonner par ID de produit
    reservationProducts.sort((a, b) => {
      return a.product.id - b.product.id;
    });

    return reservationProducts;
  };

  const reservationProducts = reservationFilter(order?.reservations);

  useEffect(() => {
    setReservationProductsPDF(reservationProducts);
    setCurrentUserPDF(currentUser);
  }, [order]);

  const billName = `facture_WildBooking_${order?.id}`;

  return (
    <div className="orderDetailContainer">
      {isOrderLoaded && (
        <div>
          <h1 className="text-center">
            Commande du <strong>{order && formatDate(order.created_at)}</strong>
          </h1>
          <div className="retourCommandes">
            <Link
              className="text-dark RetourProfil text-decoration-none"
              to="/profil"
            >
              <FontAwesomeIcon
                icon={faChevronLeft}
                className="fas fa-chevron-left me-3 iconRetourProfil"
              />
              Mes commandes
            </Link>
          </div>
          <div className="printBill">
            <PDFDownloadLink
              document={
                <FacturePdf
                  reservationProductsPDF={reservationProductsPDF}
                  order={order}
                  currentUserPDF={currentUserPDF}
                />
              }
              fileName={billName}
            >
              {({ blob, url, loading, error }) =>
                loading ? "" : "Telecharger facture"
              }
            </PDFDownloadLink>
          </div>
          <div>
            {reservationProducts?.map((reservation) => (
              <ReservationCard
                key={reservation.reservation.id}
                reservation={reservation.reservation}
                product={reservation.product}
                quantity={reservation.quantity}
              />
            ))}
          </div>
          <div className="orderPriceContainer">
            <div className="orderPrice">Total : {order?.total_price} €</div>
          </div>
        </div>
      )}
      {!isOrderLoaded && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "40rem",
            marginBottom: "25rem",
          }}
        >
          <img style={{ width: "8rem" }} src={loading} alt="Loading" />
        </div>
      )}
    </div>
  );
}
//ReactDOM.render(<App />, document.getElementById("root"));

export default OrderDetails;
