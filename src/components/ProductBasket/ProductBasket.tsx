import { useState } from 'react';
import "./ProductBasket.css";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import Card from 'react-bootstrap/Card';
import IProduct from "../../interfaces/IProduct";

export default function ProductBasket(product: IProduct) {
  const [total, setTotal] = useState<number>(0);
  
  // fonction qui permet d'incrémenter de 1 le nombre de produit
  const increment = () : void => {
    if (total >= 0) {
      setTotal(total + 1);
    }
  }

  // fonction qui permet de décrémenter de 1 le nombre de produit
  const decrement = () : void => {
    if (total > 0) {
      setTotal(total - 1);
    }
  }

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
            <Card.Text>
              <AiOutlinePlusCircle style={{color:"#9dbcd3", fontSize: "3rem"}} onClick={increment}/>
              <Card.Text>{/* insertion de la quantité */}{" "}{total}{" "}</Card.Text>
              <AiOutlineMinusCircle style={{color:"#9dbcd3", fontSize: "3rem"}} onClick={decrement}/>
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
            <RiDeleteBin6Line style={{color:"#9dbcd3", fontSize: "3rem"}}/>
            <Card.Text>Prix : <span className="fw-bold fs-2">{product.price} €</span></Card.Text>
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
          <Card.Text><span className="fw-bold fs-2">Quantité</span></Card.Text>
          <Card.Text>
            <AiOutlinePlusCircle style={{color:"#9dbcd3", fontSize: "3rem", cursor: "pointer"}} onClick={increment}/>
            {/* insertion de la quantité */}{" "}{total}{" "}
            <AiOutlineMinusCircle style={{color:"#9dbcd3", fontSize: "3rem", cursor: "pointer"}} onClick={decrement}/>
          </Card.Text>
        </div>
        <div>
          <Card.Text><span className="fw-bold fs-2">Prix</span></Card.Text>
          <Card.Text>{product.price} €</Card.Text>
        </div>
        <div>
          <Card.Text><span className="fw-bold fs-2">Durée</span></Card.Text>
          <Card.Text>du 25/01/2022</Card.Text>
          <Card.Text>au 27/01/2022</Card.Text>
        </div>
        <div>
          <Card.Text><span className="fw-bold fs-2">Action</span></Card.Text>
          <RiDeleteBin6Line style={{color:"#9dbcd3", fontSize: "3rem"}}/>
        </div>
      </Card>
    </div>
  )
}
