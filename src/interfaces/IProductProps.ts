import IProduct from "./IProduct";
import IProductCart from "./IProductCart";

export default interface IProductProps {
 product: IProduct,
 productsByDate: IProduct[],
 cart: IProductCart[],
 setCart: (cart: IProductCart[]) => void,
}