import "./ProductCart.css";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import Card from 'react-bootstrap/Card';
import ICartItem from "../../interfaces/ICartItem";

export default function ProductCart({product, id, qty, subtotal, addToCart, removeFromCart, updateQty, deleteItem}: ICartItem) {
  
  return (
    <div>
      <Card className="cardContainerMobile"> {/* version mobile */}
        <div className="cardLeft">
          <Card.Img 
            className="imgProduct"
            alt={product.name} 
            src={product.image} 
          />
          <Card.Text>Quantité</Card.Text>
          <div className="qtyProduct">
            <Card.Text className="qtyProduct">
              <AiOutlinePlusCircle style={{color:"#9dbcd3", fontSize: "3rem"}} onClick={() => addToCart(product.id)}/>
              <Card.Text style={{width: "3rem", textAlign:"center"}} onChange={(e: any) => updateQty(product.id, e.target.value)}>{qty}</Card.Text>
              <AiOutlineMinusCircle style={{color:"#9dbcd3", fontSize: "3rem"}} onClick={() => removeFromCart(product.id)}/>
            </Card.Text>
          </div>
        </div>
        <div className="cardRight">
          <Card.Text>du 25/01/2022</Card.Text>
          <Card.Text>au 27/01/2022</Card.Text>
          <hr style={{width:"13rem"}}/>
          <Card.Text>soit {/* calcul du nb de jour */}2 jour(s)</Card.Text>
          <br />
          <div className="priceProduct">
            <RiDeleteBin6Line style={{color:"#9dbcd3", fontSize: "3rem"}} onClick={e => deleteItem(product.id)}/>
            <Card.Text>Prix : <span className="fw-bold fs-2">{subtotal} €</span></Card.Text>
          </div>
        </div>      
      </Card>

      <Card className="cardContainerDesktop"> {/* version desktop */}
        <Card.Img 
          className="imgProduct"
          alt={product.name} 
          src={product.image} 
        />
        <div>
          <Card.Text style={{marginBottom:"1.5rem"}}><span className="fw-bold fs-2">Quantité</span></Card.Text>
          <Card.Text className="qtyProduct">
            <AiOutlinePlusCircle style={{color:"#9dbcd3", fontSize: "3rem", cursor: "pointer"}} onClick={() => addToCart(product.id)} />
            <Card.Text style={{width: "3rem", textAlign:"center"}} onChange={(e: any) => updateQty(product.id, e.target.value)}>{qty}</Card.Text>
            <AiOutlineMinusCircle style={{color:"#9dbcd3", fontSize: "3rem", cursor: "pointer"}} onClick={() => removeFromCart(product.id)} />
          </Card.Text>
        </div>
        <div>
          <Card.Text style={{marginBottom:"1.5rem"}}><span className="fw-bold fs-2">Prix</span></Card.Text>
          <Card.Text>{subtotal} €</Card.Text>
        </div>
        <div>
          <Card.Text style={{marginBottom:"0.5rem"}}><span className="fw-bold fs-2">Durée</span></Card.Text>
          <Card.Text>du 25/01/2022</Card.Text>
          <Card.Text>au 27/01/2022</Card.Text>
        </div>
        <div>
          <Card.Text style={{marginBottom:"1.5rem"}}><span className="fw-bold fs-2">Action</span></Card.Text>
          <RiDeleteBin6Line style={{color:"#9dbcd3", fontSize: "3rem"}} onClick={() => deleteItem(product.id)}/>
        </div>
      </Card>
    </div>
  )
}
