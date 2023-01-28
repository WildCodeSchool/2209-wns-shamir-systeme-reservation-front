import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import SearchProduct from "../../components/SearchProduct/SearchProduct";
import Nav from "react-bootstrap/Nav";
import ICatalogProps from "../../interfaces/ICatalogProps";
import IProduct from "../../interfaces/IProduct";
import ICategory from "../../interfaces/ICategory";
import "./catalog.css";

function Catalog({
  products,
  categories,
  handleFindByDate,
  productsByDate,
  reloadAllProducts,
}: ICatalogProps) {
  const [productsCatalog, setProductsCatalog] = useState<IProduct[]>([]);
  const [productsByCat, setProductsByCat] = useState<IProduct[]>([]);
  const [productsByTerm, setProductsByTerm] = useState<IProduct[]>([]);
  const [productsByCatTerm, setProductsByCatTerm] = useState<IProduct[]>([]);
  const [productsToShow, setProductsToShow] = useState<IProduct[]>([]);
  const [isShowProducts, setIsShowProduct] = useState<boolean>(true);
  const [isResetProducts, setIsResetProducts] = useState<boolean>(false);

  // On stock dans le state tous les produits au montage du composant
  useEffect(() => {
    // Si on a des produits triés par date on les stoque dans le state
    if (productsByDate.length) {
      setProductsByCat([]);
      setProductsByCatTerm([]);
      setProductsByTerm([]);
      setProductsCatalog(productsByDate);
      setProductsToShow(productsCatalog);
    } else {
      // sonon on stoque la totalité des produits
      setProductsByCat([]);
      setProductsByCatTerm([]);
      setProductsByTerm([]);
      setProductsCatalog(products);
      setProductsToShow(productsCatalog);
    }
  }, [products, productsByDate, isResetProducts]);

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
  }, [productsByCat, productsByTerm, productsByCatTerm, productsCatalog]);

  const resetProductsView = (): void => {
    setIsResetProducts(!isShowProducts);
  };

  // On récupere le terme de recherche de l'utilisateur
  const findBySearchTerm = (
    searchTerm: string,
    isCategoriesFiltered: boolean
  ): void => {
    // On commence à filtrer les produits à partir du 3me caractere saisi
    if (searchTerm.length > 2) {
      // Si on a pas des produits triés par date on fait la recherche dans tous les produits

      // On récupere les produits trouvés et on les stock dans le state pour les afficher
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
      // Si on a des produits triés par date on fait la recherche dans les produits triés par date

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
      // Si on a pas des produits triés par date on fait la recherche dans tous les produits

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
      // Si on a des produits triés par date on fait la recherche dans les produits triés par date

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
        />
        <div className="col-lg-9 col-md-9 col-sm-10 row d-flex justify-content-center m-auto">
          {isShowProducts &&
            productsToShow.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                productsByDate={productsByDate}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Catalog;
