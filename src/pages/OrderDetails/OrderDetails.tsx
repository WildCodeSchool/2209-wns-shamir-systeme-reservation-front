import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GET_ORDER_BY_ID } from "../../graphql/queries";
import IOrder from "../../interfaces/IOrder";
import ReservationCard from "../../components/ReservationCard/ReservationCard";
import "./order.css";
import { formatDate } from "../../tools/utils";
import IReservation from "../../interfaces/IReservation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

function OrderDetails() {
  const [order, setOrder] = useState<IOrder>();
  const { id } = useParams();

  const [getOrderById] = useLazyQuery(GET_ORDER_BY_ID);

  const handleGetOrderById = (id: string | undefined) => {
    getOrderById({ variables: { id } })
      .then(({ data }) => {
        setOrder(data.getOrderById[0]);
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

  return (
    <div className="orderDetailContainer">
      <h1 className="text-center">
        Commande du <strong>{order && formatDate(order.created_at)}</strong>
      </h1>
      <div className="retourCommandes" >
          <Link className="text-dark RetourProfil text-decoration-none" to="/profil">
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="fas fa-chevron-left me-3 iconRetourProfil"
            />
            Mes commandes
          </Link>
        </div>
        {reservationProducts?.map((reservation) => (
          <ReservationCard
            key={reservation.reservation.id}
            reservation={reservation.reservation}
            product={reservation.product}
            quantity={reservation.quantity}
          />
        ))}
        <div className="orderPriceContainer">
          <div className="orderPrice">Total : {order?.total_price} €</div>
        </div>
    </div>
  );
}

export default OrderDetails;
