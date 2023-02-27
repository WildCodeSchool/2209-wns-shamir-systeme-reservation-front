import ICategory from "./ICategory";

export default interface ISearchProductHomeProps {
  handleFindByDateFromHome: (dateFrom: string, dateTo: string, categories: ICategory[] ) => void,
}