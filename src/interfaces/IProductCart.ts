import IProduct from "./IProduct";

export default interface IProductCart extends IProduct {
  qtyInCart: number;
  subtotal: number;
}
