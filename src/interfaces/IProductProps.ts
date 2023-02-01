import IProduct from "./IProduct";
import IProductCart from "./IProductCart";

export default interface IProductProps {
 product: IProduct,
 isSearchFromHome?: boolean
 cart: IProductCart[],
 setCart: (cart: IProductCart[]) => void,
}