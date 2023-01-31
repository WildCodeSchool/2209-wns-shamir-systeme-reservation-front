import { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import SearchProduct from '../../components/SearchProduct/SearchProduct';
import Nav from "react-bootstrap/Nav";
import ICatalogProps from '../../interfaces/ICatalogProps';
import IProduct from '../../interfaces/IProduct';
import ICategory from '../../interfaces/ICategory';
import "./catalog.css";

function Catalog({ products, categories, handleFindByDate, productsByDate, reloadAllProducts, cart, setCart }: ICatalogProps) {

  const [productsCatalog, setProductsCatalog] = useState<IProduct[]>([]);

  // On stock dans le state tous les produits au montage du composant
  useEffect(() => {
    // Si on a des produits triés par date on les stoque dans le state 
    if (productsByDate.length) {
      setProductsCatalog(productsByDate);
    } else {
      // sonon on stoque la totalité des produits
      setProductsCatalog(products);
    }
  }, [products, productsByDate]);

  // On récupere le terme de recherche de l'utilisateur
  const findBySearchTerm = (searchTerm: string): void => {
    // On commence à filtrer les produits à partir du 3me caractere saisi
    if (searchTerm.length > 2) {
      // Si on a pas des produits triés par date on fait la recherche dans tous les produits 
      if (!productsByDate.length) {
        // On récupere les produits trouvés et on les stock dans le state pour les afficher
        let productsFiltered = products.filter(product => product.name.toLowerCase().includes(searchTerm));
        setProductsCatalog(productsFiltered);
        // Si on a des produits triés par date on fait la recherche dans les produits triés par date 
      } else {
        let productsFiltered = productsByDate.filter(product => product.name.toLowerCase().includes(searchTerm));
        setProductsCatalog(productsFiltered);
      }
     // Si le caracteres saisis sont inferieurs de 3 on affiche tous les produits 
    } else {
      if (!productsByDate.length) {
        setProductsCatalog(products);
      } else {
        setProductsCatalog(productsByDate);
      }
    }
  }

  // On récupere les categories selectionnées par l'utilisateur
  const findByCategory = (categories: ICategory[]): void => {
    // On controle si il y a au moins une categorie selectionnée
    if (categories.length) {
      const productsByCategories: IProduct[] = [];
       // Si on a pas des produits triés par date on fait la recherche dans tous les produits 
      if (!productsByDate.length) {
        // On controle si le nom de la categorie de chaque produit correspond aux categories selectionnées
        products.forEach(product => {
          categories.forEach((category) => {
            if (category.name === product.category.name) {
              // Si c'est le cas, on stock les produis dans un tableau
              productsByCategories.push(product);
            }
          })
        });
        // On passe le tableau avec le produits triés dans le state pour les afficher 
        setProductsCatalog(productsByCategories);

        // Si on a des produits triés par date on fait la recherche dans les produits triés par date 
      } else {
        // On controle si le nom de la categorie de chaque produit correspond aux categories selectionnées
        productsByDate.forEach(product => {
          categories.forEach((category) => {
            if (category.name === product.category.name) {
              // Si c'est le cas, on stock les produis dans un tableau
              productsByCategories.push(product);
            }
          })
        });
        // On passe le tableau avec le produits triés dans le state pour les afficher 
        setProductsCatalog(productsByCategories);
      }
     // Si aucune categorie a été selectionnée on affiche tous les produits 
    } else {
      if (productsByDate.length === 0) {
        setProductsCatalog(products);
      }else{
        setProductsCatalog(productsByDate);
      }
    }
  }

  return (
    <div className='catalog_container'>
      <h1 className='text-center mb-5'>Catalogue des produits</h1>
      <Nav.Link href="/" className='go_back'>&#60; Accueil</Nav.Link>
      <div className='row'>
        <SearchProduct categories={categories} findBySearchTerm={findBySearchTerm} findByCategory={findByCategory} handleFindByDate={handleFindByDate} reloadAllProducts={reloadAllProducts} productsByDate={productsByDate} />
        <div className="col-lg-9 col-md-9 col-sm-10 row d-flex justify-content-center m-auto">
          {productsCatalog.map((product) => (
            <ProductCard key={product.id} product={product} productsByDate={productsByDate} cart={cart} setCart={setCart} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Catalog