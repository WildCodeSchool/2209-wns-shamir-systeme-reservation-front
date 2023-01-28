import ProductCart from '../../components/ProductCart/ProductCart';
import ICartItem from '../../interfaces/ICartItem';
import ICartProps from '../../interfaces/ICartProps';
import "./Cart.css";

function Cart({products, cart, updateSubtotal}: ICartProps, {product, id, qty, subtotal, addToCart, removeFromCart, updateQty, deleteItem}: ICartItem) {

  return (
    <div className='cart_container'>
      <h1 className='text-center mb-5'>Mon panier</h1>
      <div className='row'>
        {cart.map(cartItem => {
          const productTest = products.find(product => product.id === cartItem.id );
          if(productTest !== undefined){
            return (
              <div key={cartItem.id}>
              <ProductCart product={product} id={id} qty={qty} subtotal={subtotal} addToCart={addToCart} removeFromCart={removeFromCart} updateQty={updateQty} deleteItem={deleteItem} />
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