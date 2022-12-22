import React from 'react'
import ProductCard from '../components/ProductCard/ProductCard'

function Catalog({ products }) {
  return (
    <div>
      <h1>Catalogue des produits</h1>
      <ProductCard products={products} />
    </div>
  )
}

export default Catalog