import "./ProductCard.css"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import IProductProps from "../../interfaces/IProductProps";
import IProductCart from "../../interfaces/IProductCart";
import { useLocation } from 'react-router-dom';

function ProductCard({product, productsByDate, cart, setCart}: IProductProps) {

  const location = useLocation();

  const productCart: IProductCart = {...product, qtyInCart: 0, subtotal: 0};

  const handleAddToCart = () => {
    let selectedProduct = cart.find(product => product.id === productCart.id);
    if(selectedProduct === undefined){
      selectedProduct = productCart
    }
    const newQty = selectedProduct.qtyInCart + 1;
    const newPrice = selectedProduct.price * newQty;
    const productCartUpdated = {...selectedProduct, qtyInCart: newQty, subtotal: newPrice};
    let updatedCart = cart.filter(product => product.id !== selectedProduct?.id);
    setCart([...updatedCart, productCartUpdated]);
  }

  return (
  <Card key={product.id} className={ location.pathname === '/catalogue'  ? "col-lg-3 col-md-5 col-sm-10 col-11 m-4 p-4"  : "col-12 col-md-2 card_product"} >
    <Card.Img alt={product.name} src={product.image} />
    <Card.Body className="d-flex align-content-between flex-wrap">
    <div>
      <Card.Title className="fs-2 mb-4">{product.name}</Card.Title>
      <Card.Text>{product.description}</Card.Text>
    </div>
      <Card.Text className="mt-4">Prix / Jour : <span className="fw-bold fs-2">{product.price} €</span></Card.Text>
    </Card.Body>
    {
     productsByDate.length ? (<Button className="fs-2 p-3 col-7 m-auto" onClick={handleAddToCart}>Ajouter au panier</Button>) : ""
    }
  </Card>
  )
}

export default ProductCard