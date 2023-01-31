import { useLocation } from 'react-router-dom'
import ProductCart from '../../components/ProductCart/ProductCart';
import ICartProps from '../../interfaces/ICartProps';
import "./Cart.css";

function Cart({products, cart, setCart}: ICartProps) {

  const location = useLocation();
  if(location.state !== null) {
    setCart(location.state);
    location.state = null;
  }

  // permet de trier les produits par id avant de les afficher dans le panier
  const sortedItems = [...cart].sort((a,b) => a.id - b.id);

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
      </div>
    </div>
  )
}

export default Cart;