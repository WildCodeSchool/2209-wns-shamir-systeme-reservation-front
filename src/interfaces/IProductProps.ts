import IProduct from "./IProduct";


export default interface IProductProps {
 product: IProduct,
 productsByDate: IProduct[]
 isSearchFromHome?: boolean
}