import { useLazyQuery, useMutation } from "@apollo/client";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { IOrderReservation } from "../../interfaces/IReservation";
import { RootState } from "../../store";
import { getPeriod, readableDate } from "../../tools/utils";
import { PAYMENT_ORDER } from "../../graphql/queries";
import { DELETE_ORDER } from "../../graphql/mutations";

function OrderConfirm() {
  const productsStore = useSelector(
    (state: RootState) => state.products.products
  );
  const cartStore = useSelector((state: RootState) => state.cart.cart);
  const userStore = useSelector((state: RootState) => state.user.user);

  const [paymentOrder] = useLazyQuery(PAYMENT_ORDER);
  const [deleteOrder] = useMutation(DELETE_ORDER);

  const navigate = useNavigate();

  // permet de trier les produits par id avant de les afficher
  const sortedItems = [...cartStore].sort((a, b) => a.id - b.id);

  // permet de récupérer le total des prix de chaque produit
  let totalPrice = 0;
  sortedItems.forEach((element) => (totalPrice += element.subtotal));

  // permet de récupérer le nombre de produit dans le panier
  let totalQtyInCart = 0;
  sortedItems.forEach((element) => (totalQtyInCart += element.qtyInCart));

  // on crée un tableau de réservations
  const reservations: IOrderReservation[] = [];
  // on boucle dans le cartStore pour récupérer chaque réservation et l'envoyer dans le tableau
  cartStore.map((productCart) => {
    const productOrder = productsStore.find(
      (product) => product.id === productCart.id
    );
    if (productOrder) {
      for (let index = 0; index < productCart.qtyInCart; index++) {
        const reservation: IOrderReservation = {
          start: productCart.dateFrom,
          end: productCart.dateTo,
          price:
            productCart.price *
            getPeriod(productCart.dateFrom, productCart.dateTo),
          product: productOrder,
        };
        reservations.push(reservation);
      }
    }
  });

  const handlePayment = async () => {
    try {
        const orderIdToConfirm = localStorage.getItem("orderIdToConfirm");
        const result = await paymentOrder({ variables: {userId: userStore.id, orderId: orderIdToConfirm ? parseInt(orderIdToConfirm) : 0}})
        window.location.replace(result.data.paymentOrder);
    } catch (error) {
      console.log('====================================');
      console.log('error dans front ', error);
      console.log('====================================');
    }
  };

  const handleContinueShop = async () => {
    try {
      const orderId = localStorage.getItem("orderIdToConfirm");
      localStorage.removeItem("orderIdToConfirm");
      await deleteOrder({ variables: {orderId: orderId ? parseInt(orderId) : 0}})
      navigate('/catalogue')
    
    } catch (error) {
      console.log('====================================');
      console.log('error dans front ', error);
      console.log('====================================');
    }
  };

  return (
    <div className="container-sm">
      <main role="main" className="mainProfil">
        <div className="row justify-content-center mt-10">
          <h1 className="text-center titleResetPassword">
            Récapitulatif de la commande
          </h1>
          <div className="row justify-content-between mt-5">
            <div className="col-md-4 mt-4 card-profil p-4 infoRecap">
              <h3 className="titleRecap2 mb-4">Mes informations personnelles</h3>
              <div className="card-RecapCommand me-5 mb-5">
                <span className="fw-bold">Nom Prénom :</span>
                <p className="m-0">
                  {userStore.lastname} {userStore.firstname}
                </p>
                <span className="fw-bold">Email :</span>
                <p className="m-0">{userStore.email}</p>
              </div>
              <h3 className="titleRecap2 mb-4 mt-3">
                Venez récupérer vos réservations
              </h3>
              <div className="card-RecapCommand me-5 mb-3">
                <span className="fw-bold">Boutique WILD Booking</span>
                <p className="m-0">10 Rue de la Montagne - Alpes, FRANCE</p>
                <span className="fw-bold">Téléphone :</span>
                <p className="m-0">02 99 88 77 55</p>
              </div>
              <Button className="btnWild w-100 mt-5" onClick={handlePayment}>
                  Payer ma commande
              </Button>
              <button className="btnWildOutline w-100 mt-5" onClick={() => handleContinueShop()}>
                  Continuer mes achats
              </button>
            </div>
            <div className="col-md-5 mt-4 card-RecapCommand">
              <h2 className="text-center mb-3 text-uppercase">Commande</h2>
              {sortedItems.map((cartItem) => {
                const isThereProduct = productsStore.find(
                  (product) => product.id === cartItem.id
                );
                if (isThereProduct !== undefined) {
                  return (
                    <Card className="mb-3">
                      <Card.Body className="row justify-content-between align-items-center">
                        <Card.Text className="col-sm-8 col-md-12 col-lg-8 imgCard">
                          <Card.Img
                            className="imgProduct"
                            alt={cartItem.name}
                            src={cartItem.image}
                          />
                          <Card.Text>
                            Quantité :{" "}
                            <span className="fw-bold fs-2">
                              {cartItem.qtyInCart}
                            </span>
                          </Card.Text>
                          <hr className="hrRecap" />
                        </Card.Text>
                        <Card.Text className="col-sm-4 col-md-12 col-lg-4 cardRecap">
                          Prix / Jour :{" "}
                          <span className="fw-bold fs-2">
                            {cartItem.price} €
                          </span>
                          <Card.Text>
                            du {readableDate(cartItem.dateFrom)}
                          </Card.Text>
                          <Card.Text>
                            au {readableDate(cartItem.dateTo)}
                          </Card.Text>
                          <hr />
                          <Card.Text>
                            soit {getPeriod(cartItem.dateFrom, cartItem.dateTo)}{" "}
                            jour(s)
                          </Card.Text>
                          <hr />
                          <Card.Text>
                            Total : {cartItem.subtotal} €
                          </Card.Text>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  );
                } else {
                  return null;
                }
              })}
               <hr />
               <p className="m-0 text-end">
                Prix total :{" "}
                <span className="fw-bold fs-2">{totalPrice} €</span>
               </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default OrderConfirm;
