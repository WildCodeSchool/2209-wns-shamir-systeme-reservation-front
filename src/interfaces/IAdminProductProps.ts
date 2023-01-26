import ICategory from "./ICategory";
import IProduct from "./IProduct";

export default interface IAdminProductProps {
  products: IProduct[],
  categories: ICategory[]
}