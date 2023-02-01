import React, { useContext, useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import SearchProduct from "../../components/SearchProduct/SearchProduct";
import Nav from "react-bootstrap/Nav";
import ICatalogProps from "../../interfaces/ICatalogProps";
import IProduct from "../../interfaces/IProduct";
import ICategory from "../../interfaces/ICategory";
import "./catalog.css";
import { useLocation, useNavigate } from "react-router-dom";

function Catalog({
  products,
  categories,
  handleFindByDate,
  productsByDate,
  reloadAllProducts,
  cart,
  setCart

}: ICatalogProps) {
  const [productsCatalog, setProductsCatalog] = useState<IProduct[]>([]);
  const [productsByCat, setProductsByCat] = useState<IProduct[]>([]);
  const [productsByTerm, setProductsByTerm] = useState<IProduct[]>([]);
  const [productsByCatTerm, setProductsByCatTerm] = useState<IProduct[]>([]);
  const [productsToShow, setProductsToShow] = useState<IProduct[]>([]);
  const [isShowProducts, setIsShowProduct] = useState<boolean>(true);
  const [isResetProducts, setIsResetProducts] = useState<boolean>(false);
  const [categoriesFromHome, setCategoriesFromHome] = useState<ICategory[]>([]);
  const [dateFromHome, setDateFromHome] = useState<string>('');
  const [dateToHome, setDateToHome] = useState<string>('');
  const [isSearchFromHome, setIsSearchFromHome] = useState<boolean>(false);
  
  
  const location = useLocation();


  useEffect(() => {
    if (location.state !== null) {
      setDateFromHome(location.state.dateFrom)
      setDateToHome(location.state.dateTo)
      setIsSearchFromHome(location.state.isSearchFromHome)

      if (location.state.isSearchFromHome  && location.state.categoriesFromHome.length === 0 ) {
        setProductsByCat([]);
        setProductsByCatTerm([]);
        setProductsByTerm([]);
        setProductsCatalog(location.state.productByDate);
        setProductsToShow(productsCatalog);
        setIsShowProduct(true)
      }else if (location.state.isSearchFromHome && location.state.categoriesFromHome.length > 0) {
        setCategoriesFromHome(location.state.categoriesFromHome)
        setProductsByCat([]);
        setProductsByCatTerm([]);
        setProductsByTerm([]);
        setProductsCatalog(location.state.productByDate);
        setProductsToShow(productsCatalog);
        findByCategory(location.state.categoriesFromHome);
        setIsShowProduct(true)
       
      }
    }
  }, []);


  // On stock dans le state tous les produits au montage du composant
  useEffect(() => {
    if (location.state === null) {
      if (productsByDate.length) {
        setProductsByCat([]);
        setProductsByCatTerm([]);
        setProductsByTerm([]);
        setProductsCatalog(productsByDate);
        setProductsToShow(productsCatalog);
        setIsShowProduct(true)
      } else {
        // sonon on stoque la totalité des produits
        setProductsByCat([]);
        setProductsByCatTerm([]);
        setProductsByTerm([]);
        setProductsCatalog(products);
        setProductsToShow(productsCatalog);
        setIsShowProduct(true);
      }
    
    }
  }, [products, productsByDate, isResetProducts, productsCatalog, isSearchFromHome]);


  // On decide quelle liste de produits afficher 
  useEffect(() => {
    if (productsByCatTerm.length > 0) {      
      setProductsToShow(productsByCatTerm);
    } else if (productsByCat.length > 0) {
      setProductsToShow(productsByCat);
    } else if (productsByTerm.length > 0) {
      setProductsToShow(productsByTerm);
    } else {
      setProductsToShow(productsCatalog);
    }
  }, [productsByCat, productsByTerm, productsByCatTerm, productsCatalog, isSearchFromHome]);

  // On gére la réinitialisation des produis à afficher
  const resetProductsView = (): void => {
    setIsResetProducts(!isShowProducts);
    setIsSearchFromHome(false)
    setDateFromHome('');
    setDateToHome('');
    setProductsByCat([])
    setCategoriesFromHome([]);
    setProductsByTerm([]);
    setProductsByCatTerm([]);
    location.state = null;
  };
 
  
  // On récupere le terme de recherche de l'utilisateur
  const findBySearchTerm = (
    searchTerm: string,
    isCategoriesFiltered: boolean
  ): void => {
    // On commence à filtrer les produits à partir du 3me caractere saisi
    if (searchTerm.length > 2) {
      // On récupere les produits trouvés et on les stock dans le state pour les afficher

      // On recherche dans les produit déjà filtrés par categorie si au moins une categorie a été selectionnée
      if (isCategoriesFiltered) {
        let productsFiltered = productsByCat.filter((product) =>
          product.name.toLowerCase().includes(searchTerm)
        );
        if (searchTerm.length >= 3 && productsFiltered.length === 0) {
          setIsShowProduct(false);
        } else if (searchTerm.length < 3 && productsFiltered.length === 0) {
          setProductsToShow(productsByCat);
          setProductsByTerm([]);
          setProductsByCatTerm([]);
          setIsShowProduct(true);
        } else {
          setProductsByCatTerm(productsFiltered);
          setProductsByTerm([]);
          setIsShowProduct(true);
        }
        // Sinon on recherche dans les produit du catalogue qui n'ont pas encore été filtrés par categorie 
      } else {
        let productsFiltered = productsCatalog.filter((product) =>
          product.name.toLowerCase().includes(searchTerm)
        );

        if (searchTerm.length >= 3 && productsFiltered.length === 0) {
          setIsShowProduct(false);
        } else if (searchTerm.length < 3 && productsFiltered.length === 0) {
          setProductsToShow(productsCatalog);
          setIsShowProduct(true);
        } else {
          setProductsByTerm(productsFiltered);
          setProductsByCat([]);
          setProductsByCatTerm([]);
          setIsShowProduct(true);
        }
      
      }
      // Si le caracteres saisis sont inferieurs de 3 on affiche tous les produits
    } else {
      if (isCategoriesFiltered) {
        setIsShowProduct(true);
        setProductsToShow(productsByCat);
      } else {
        setIsShowProduct(true);
        setProductsToShow(productsCatalog);
      }
    }
  };

  // On récupere les categories selectionnées par l'utilisateur
  const findByCategory = (categories: ICategory[]): void => {
    // On controle si il y a au moins une categorie selectionnée
    if (categories.length) {
      const productsByCategories: IProduct[] = [];
  
      // On controle si le nom de la categorie de chaque produit correspond aux categories selectionnées
      productsCatalog.forEach((product) => {
        
        categories.forEach((category) => {
          if (category.name === product.category.name) {
            // Si c'est le cas, on stock les produis dans un tableau
            productsByCategories.push(product);
          }
        });
      });
      // On passe le tableau avec le produits triés dans le state pour les afficher
      setProductsByCat(productsByCategories);
      setProductsByTerm([]);
      setProductsByCatTerm([]);
      setIsShowProduct(true);

      // Si aucune categorie a été selectionnée on affiche tous les produits
    } else {
      setProductsToShow(productsCatalog);
    }
  };

    
  return (
    <div className="catalog_container">
      <h1 className="text-center mb-5">Catalogue des produits</h1>
      <Nav.Link href="/" className="go_back">
        &#60; Accueil
      </Nav.Link>
      <div className="row">
        <SearchProduct
          categories={categories}
          findBySearchTerm={findBySearchTerm}
          findByCategory={findByCategory}
          handleFindByDate={handleFindByDate}
          reloadAllProducts={reloadAllProducts}
          productsByDate={productsByDate}
          resetProductsView={resetProductsView}
          categoriesFromHome={categoriesFromHome}
          dateFromHome={dateFromHome}
          dateToHome={dateToHome}
          isSearchFromHome={isSearchFromHome}
        />
        <div className="col-lg-9 col-md-9 col-sm-10 row d-flex justify-content-center m-auto">
          {isShowProducts &&
            productsToShow.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                productsByDate={productsByDate}
                isSearchFromHome={isSearchFromHome}
                cart={cart} 
                setCart={setCart}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Catalog;
