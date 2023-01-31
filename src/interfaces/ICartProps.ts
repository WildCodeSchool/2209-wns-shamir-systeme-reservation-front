import IProduct from "./IProduct";
import IProductCart from "./IProductCart";

export default interface ICartProps {
  products: IProduct[],
  cart: IProductCart[],
  setCart: (cart: IProductCart[]) => void,
}