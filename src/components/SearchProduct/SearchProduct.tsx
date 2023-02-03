import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ICategory from "../../interfaces/ICategory";
import ISearchTermProps from "../../interfaces/ISearchProductProps";
import { RootState } from "../../store";
import { resetFilter, resetProductsByDate, setFilterPeriod } from "../../store/features/productsSlice";
import "./searchProduct.css";

function SearchProduct({
  findBySearchTerm,
  findByCategory,
  handleFindByDate,
  resetProductsView,
  categoriesFromHome,
  dateFromHome,
  dateToHome,
  isSearchFromHome,
}: ISearchTermProps) {
  // transforme un objet qui contient une liste d'objects en tableau d'objets
  const categoriesStore = useSelector((state: RootState) => state.products.categories);
  const productsByDateStore = useSelector((state: RootState) => state.products.productsByDate);
  const productFilterStore = useSelector((state: RootState) => state.products.filter)

  // const [dateFrom, setDateFrom] = useState<string>("");
  // const [dateTo, setDateTo] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [categoriesFiltered, setCategoriesFiltered] = useState<ICategory[]>([]);
  const [isCategoriesFiltered, setIsCategoriesFiltered] =
    useState<boolean>(false);
  const [isProductsByDate, setIsProductsByDate] = useState<boolean>(false);

  const dispatch = useDispatch();
  
  const reloadAllProducts = () => {
    dispatch(resetProductsByDate());
  };

  // On récupère seulement les categories qui ont minimum un produit lié
  const categoriesArray = categoriesStore.filter((cat) => {
    return cat.products.length > 0;
  });

  useEffect(() => {
    if (categoriesFromHome.length > 0) {
      setCategoriesFiltered(categoriesFromHome);
    }
    if (dateFromHome !== "") {
      dispatch(setFilterPeriod({dateFrom: dateFromHome, dateTo: dateToHome}))
      // setDateFrom(dateFromHome);
      // setDateTo(dateToHome);
      setIsProductsByDate(true);
    }
  }, [isSearchFromHome]);

  // On contrôle si on a des produits recherchés par dates et si c est le cas on affiche le bouton "Réinitialiser"
  // sinon on le cache
  useEffect(() => {
    if (productsByDateStore.length === 0) {
      setIsProductsByDate(false);
    } else {
      setIsProductsByDate(true);
    }
  }, [productsByDateStore]);

  // Pour chaque categorie selectionnée ou deselectionnée on appelle une function pour trier les produits
  useEffect(() => {
    findByCategory(categoriesFiltered);
    if (categoriesFiltered.length > 0) {
      setIsCategoriesFiltered(true);
    } else {
      setIsCategoriesFiltered(false);
    }
  }, [categoriesFiltered]);

  // Function qui returne un true ou false selon l'etat (selectionné ou pas) d'un checkbox categories
  const isChecked = (categoryName: string): boolean => {
    // On controle dans la liste des categories selectionnées si la catageorie passée en argument est presente
    if (
      categoriesFiltered.find(
        (categoryFiltred) => categoryFiltred.name === categoryName
      )
    ) {
      // Si c'est le cas la case checkbox sera cochée
      return true;
    }
    // Sinon la case checkbox sera decochée
    return false;
  };

  // Function qui permet de stoker ou enlever du state les categories selectionnées dans les checkbox
  const handleCheckbox = (nameCategoryToAdd: string): void => {
    // On controle l'état du checkbox
    if (isChecked(nameCategoryToAdd)) {
      // Si il etait dejà coché, on le decoché en créant une nouvelle liste de categories selectionnées sans la categorié que on vient de traiter
      const newCategoriesToAdd: ICategory[] = categoriesFiltered.filter(
        (categoryFiltred) => categoryFiltred.name !== nameCategoryToAdd
      );
      setCategoriesFiltered(newCategoriesToAdd);
      setSearchTerm("");
    } else {
      // Si il etait decoché, on le coche en créant une nouvelle categorie
      const newCategory: ICategory | undefined = categoriesStore.find(
        (category) => category.name === nameCategoryToAdd
      );
      if (newCategory) {
        // On ajoute cette nouvelle categorie à la liste des filtres des produits "findByCategory(categoriesFiltered);"
        setCategoriesFiltered([...categoriesFiltered, newCategory]);
        setSearchTerm("");
      }
    }
  };

  const handleSearchTerm = (e: any): void => {
    setSearchTerm(e.target.value);
    findBySearchTerm(e.target.value.toLowerCase(), isCategoriesFiltered);
  };

  const handleSubmit = (e: any): void => {
    e.preventDefault();

    // On contrôle si la date de debut et la date de fin on été sélectionnées
    if (productFilterStore.period) {
      const timestampFrom = new Date(productFilterStore.period.dateFrom).getTime();
      const timestampTo = new Date(productFilterStore.period.dateTo).getTime();
      const now = new Date().getTime();
      // On verifie si la date de debut est superieure à la date de fin
      if (timestampFrom > timestampTo || timestampFrom < now) {
        // Si c'est le cas on affiche un message d'erreur
        setErrorMessage("La date de début doit être supérieure ou égale à la date du jour et inférieure à la date de fin.");
      } else {
        setErrorMessage("");
        handleFindByDate(productFilterStore.period.dateFrom, productFilterStore.period.dateTo);
        setCategoriesFiltered([]);
        setSearchTerm("");
      }
    } else {
      // Si c'est pas le cas on affiche un message d'erreur
      setErrorMessage("Sélectionnez deux dates");
    }
  };

  // On gère la réinitialisation des produis à afficher
  function handleClickreloadProducts() {
    resetFilter();
    resetProductsView();
    reloadAllProducts();
  }

  return (
    <div className="col-lg-2 col-md-3 col-sm-10 col-11 ms-5">
      <section className="col-12 m-auto shadow pt-5 pb-5 ml-5 mb-5 mt-4 bg-white rounded search_product_container">
        <h2 className="text-center mb-3">Filtres : </h2>
        <div className="col-9 m-auto mb-5 row">
          <p className="category_chackbox_title">categories</p>
          {categoriesArray.map((category: ICategory) => (
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
          ))}
        </div>
        <div className="col-9 m-auto  row">
          <label htmlFor="searchValue">quel produit</label>
          <input
            name="searchValue"
            type="text"
            onChange={handleSearchTerm}
            value={searchTerm}
            className="form-control searchTerm"
          />
        </div>
      </section>

      <form
        className="col-12  m-auto shadow pt-5 pb-4 ml-5 mb-5 mt-4 bg-white rounded search_product_container"
        onSubmit={handleSubmit}
      >
        <h2 className="text-center mb-3">Rechercher : </h2>
        <div className="col-9 m-auto mb-5 row">
          <label htmlFor="startDate">debut de location</label>
          <input
            className="form-control date"
            name="startDate"
            type="date"
            onChange={(e)=>dispatch(setFilterPeriod({dateFrom: e.target.value, dateTo: productFilterStore.period.dateTo}))}
            value={productFilterStore.period.dateFrom}
          />
        </div>
        <div className="col-9 m-auto mb-5 row">
          <label htmlFor="endDate">fin de location</label>
          <input
            className="form-control date"
            name="endDate"
            type="date"
            onChange={(e)=>dispatch(setFilterPeriod({dateFrom: productFilterStore.period.dateFrom, dateTo: e.target.value}))}
            value={productFilterStore.period.dateTo}
          />
        </div>
        <div className="row">
          <Button
            type="submit"
            className="btn btn-primary col-7 m-auto btnWild d-flex align-items-center justify-content-center"
          >
            Rechercher
          </Button>
        </div>
        {errorMessage ? (
          <div className="row">
            <span className="errorMessage col-9 m-auto">{errorMessage}</span>
          </div>
        ) : (
          ""
        )}
        {isProductsByDate && (
          <div className="row">
            <Button
              type="button"
              className="btn btn-primary col-7 m-auto btnWild d-flex align-items-center justify-content-center"
              onClick={handleClickreloadProducts}
            >
              Réinitialiser
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}

export default SearchProduct;
