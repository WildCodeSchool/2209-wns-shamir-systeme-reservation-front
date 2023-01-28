import ICategory from "./ICategory";
import IProduct from "./IProduct";

export default interface ICatalogProps {
  products: IProduct[],
  categories: ICategory[]
  handleFindByDate: (dateFrom: string, dateTo: string ) => void,
  productsByDate: IProduct[]
  reloadAllProducts: () => void
  addToCart: (productId: number) => void
  setCart: any
}