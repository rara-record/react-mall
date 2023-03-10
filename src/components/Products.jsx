import { useQuery } from '@tanstack/react-query'
import { getProducts } from '../api/firebase'
import ProductCard from './ProductCard'

const Products = () => {
  const { isLoading, error, data: products } = useQuery(['products'], getProducts)

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {products?.map((product) => {
          return <ProductCard key={product.id} product={product} />
        })}
      </ul>
    </>
  )
}

export default Products
