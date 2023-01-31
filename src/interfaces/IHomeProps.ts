import IProduct from "./IProduct";
import IProductCart from "./IProductCart";

export default interface IHomeProps {
 products: IProduct[],
 productsByDate: IProduct[],
 cart: IProductCart[],
 setCart: (cart: IProductCart[]) => void,
}