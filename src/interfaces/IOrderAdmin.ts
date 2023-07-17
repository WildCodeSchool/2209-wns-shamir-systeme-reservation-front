import IReservation from "./IReservation";
import IUser from "./IUser";

export default interface IOrderAdmin {
  id: number;
  created_at: Date;
  total_price: number;
  status: number;
  customerId : number;
  reservations: IReservation[];
  user: IUser;
}