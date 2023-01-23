import ICategory from "./ICategory";

export default interface ISearchTermProps {
  findBySearchTerm: (searchTerm: string) => void,
  findByCategory: (categories: ICategory[]) => void,
  categories: ICategory[]
}