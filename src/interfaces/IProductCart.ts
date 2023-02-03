import IProduct from "./IProduct";

export default interface IProductCart extends IProduct {
  dateFrom: string;
  dateTo: string;
  qtyInCart: number;
  subtotal: number;
}
