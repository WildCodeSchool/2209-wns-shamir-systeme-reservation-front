import IProduct from "./IProduct";
import ICategory from "./ICategory";
import IProductCart from "./IProductCart";

export default interface ICatalogProps {
  products: IProduct[],
  categories: ICategory[]
  searchCategoriesFromHome: ICategory[]
  handleFindByDate: (dateFrom: string, dateTo: string ) => void,
  productsByDate: IProduct[]
  reloadAllProducts: () => void
  cart: IProductCart[],
  setCart: (cart: IProductCart[]) => void,
}