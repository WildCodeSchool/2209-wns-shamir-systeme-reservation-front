import { useState } from "react";
import { useSelector } from "react-redux";
import ICategory from "../../interfaces/ICategory";
import ISearchProductHomeProps from "../../interfaces/ISearchProductHomeProps";
import { RootState } from "../../store";
import "./searchProductHome.css";

const SearchProductHome = ({handleFindByDateFromHome}: ISearchProductHomeProps ) => {
  const [categoriesFiltered, setCategoriesFiltered] = useState<ICategory[]>([]);
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showCategories, setShowcategories] = useState(false);

  const categoriesStore = useSelector((state: RootState) => state.products.categories);

  // Function qui retourne un true ou false selon l'etat (sélectionné ou pas) d'un checkbox catégories
  const isChecked = (categoryName: string): boolean => {
    // On contrôle dans la liste des categories sélectionnées si la catégorie passée en argument est présente
    if (
      categoriesFiltered.find(
        (categoryFiltred) => categoryFiltred.name === categoryName
      )
    ) {
      // Si c'est le cas la case checkbox sera cochée
      return true;
    }
    // Sinon la case checkbox sera décochée
    return false;
  };

  // Function qui permet de stoker ou enlever du state les catégories sélectionnées dans les checkbox
  const handleCheckbox = (nameCategoryToAdd: string): void => {
    // On contrôle l'état du checkbox
    if (isChecked(nameCategoryToAdd)) {
      // Si il etait dejà coché, on le décoché en créant une nouvelle liste de categories sélectionnées sans la catégorie qu'on vient de traiter
      const newCategoriesToAdd: ICategory[] = categoriesFiltered.filter(
        (categoryFiltred) => categoryFiltred.name !== nameCategoryToAdd
      );
      setCategoriesFiltered(newCategoriesToAdd);
    } else {
      // S'il était décoché, on le coche en créant une nouvelle catégorie
      const newCategory: ICategory | undefined = categoriesStore.find(
        (category) => category.name === nameCategoryToAdd
      );
      if (newCategory) {
        // On ajoute cette nouvelle catégorie à la liste des filtres des produits "findByCategory(categoriesFiltered);"
        setCategoriesFiltered([...categoriesFiltered, newCategory]);
      }
    }
  };

  const handleDateFrom = (e: any): void => {
    setDateFrom(e.target.value);
  };
  const handleDateTo = (e: any): void => {
    setDateTo(e.target.value);
  };

  const handleSubmit = (e: any): void => {
    e.preventDefault();

    // On contrôle si la date de debut et la date de fin on été sélectionnées
    if (dateFrom && dateTo) {
      const timestampFrom = new Date(dateFrom).getTime();
      const timestampTo = new Date(dateTo).getTime();
      // On vérifie si la date de debut est supérieure à la date de fin
      if (timestampFrom > timestampTo) {
        // Si c'est le cas on affiche un message d'erreur
        setErrorMessage("Dates non conformes");
      } else {
        setErrorMessage("");
        handleFindByDateFromHome(dateFrom, dateTo, categoriesFiltered);
        setCategoriesFiltered([]);
        setShowcategories(false);
      }
    } else {
      // Si c'est pas le cas on affiche un message d'erreur
      setErrorMessage("Sélectionner deux dates");
    }
  };
  return (
    <div className="search_home_container">
      <form className="home_search_prod_by_date" onSubmit={handleSubmit}>
          <div>
            <p>quelle activité ?</p>
            <button type="button"
              className={
                showCategories
                  ? "home_search_prod_by_date_select--selected"
                  : "home_search_prod_by_date_select"
              }
              onClick={() => setShowcategories(!showCategories)}
            >
              Sélectionner
            </button>
            {showCategories && (
              <div className="check_category">
                {categoriesStore.map((category: ICategory) => (
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
            )}
          </div>
          <div>
            <p>debut de location</p>
            <input
              name="startDate"
              type="date"
              onChange={handleDateFrom}
              value={dateFrom}
            />
          </div>
          <div>
            <p>fin de location</p>
            <input
              name="endDate"
              type="date"
              onChange={handleDateTo}
              value={dateTo}
            />
          </div>
          <div className="div_button">
            <button type="submit">Rechercher</button>
          </div>
      </form>
      {errorMessage ? <div className="row home_error_message"><span>{errorMessage}</span></div> : ''}
    </div>
    
  );
};

export default SearchProductHome;
