import ICategory from "./ICategory";
import IProduct from "./IProduct";
import IProductCart from "./IProductCart";

export default interface IHomeProps {
 products: IProduct[],
 productsByDate: IProduct[],
 categories: ICategory[],
 lastFourProducts: IProduct[],
 cart: IProductCart[],
 setCart: (cart: IProductCart[]) => void,
}