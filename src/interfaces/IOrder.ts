import IReservation from "./IReservation";

export default interface IOrder {
  id: number;
  created_at: Date;
  total_price: number;
  status: number;
  customerId : number;
  reservations: IReservation[]
}