import { useLocation } from 'react-router-dom'
import ProductCart from '../../components/ProductCart/ProductCart';
import ICartProps from '../../interfaces/ICartProps';
import Card from 'react-bootstrap/Card';
import "./Cart.css";

function Cart({products, cart, setCart}: ICartProps) {

  const location = useLocation();
  if(location.state !== null) {
    setCart(location.state);
    location.state = null;
  }

  // permet de trier les produits par id avant de les afficher dans le panier
  const sortedItems = [...cart].sort((a,b) => a.id - b.id);

  // permet de récupérer le total des prix de chaque produit du panier
  let totalPrice = 0;
  sortedItems.forEach(element => totalPrice += element.subtotal);

  // permet de récupérer le nombre de produit dans le panier
  let totalQtyInCart = 0;
  sortedItems.forEach(element => totalQtyInCart += element.qtyInCart);

  return (
    <div className='cart_container'>
      <h1 className='text-center mb-5'>Mon panier</h1>
      <div className='row'>
        {sortedItems.map(cartItem => {
          const isThereProduct = products.find(product => product.id === cartItem.id );
          if(isThereProduct !== undefined){
            return (
              <div key={cartItem.id}>
                <ProductCart cartItem={cartItem} cart={cart} setCart={setCart} />
              </div>
              )
            } else {
              return null;
            }
          })}
          {/* partie total */}
          {totalQtyInCart ? (
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
              <Card className="cardContainerTotalMobile"> {/* version mobile */}
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Card.Text className="fw-bold fs-2">Nombre de produits : </Card.Text>
                  <Card.Text className="fw-bold fs-2">{" "}{totalQtyInCart}</Card.Text>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Card.Text className="fw-bold fs-2">Prix total : </Card.Text>
                  <Card.Text className="fw-bold fs-2">{" "}{totalPrice} €</Card.Text>
                </div>
              </Card>
              <Card className="cardContainerTotalDesktop"> {/* version desktop */}
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Card.Text className="fw-bold fs-2">Nombre de produits : </Card.Text>
                  <Card.Text className="fw-bold fs-2" style={{ marginLeft: "1rem" }}>{" "}{totalQtyInCart}</Card.Text>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Card.Text className="fw-bold fs-2">Prix total : </Card.Text>
                  <Card.Text className="fw-bold fs-2" style={{ marginLeft: "1rem" }}>{" "}{totalPrice} €</Card.Text>
                </div>
              </Card>
            </div>
          ) : null }
      </div>
    </div>
  )
}

export default Cart;