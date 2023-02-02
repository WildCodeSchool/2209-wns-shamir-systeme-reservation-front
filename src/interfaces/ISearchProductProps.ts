import ICategory from "./ICategory";
import IProduct from "./IProduct";

export default interface ISearchTermProps {
  findBySearchTerm: (searchTerm: string, isCategoriesFiltered: boolean) => void,
  findByCategory: (categories: ICategory[]) => void,
  handleFindByDate: (dateFrom: string, dateTo: string ) => void,
  categories: ICategory[],
  resetProductsView: () =>void,
  productsByDate: IProduct[],
  categoriesFromHome: ICategory[]
  dateFromHome: string,
  dateToHome: string
  isSearchFromHome: boolean
}