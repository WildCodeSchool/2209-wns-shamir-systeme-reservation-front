import "./ProductCart.css";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import Card from 'react-bootstrap/Card';
import IProductCartProps from "../../interfaces/IProductCartProps";

export default function ProductCart({cartItem, cart, setCart}: IProductCartProps) {

  // ajoute au panier sur bouton +
  const addToCart = () => {
    const newQtyInCart = cartItem.qtyInCart + 1;
    const newProductPrice = cartItem.price * newQtyInCart;
    const updatedProduct = {...cartItem, qtyInCart: newQtyInCart, subtotal: newProductPrice};
    let updatedCart = cart.filter(product => product.id !== cartItem.id);
    setCart([...updatedCart, updatedProduct]);
  };
  
  // retire du panier sur bouton -
  const removeFromCart = () => {
    if(cartItem.qtyInCart <= 0) {
      cartItem.qtyInCart = 0
    } else {
      const newQtyInCart = cartItem.qtyInCart - 1;
      const newProductPrice = cartItem.price * newQtyInCart;
      const updatedProduct = {...cartItem, qtyInCart: newQtyInCart, subtotal: newProductPrice};
      let updatedCart = cart.filter(product => product.id !== cartItem.id);
      setCart([...updatedCart, updatedProduct]);
    }
  };

  // met à jour la quantité du produit au lieu de dupliquer le produit
  const updateQtyInCart = (productId: number, value: number) => {
    let selectedProduct = cart.find(product => product.id === productId);
    if(selectedProduct && selectedProduct.qtyInCart){
      const newQtyInCart = value;
      const newProductPrice = cartItem.price * newQtyInCart;
      const updatedProduct = {...cartItem, qtyInCart: newQtyInCart, subtotal: newProductPrice};
      let updatedCart = cart.filter(product => product.id !== productId);
      newQtyInCart > 0 ? setCart([...updatedCart, updatedProduct]) : setCart([...updatedCart]);
    }
  };

  // supprime le produit du panier
  const deleteItem = () => {
    const reallyDelete = window.confirm("Souhaitez-vous confirmer la suppression de ce produit ?");
    if(reallyDelete){
      const newQtyInCart = 0;
      const newProductPrice = cartItem.price * newQtyInCart;
      const updatedProduct = {...cartItem, qtyInCart: newQtyInCart, subtotal: newProductPrice};
      let updatedCart = cart.filter(product => product.id !== cartItem.id);
      setCart([...updatedCart, updatedProduct]);
    }
  };

  return (
    <div>
      <Card className="cardContainerMobile"> {/* version mobile */}
        <div className="cardLeft">
          <Card.Img 
            className="imgProduct"
            alt={cartItem.name} 
            src={cartItem.image} 
          />
          <Card.Text>Quantité</Card.Text>
          <div className="qtyInCartProduct">
            <Card.Text className="qtyInCartProduct">
              <AiOutlineMinusCircle style={{color:"#9dbcd3", fontSize: "3rem"}} onClick={removeFromCart}/>
              <Card.Text style={{width: "3rem", textAlign:"center"}} onChange={(e: any) => updateQtyInCart(cartItem.id, e.target.value)}>{cartItem.qtyInCart}</Card.Text>
              <AiOutlinePlusCircle style={{color:"#9dbcd3", fontSize: "3rem"}} onClick={addToCart}/>
            </Card.Text>
          </div>
        </div>
        <div className="cardRight">
          <Card.Text>du 25/01/2022</Card.Text>
          <Card.Text>au 27/01/2022</Card.Text>
          <hr style={{width:"11rem", marginTop: "0"}}/>
          <Card.Text>soit {/* calcul du nb de jour */}2 jour(s)</Card.Text>
          <br />
          <div className="priceProduct">
            <RiDeleteBin6Line style={{color:"#9dbcd3", fontSize: "3rem"}} onClick={deleteItem}/>
            <Card.Text>Prix : <span className="fw-bold fs-2">{cartItem.subtotal} €</span></Card.Text>
          </div>
        </div>      
      </Card>

      <Card className="cardContainerDesktop"> {/* version desktop */}
        <Card.Img 
          className="imgProduct"
          alt={cartItem.name} 
          src={cartItem.image} 
        />
        <div>
          <Card.Text style={{marginBottom:"1.5rem"}}><span className="fw-bold fs-2">Quantité</span></Card.Text>
          <Card.Text className="qtyInCartProduct">
            <AiOutlineMinusCircle style={{color:"#9dbcd3", fontSize: "3rem", cursor: "pointer"}} onClick={removeFromCart} />
            <Card.Text style={{width: "3rem", textAlign:"center"}} onChange={(e: any) => updateQtyInCart(cartItem.id, e.target.value)}>{cartItem.qtyInCart}</Card.Text>
            <AiOutlinePlusCircle style={{color:"#9dbcd3", fontSize: "3rem", cursor: "pointer"}} onClick={addToCart} />
          </Card.Text>
        </div>
        <div>
          <Card.Text style={{marginBottom:"1.5rem"}}><span className="fw-bold fs-2">Prix</span></Card.Text>
          <Card.Text>{cartItem.subtotal} €</Card.Text>
        </div>
        <div>
          <Card.Text style={{marginBottom:"0.5rem"}}><span className="fw-bold fs-2">Durée</span></Card.Text>
          <Card.Text>du 25/01/2022</Card.Text>
          <Card.Text>au 27/01/2022</Card.Text>
        </div>
        <div>
          <Card.Text style={{marginBottom:"1.5rem"}}><span className="fw-bold fs-2">Action</span></Card.Text>
          <RiDeleteBin6Line style={{color:"#9dbcd3", fontSize: "3rem", cursor: "pointer"}} onClick={deleteItem}/>
        </div>
      </Card>
    </div>
  )
}