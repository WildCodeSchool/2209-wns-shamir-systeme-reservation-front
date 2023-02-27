import IProduct from "./IProduct";
import IUser from "./IUser";

export default interface IReservation {
  id: number;
  start: string;
  end: string;
  price: number;
  status: string;
  product: IProduct;
  order: {id: number, user: IUser}
}