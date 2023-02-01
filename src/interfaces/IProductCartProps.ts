import IProductCart from "./IProductCart";

export default interface IProductCartProps {
  cartItem: IProductCart;
  cart: IProductCart[];
  setCart: (cart : IProductCart[]) => void;
}