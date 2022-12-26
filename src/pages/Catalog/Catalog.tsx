import React from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import SearchProduct from '../../components/SearchProduct/SearchProduct';
import IProduct from "../../interfaces/IProduct";
import Nav from "react-bootstrap/Nav";
import "./catalog.css";
import ICatalogProps from '../../interfaces/ICatalogProps';


function Catalog({products, categories}: ICatalogProps ) {
  // transforme un objet qui contient une liste d'objects en tableau d'objets
  //const productsArray = Object.values(products);  
  

  return (
    <div className='catalog_container'>
      <h1 className='text-center mb-5'>Catalogue des produits</h1>
      <Nav.Link href="/" className='go_back'>&#60; Accueil</Nav.Link>
      <div className='row'>
        <SearchProduct {...categories} />
        <div className="col-9 row justify-content-center">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Catalog