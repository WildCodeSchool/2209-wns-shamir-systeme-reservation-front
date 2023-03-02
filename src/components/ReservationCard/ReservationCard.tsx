import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import IReservationCard from "../../interfaces/IReservationCard";
import { getPeriod, readableDate } from "../../tools/utils";
import "../ProductCart/ProductCart.css";

export default function ReservationCard({
  reservation,
  product,
  quantity,
}: IReservationCard) {
 
  const [productsReservationPrice, setProductsReservationPrice] = useState<number>();
  


  useEffect(() => {
    const prixOneProductReservation = reservation.price;
    setProductsReservationPrice( quantity * prixOneProductReservation)
  }, [])

  return (
    <div>
      <Card className="cardContainerMobile">
        {" "}
        {/* version mobile */}
        <div className="cardLeft">
          <Card.Img
            className="imgProduct"
            alt={product.name}
            src={product.image}
          />
              <div>
          <Card.Text style={{ marginBottom: "1.5rem" }}>
            <span className="fw-bold fs-2">Quantité</span>
          </Card.Text>
          <Card.Text className="qtyInCartProduct">
            <Card.Text style={{ width: "3rem", textAlign: "center" }}>
              {quantity}
            </Card.Text>
          </Card.Text>
        </div>
        </div>
        <div className="cardRight">
          <Card.Text>du {readableDate(reservation.start)}</Card.Text>
          <Card.Text>au {readableDate(reservation.end)}</Card.Text>
          <hr style={{ width: "11rem", marginTop: "0" }} />
          <Card.Text>
            soit {getPeriod(reservation.start, reservation.end)} jour(s)
          </Card.Text>
          <br />
          <div className="priceProduct">
            <Card.Text>
              Prix : <span className="fw-bold fs-2">{productsReservationPrice}€</span>
            </Card.Text>
          </div>
        </div>
      </Card>

      <Card className="cardContainerDesktop">
        {" "}
        {/* version desktop */}
        <Card.Img
          className="imgProduct"
          alt={product.name}
          src={product.image}
        />
        <div>
          <Card.Text style={{ marginBottom: "1.5rem" }}>
            <span className="fw-bold fs-2">Prix/Jour</span>
          </Card.Text>
          <Card.Text> {product.price} €</Card.Text>
        </div>
        <div>
          <Card.Text style={{ marginBottom: "1.5rem" }}>
            <span className="fw-bold fs-2">Quantité</span>
          </Card.Text>
          <Card.Text className="qtyInCartProduct">
            <Card.Text style={{ width: "3rem", textAlign: "center" }}>
              {quantity}
            </Card.Text>
          </Card.Text>
        </div>
        <div>
          <Card.Text style={{ marginBottom: "1.5rem" }}>
            <span className="fw-bold fs-2">Prix Total</span>
          </Card.Text>
          <Card.Text> {productsReservationPrice} €</Card.Text>
        </div>
        <div>
          <Card.Text style={{ marginBottom: "0.5rem" }}>
            <span className="fw-bold fs-2">Période</span>
          </Card.Text>
          <Card.Text>du {readableDate(reservation.start)}</Card.Text>
          <Card.Text>au {readableDate(reservation.end)}</Card.Text>
          <Card.Text>
            soit {getPeriod(reservation.start, reservation.end)} jour(s)
          </Card.Text>
        </div>
      </Card>
    </div>
  );
}
