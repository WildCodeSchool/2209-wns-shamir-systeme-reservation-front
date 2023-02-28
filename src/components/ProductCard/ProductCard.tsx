import "./ProductCard.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import IProductProps from "../../interfaces/IProductProps";
import IProductCart from "../../interfaces/IProductCart";
import { useLocation } from "react-router-dom";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setCart } from "../../store/features/cartSlice";
import { getPeriod } from "../../tools/utils";

function ProductCard({ product, isSearchFromHome }: IProductProps) {
  const location = useLocation();
  const dispatch = useDispatch();

  const productsByDateStore = useSelector(
    (state: RootState) => state.products.productsByDate
  );
  const cartStore = useSelector((state: RootState) => state.cart.cart);
  const productFilterStore = useSelector(
    (state: RootState) => state.products.filter
  );

  const productCart: IProductCart = {
    ...product,
    dateFrom: "",
    dateTo: "",
    qtyInCart: 0,
    subtotal: 0,
  };

  const handleAddToCart = () => {
    let selectedProduct = cartStore.find(
      (product) => product.id === productCart.id
    );
    if (selectedProduct === undefined) {
      selectedProduct = productCart;
    }
    if (selectedProduct.qtyInCart < product.quantity) {
      const newQty = selectedProduct.qtyInCart + 1;
      const period = getPeriod(productFilterStore.period.dateFrom, productFilterStore.period.dateTo);
      const newPrice = selectedProduct.price * newQty * period;
      const productCartUpdated = {
        ...selectedProduct,
        dateFrom: productFilterStore.period.dateFrom,
        dateTo: productFilterStore.period.dateTo,
        qtyInCart: newQty,
        subtotal: newPrice,
      };
      let updatedCart = cartStore.filter(
        (product) => product.id !== selectedProduct?.id
      );
      const newCart = [...updatedCart, productCartUpdated];
      dispatch(setCart(newCart));

      // ajout de pastille du nombre de produits sur icône panier
      const pillCart = document.querySelector(".pillCart");
      const pillCart2 = document.querySelector(".pillCartMobile");
      pillCart?.classList.add("pillCartSub");
      pillCart2?.classList.add("pillCartSub");
      setTimeout(() => {
        pillCart?.classList.remove("pillCartSub");
        pillCart2?.classList.remove("pillCartSub");
      }, 1000)
    } else {
      window.alert("Vous avez atteint le stock disponible !")
    }
    
  };

  return (
    <Card
      key={product.id}
      className={
        location.pathname === "/catalogue"
          ? "col-lg-3 col-md-5 col-sm-10 col-11 m-4 p-4"
          : "col-12 col-md-2 card_product"
      }
    >
      <Card.Img alt={product.name} src={product.image} />
      <Card.Body className="d-flex align-content-between flex-wrap">
        <div>
          <Card.Title className="fs-2 mb-4">{product.name}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
        </div>
        <Card.Text className="mt-4">
          Prix / Jour : <span className="fw-bold fs-2">{product.price} €</span>
        </Card.Text>
      </Card.Body>
      {isSearchFromHome || productsByDateStore.length ? (
        <>
          <Card.Body className="d-flex align-content-between flex-wrap">
            <Card.Text>
              Stock : <span className="fw-bold fs-2 mx-2 align-middle"> {product.quantity} </span>
            </Card.Text>
          </Card.Body>
          <Button className="btn btn-primary btnWild fs-2 p-3 col-7 m-auto" onClick={handleAddToCart}>
            Ajouter au panier
          </Button>
        </>
      ) : (
        ""
      )}
    </Card>
  );
}

export default ProductCard;
