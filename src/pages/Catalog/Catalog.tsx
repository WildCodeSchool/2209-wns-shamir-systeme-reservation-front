import React from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import IProduct from "../../interfaces/IProduct";
import "./catalog.css";

function Catalog(products: IProduct[]) {
  // transforme un objet qui contient une liste d'objects en tableau d'objets
  const productsArray = Object.values(products);

  return (
    <div className='catalog_container'>
      <h1 className='text-center mb-5'>Catalogue des produits</h1>
        <div className="row justify-content-center">
          {productsArray.map((product) => (
              <ProductCard key={product.id} {...product} />
          ))}
        </div>
    </div>
  )
}

export default Catalog