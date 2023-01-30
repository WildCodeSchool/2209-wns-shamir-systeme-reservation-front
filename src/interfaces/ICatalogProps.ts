import ICategory from "./ICategory";
import IProduct from "./IProduct";

export default interface ICatalogProps {
  products: IProduct[],
  categories: ICategory[]
  searchCategoriesFromHome: ICategory[]
  handleFindByDate: (dateFrom: string, dateTo: string ) => void,
  productsByDate: IProduct[]
  reloadAllProducts: () => void
}