import "./ProductCart.css";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import Card from "react-bootstrap/Card";
import IProductCartProps from "../../interfaces/IProductCartProps";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useDispatch } from "react-redux";
import { setCart } from "../../store/features/cartSlice";
import { getPeriod, readableDate, Toast } from "../../tools/utils";
import Swal from "sweetalert2";

export default function ProductCart({ cartItem }: IProductCartProps) {
  const cartStore = useSelector((state: RootState) => state.cart.cart);

  const dispatch = useDispatch();

  // ajoute au panier sur bouton +
  const addToCart = () => {
    if (cartItem.qtyInCart < cartItem.quantity) {
      const newQtyInCart = cartItem.qtyInCart + 1;
      const period = getPeriod(cartItem.dateFrom, cartItem.dateTo);
      const newProductPrice = cartItem.price * newQtyInCart * period;
      const updatedProduct = {
        ...cartItem,
        qtyInCart: newQtyInCart,
        subtotal: newProductPrice,
      };
      let updatedCart = cartStore.filter((product) => product.id !== cartItem.id);
      dispatch(setCart([...updatedCart, updatedProduct]));
    } else {
      Toast.fire({
        icon: 'warning',
        title: '<h3 class="m-0">Vous avez atteint le stock disponible !</h3>',
        width: '45rem'
      })
    }
  }

  // retire du panier sur bouton -
  const removeFromCart = () => {
    if (cartItem.qtyInCart <= 0) {
      cartItem.qtyInCart = 0;
    } else {
      const newQtyInCart = cartItem.qtyInCart - 1;
      const period = getPeriod(cartItem.dateFrom, cartItem.dateTo);
      const newProductPrice = cartItem.price * newQtyInCart * period;
      const updatedProduct = {
        ...cartItem,
        qtyInCart: newQtyInCart,
        subtotal: newProductPrice,
      };
      let updatedCart = cartStore.filter(
        (product) => product.id !== cartItem.id
      );
      dispatch(setCart([...updatedCart, updatedProduct]));
    }
  };

  // met à jour la quantité du produit au lieu de dupliquer le produit
  const updateQtyInCart = (productId: number, value: number) => {
    let selectedProduct = cartStore.find((product) => product.id === productId);
    if (selectedProduct && selectedProduct.qtyInCart) {
      const newQtyInCart = value;
      const period = getPeriod(cartItem.dateFrom, cartItem.dateTo);
      const newProductPrice = cartItem.price * newQtyInCart * period;
      const updatedProduct = {
        ...cartItem,
        qtyInCart: newQtyInCart,
        subtotal: newProductPrice,
      };
      let updatedCart = cartStore.filter((product) => product.id !== productId);
      newQtyInCart > 0
        ? dispatch(setCart([...updatedCart, updatedProduct]))
        : dispatch(setCart([...updatedCart]));
    }
  };

  // supprime le produit du panier
  const deleteItem = () => {
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir supprimer ce produit ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '<h4 class="m-0">Oui, supprimer !</h4>',
      cancelButtonText: '<h4 class="m-0">Annuler</h4>'
    }).then((result) => {
      if (result.isConfirmed) {
        let updatedCart = cartStore.filter(
          (product) => product.id !== cartItem.id
        );
        dispatch(setCart([...updatedCart]));
    }})
  };

  return (
    <div>
      {/* version mobile */}
      <Card className="cardContainerMobile">
        <div className="cardLeft">
          <Card.Img
            className="imgProduct"
            alt={cartItem.name}
            src={cartItem.image}
          />
          <Card.Text>Quantité</Card.Text>
          <div className="qtyInCartProduct">
            <Card.Text className="qtyInCartProduct">
              <AiOutlineMinusCircle
                style={{ color: "#9dbcd3", fontSize: "3rem" }}
                onClick={removeFromCart}
              />
              <Card.Text
                style={{ width: "3rem", textAlign: "center" }}
                onChange={(e: any) =>
                  updateQtyInCart(cartItem.id, e.target.value)
                }
              >
                {cartItem.qtyInCart}
              </Card.Text>
              <AiOutlinePlusCircle
                style={{ color: "#9dbcd3", fontSize: "3rem" }}
                onClick={addToCart}
              />
            </Card.Text>
          </div>
        </div>
        <div className="cardRight">
          <Card.Text>du {readableDate(cartItem.dateFrom)}</Card.Text>
          <Card.Text>au {readableDate(cartItem.dateTo)}</Card.Text>
          <hr className="hrStyle" />
          <Card.Text>
            soit {getPeriod(cartItem.dateFrom, cartItem.dateTo)} jour(s)
          </Card.Text>
          <br />
          <div className="priceProduct">
            <RiDeleteBin6Line
              style={{ color: "#9dbcd3", fontSize: "3rem" }}
              onClick={deleteItem}
            />
            <Card.Text>
              Prix : <span className="fw-bold fs-2">{cartItem.subtotal} €</span>
            </Card.Text>
          </div>
        </div>
      </Card>

      {/* version desktop */}
      <Card className="cardContainerDesktop">
        <Card.Img
          className="imgProduct"
          alt={cartItem.name}
          src={cartItem.image}
        />
        <div>
          <Card.Text className="mb-3">
            <span className="fw-bold fs-2">Période</span>
          </Card.Text>
          <Card.Text>du {readableDate(cartItem.dateFrom)}</Card.Text>
          <Card.Text>au {readableDate(cartItem.dateTo)}</Card.Text>
        </div>
        <div>
          <Card.Text className="mb-4">
            <span className="fw-bold fs-2">Durée</span>
          </Card.Text>
          <Card.Text>
            {getPeriod(cartItem.dateFrom, cartItem.dateTo)}{" "}
            jour(s)
          </Card.Text>
        </div>
        <div>
          <Card.Text  className="mb-3">
            <span className="fw-bold fs-2">Quantité</span>
          </Card.Text>
          <Card.Text className="qtyInCartProduct">
            <AiOutlineMinusCircle
              style={{ color: "#9dbcd3", fontSize: "3rem", cursor: "pointer" }}
              onClick={removeFromCart}
            />
            <Card.Text
              style={{ width: "3rem", textAlign: "center" }}
              onChange={(e: any) =>
                updateQtyInCart(cartItem.id, e.target.value)
              }
            >
              {cartItem.qtyInCart}
            </Card.Text>
            <AiOutlinePlusCircle
              style={{ color: "#9dbcd3", fontSize: "3rem", cursor: "pointer" }}
              onClick={addToCart}
            />
          </Card.Text>
        </div>
        <div>
          <Card.Text  className="mb-4">
            <span className="fw-bold fs-2">Prix</span>
          </Card.Text>
          <Card.Text>{cartItem.subtotal} €</Card.Text>
        </div>
        <div>
          <Card.Text  className="mb-3">
            <span className="fw-bold fs-2">Action</span>
          </Card.Text>
          <RiDeleteBin6Line
            style={{ color: "#9dbcd3", fontSize: "3rem", cursor: "pointer" }}
            onClick={deleteItem}
          />
        </div>
      </Card>
    </div>
  );
}
