import ICategory from "./ICategory";

export default interface ISearchTermProps {
  findBySearchTerm: (searchTerm: string, isCategoriesFiltered: boolean) => void;
  findByCategory: (categories: ICategory[]) => void;
  handleFindByDate: (dateFrom: string, dateTo: string) => void;
  resetProductsView: () => void;
  categoriesFromHome: ICategory[];
  dateFromHome: string;
  dateToHome: string;
  isSearchFromHome: boolean;
}
