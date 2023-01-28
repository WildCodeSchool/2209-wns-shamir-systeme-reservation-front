import IProduct from "./IProduct";

export default interface ICartItem {
  product: IProduct,
  id: number;
  qty: number;
  subtotal: number;
  addToCart: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  updateQty: (productId: number, value: number) => void;
  deleteItem: (productId: number) => void;
}
