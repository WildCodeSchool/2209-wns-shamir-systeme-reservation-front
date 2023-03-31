import ICategory from "./ICategory";
import IProduct from "./IProduct";

export default interface IAdminProductFormProps {
  productToEdit: IProduct | undefined;
  show: boolean;
  handleShow: () => void;
  categories: ICategory[];
}
