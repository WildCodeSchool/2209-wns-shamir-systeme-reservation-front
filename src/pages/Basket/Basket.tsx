import { useState, useEffect } from 'react';
import ProductBasket from '../../components/ProductBasket/ProductBasket';
import ICatalogProps from '../../interfaces/ICatalogProps';
import IProduct from '../../interfaces/IProduct';
import "./Basket.css";

function Basket({products}: ICatalogProps ) {
  const [productsBasket, setProductsBasket] = useState<IProduct[]>([]);
  
  // On stock dans le state tous les produits au montage du composant
  useEffect(() => {
    setProductsBasket(products);
  },[products]);
  
  return (
    <div className='basket_container'>
      <h1 className='text-center mb-5'>Mon panier</h1>
      <div className='row'>
        <div>
          {productsBasket.map((product) => (
            <ProductBasket key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Basket