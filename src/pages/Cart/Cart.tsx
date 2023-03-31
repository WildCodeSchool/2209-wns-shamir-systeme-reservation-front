import ProductCart from "../../components/ProductCart/ProductCart";
import Card from "react-bootstrap/Card";
import "./Cart.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Button } from "react-bootstrap";
import { CREATE_ORDER } from "../../graphql/mutations";
import { useMutation } from "@apollo/client";
import { getPeriod } from "../../tools/utils";
import { useDispatch } from "react-redux";
import { reset } from "../../store/features/cartSlice";
import { useNavigate } from "react-router-dom";
import { IOrderReservation } from "../../interfaces/IReservation";
import { resetFilter, resetProductsByDate } from "../../store/features/productsSlice";

function Cart() {
  const productsStore = useSelector(
    (state: RootState) => state.products.products
  );
  const cartStore = useSelector((state: RootState) => state.cart.cart);
  const userStore = useSelector((state: RootState) => state.user.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // permet de trier les produits par id avant de les afficher dans le panier
  const sortedItems = [...cartStore].sort((a, b) => a.id - b.id);

  // permet de récupérer le total des prix de chaque produit du panier
  let totalPrice = 0;
  sortedItems.forEach((element) => (totalPrice += element.subtotal));

  // permet de récupérer le nombre de produit dans le panier
  let totalQtyInCart = 0;
  sortedItems.forEach((element) => (totalQtyInCart += element.qtyInCart));

  const [createOrder] = useMutation(CREATE_ORDER);
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

  // permet de vider le panier
  const handleEmpty = () => {
    const confirmEmpty = window.confirm(
      "Êtes-vous certain de vouloir vider votre panier ?"
    );
    if (confirmEmpty) {
      dispatch(reset());
    }
  };

  return (
    <div className="cartContainer">
      <h1 className="mb-5">Mon panier</h1>

      {/* affichage ou non du bouton 'vider le panier' */}
      {sortedItems.length !== 0 ? (
        <div className="btnEmptyCart">
          <Button className="btnWild" onClick={handleEmpty}>
            Vider mon panier
          </Button>
        </div>
      ) : null}

      {/* affichage ou non de la liste des produits dans le panier */}
      <div className="row">
        {sortedItems.map((cartItem) => {
          const isThereProduct = productsStore.find(
            (product) => product.id === cartItem.id
          );
          if (isThereProduct !== undefined) {
            return (
              <div key={cartItem.id}>
                <ProductCart cartItem={cartItem} />
              </div>
            );
          } else {
            return null;
          }
        })}

        {/* affichage ou non du total du panier */}
        {totalQtyInCart ? (
          <div className="cartList">
            {/* version mobile */}
            <Card className="cardContainerTotalMobile">
              <div className="total">
                <Card.Text className="fw-bold fs-2">
                  Nombre de produits :
                </Card.Text>
                <Card.Text className="fw-bold fs-2">{totalQtyInCart}</Card.Text>
              </div>
              <div className="total">
                <Card.Text className="fw-bold fs-2">Prix total : </Card.Text>
                <Card.Text className="fw-bold fs-2"> {totalPrice} €</Card.Text>
              </div>
              <div className="btnValid">
                <Button className="btnWild" onClick={() => navigate('/commande')}>
                  Valider ma commande
                </Button>
              </div>
            </Card>
            {/* version desktop */}
            <Card className="cardContainerTotalDesktop">
              <div className="total">
                <div className="total">
                  <Card.Text className="fw-bold fs-2">
                    Nombre de produits :
                  </Card.Text>
                  <Card.Text className="fw-bold fs-2 ms-5">
                    {totalQtyInCart}
                  </Card.Text>
                </div>
                <div className="total">
                  <Card.Text className="fw-bold fs-2">Prix total :</Card.Text>
                  <Card.Text className="fw-bold fs-2 ms-5">
                    {totalPrice} €
                  </Card.Text>
                </div>
              </div>
              <div className="btnValid">
                <Button className="btnWild" onClick={() => navigate('/commande')}>
                  Valider ma commande
                </Button>
              </div>
            </Card>
          </div>
        ) : (
          <p className="msgPanierVide">Votre panier est vide.</p>
        )}
      </div>
    </div>
  );
}

export default Cart;
