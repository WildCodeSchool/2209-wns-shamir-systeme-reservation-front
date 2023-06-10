import IProduct from "./IProduct";
import IUser from "./IUser";

export default interface IReservation {
  id: number;
  start: string;
  end: string;
  price: number;
  status: string;
  product: IProduct;
  order: {id: number, user: IUser, total_price: number, status: number}
}
export interface IOrderReservation {
  start: string;
  end: string;
  price: number;
  product: IProduct;
}