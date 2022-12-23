import ICategory from "./ICategory";

export default interface IProduct {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
  category: ICategory;
}