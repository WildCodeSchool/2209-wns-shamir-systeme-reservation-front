import { useEffect, useState } from "react";
import ICategory from "../../interfaces/ICategory";
import ISearchTermProps from "../../interfaces/ISearchProductProps";
import "./searchProduct.css";

function SearchProduct({ categories, findBySearchTerm, findByCategory, handleFindByDate, reloadAllProducts, productsByDate }: ISearchTermProps) {

  // transforme un objet qui contient une liste d'objects en tableau d'objets
  const categoriesArray = Object.values(categories);
  const [dateFrom, setDateFrom] = useState<string>('');
  const [dateTo, setDateTo] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [categoriesFiltered, setCategoriesFiltered] = useState<ICategory[]>([]);
  const [isProductsByDate, setIsProductsByDate] = useState<boolean>(false);


  // On controle si on a des produits recherchés par dates et si c est le cas on affiche le boutton "Tous les produits"
  // sinon on le cache
  useEffect(() => {
    console.log(productsByDate);
    if (productsByDate.length === 0) {
      setIsProductsByDate(false);
    } else {
      setIsProductsByDate(true);
    }
  }, [productsByDate]);


  // Pour chaque categorie selectionnée ou deselectionnée on appelle une function pour trier les produits  
  useEffect(() => {
    findByCategory(categoriesFiltered);
  }, [categoriesFiltered]);

  // Function qui returne un true ou false selon l'etat (selectionné ou pas) d'un checkbox categories 
  const isChecked = (categoryName: string): boolean => {
    // On controle dans la liste des categories selectionnées si la catageorie passée en argument est presente
    if (categoriesFiltered.find(categoryFiltred => categoryFiltred.name === categoryName)) {
      // Si c'est le cas la case checkbox sera cochée
      return true
    }
    // Sinon la case checkbox sera decochée
    return false;
  }

  // Function qui permet de stoker ou enlever du state les categories selectionnées dans les checkbox 
  const handleCheckbox = (nameCategoryToAdd: string): void => {
    // On controle l'état du checkbox 
    if (isChecked(nameCategoryToAdd)) {
      // Si il etait dejà coché, on le decoché en créant une nouvelle liste de categories selectionnées sans la categorié que on vient de traiter
      const newCategoriesToAdd: ICategory[] = categoriesFiltered.filter(categoryFiltred => categoryFiltred.name !== nameCategoryToAdd);
      setCategoriesFiltered(newCategoriesToAdd)
    } else {
      // Si il etait decoché, on le coche en créant une nouvelle categorie
      const newCategory: ICategory | undefined = categories.find((category) => category.name === nameCategoryToAdd);
      if (newCategory) {
        // On ajoute cette nouvelle categorie à la liste des filtres des produits "findByCategory(categoriesFiltered);"
        setCategoriesFiltered([...categoriesFiltered, newCategory]);
        setSearchTerm('');
      }
    }
  }

  const handleSearchTerm = (e: any): void => {
    setSearchTerm(e.target.value);
    findBySearchTerm(e.target.value.toLowerCase());
    if (categoriesFiltered.length) {
      setCategoriesFiltered([]);
    }
  }

  const handleDateFrom = (e: any): void => {
    setDateFrom(e.target.value);
  }
  const handleDateTo = (e: any): void => {
    setDateTo(e.target.value);
  }

  const handleSubmit = (e: any): void => {
    e.preventDefault();

    // On controle si la date de debut et la date de fin on été selectionnées 
    if (dateFrom && dateTo) {
      const timestampFrom = new Date(dateFrom).getTime();
      const timestampTo = new Date(dateTo).getTime();
      // On verifie si la date de debut est superieure à la date de fin
      if (timestampFrom > timestampTo) {
        // Si c'est le cas on affiche un message d'erreur
        setErrorMessage('Dates non conformes');
      } else {
        setErrorMessage('');
        handleFindByDate(dateFrom, dateTo);
        setCategoriesFiltered([]);
        setSearchTerm('');
      }
    } else {
      // Si c'est pas le cas on affiche un message d'erreur
      setErrorMessage('Sélectionner deux dates');
    }
  }


function handleClickreloadProducts() {
  reloadAllProducts();
  setDateFrom('');
  setDateTo('');
  setCategoriesFiltered([]);
  setSearchTerm('');
}



  return (

    <div className="col-lg-2 col-md-3 col-sm-10 col-11 ms-5">
      <section className="col-12 m-auto shadow pt-5 pb-5 ml-5 mb-5 mt-4 bg-white rounded search_product_container" >
        <h2 className="text-center mb-3">Filtres : </h2>
        <div className="col-9 m-auto mb-5 row">
          <p className="category_chackbox_title" >categories</p>
          {
            categoriesArray.map((category: ICategory) => (
              <div className="category_chackbox" key={category.id}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={category.name}
                  onChange={() => handleCheckbox(category.name)}
                  checked={isChecked(category.name)}
                />
                <label>{category.name}</label>
              </div>
            ))
          }
        </div>
        <div className="col-9 m-auto  row">
          <label htmlFor="searchValue">quel produit</label>
          <input name="searchValue" type="text" onChange={handleSearchTerm} value={searchTerm} className="form-control searchTerm"/>
        </div>
      </section>

      <form className="col-12  m-auto shadow pt-5 pb-4 ml-5 mb-5 mt-4 bg-white rounded search_product_container" onSubmit={handleSubmit}>
        <h2 className="text-center mb-3">Rechercher : </h2>
        <div className="col-9 m-auto mb-5 row">
          <label htmlFor="startDate">debut de location</label>
          <input className="form-control date" name="startDate" type="date" onChange={handleDateFrom} value={dateFrom}/>
        </div>
        <div className="col-9 m-auto mb-5 row">
          <label htmlFor="endDate">fin de location</label>
          <input className="form-control date" name="endDate" type="date" onChange={handleDateTo} value={dateTo} />
        </div>
        <div className="row"><button type="submit" className="btn btn-primary col-5 m-auto" >Rechercher</button></div>
        {errorMessage ? <div className="row"><span className="errorMessage col-9 m-auto">{errorMessage}</span></div> : ''}
        {isProductsByDate && <div className="row"><button type="button" className="btn btn-primary col-5 m-auto" onClick={handleClickreloadProducts}>Tous les produits</button></div>}
      </form>
    </div>
  )
}

export default SearchProduct;