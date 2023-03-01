import { Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import IOrder from "../../interfaces/IOrder";
import { formatDate } from "../../tools/utils";

function OrderCard(order: IOrder) {

  return (
    <tbody>
    <tr>
      <td>
        Commande du
        <br />
        <strong>{formatDate(order.created_at)}</strong>
      </td>
      <td>
        Total :<strong> {order.total_price} €</strong>
      </td>
      <td>
        Statut
        <br />
        <div>
          <Badge pill bg="dark">
           { order.status === 1 ?  "Confirmée" : "Annullée" }
          </Badge>
        </div>
      </td>
      <td>
      <Link className='link' to={`/commande/${order.id}`}>
      Voir
      </Link>
      </td>
    </tr>
  </tbody>
  );
}

export default OrderCard;
