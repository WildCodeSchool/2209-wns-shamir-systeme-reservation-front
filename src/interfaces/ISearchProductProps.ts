import ICategory from "./ICategory";
import IProduct from "./IProduct";

export default interface ISearchTermProps {
  findBySearchTerm: (searchTerm: string, isCategoriesFiltered: boolean) => void,
  findByCategory: (categories: ICategory[]) => void,
  handleFindByDate: (dateFrom: string, dateTo: string ) => void,
  categories: ICategory[],
  reloadAllProducts: () => void
  resetProductsView: () =>void
  productsByDate: IProduct[]
}