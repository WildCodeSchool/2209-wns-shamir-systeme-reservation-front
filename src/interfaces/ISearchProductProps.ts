import ICategory from "./ICategory";
import IProduct from "./IProduct";

export default interface ISearchTermProps {
  findBySearchTerm: (searchTerm: string) => void,
  findByCategory: (categories: ICategory[]) => void,
  handleFindByDate: (dateFrom: string, dateTo: string ) => void,
  categories: ICategory[],
  reloadAllProducts: () => void
  productsByDate: IProduct[]
}