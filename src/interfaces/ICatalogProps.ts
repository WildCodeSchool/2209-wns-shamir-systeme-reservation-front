import ICategory from "./ICategory";
import IProduct from "./IProduct";

export default interface ICatalogProps {
  products: IProduct[],
  categories: ICategory[]
}