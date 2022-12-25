import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getProducts } from '../api/firebase'
import ProductCard from './ProductCard'

const Products = () => {
  const { isLoading, error, data: products } = useQuery(['products'], getProducts)
  console.log(products)
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div>
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  )
}

export default Products
