import ICartItem from "./ICartItem";
import IProduct from "./IProduct";

export default interface ICartProps {
  products: IProduct[],
  cart: ICartItem[],
  addToCart: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  updateQty: (productId: number, value: number) => void;
  deleteItem: (productId: number) => void;
  updateSubtotal: () => void,
  setCart: any;
}