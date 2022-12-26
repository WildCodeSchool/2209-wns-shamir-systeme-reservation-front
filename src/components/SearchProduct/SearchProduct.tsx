import ICategory from "../../interfaces/ICategory";
import "./searchProduct.css";

function SearchProduct(categories: ICategory[]) {
  // transforme un objet qui contient une liste d'objects en tableau d'objets
  const categoriesArray = Object.values(categories);  

  return (

    <form className="col-2 d-flex-start shadow pt-5 pb-5 ml-5 mb-5 mt-4 bg-white rounded search_product_container">
      <div className="col-9 m-auto mb-5 row">
        <label htmlFor="category">catégories</label>
        <select name="category" id="">
         <option  value=""></option>
          {
            categoriesArray.map((category: ICategory) => <option key={category.id} value={category.id}>{category.name}</option>)
          }
        </select>
      </div>
      <div className="col-9 m-auto mb-5 row">
        <label htmlFor="searchValue">quel produit</label>
        <input name="searchValue" type="text" />
      </div>
      <div className="col-9 m-auto mb-5 row">
        <label htmlFor="startDate">debut de location</label>
        <input name="startDate" type="date" />
      </div>
      <div className="col-9 m-auto mb-5 row">
        <label htmlFor="endDate">fin de location</label>
        <input  name="endDate" type="date" />
      </div>
      <div className="row"><button className="btn btn-primary col-5 m-auto">Rechercher</button></div>
    </form>
  )
}

export default SearchProduct;