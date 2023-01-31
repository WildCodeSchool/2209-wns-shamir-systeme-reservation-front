import ICategory from "./ICategory";
import IProduct from "./IProduct";


export default interface IHomeProps {
 products: IProduct[],
 productsByDate: IProduct[],
 categories: ICategory[],
 lastFourProducts: IProduct[]
}