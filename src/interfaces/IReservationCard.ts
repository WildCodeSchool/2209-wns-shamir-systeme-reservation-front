import IProduct from "./IProduct"
import IReservation from "./IReservation";

export default interface IReservationCard {
  reservation: IReservation;
  product: IProduct;
  quantity: number;
}