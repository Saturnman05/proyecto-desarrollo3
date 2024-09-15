import { useEffect } from 'react'
import { useProduct } from '../../hooks/useProducts'

export default function Product() {
  const { product, getProduct } = useProduct()

  useEffect(() => {
    getProduct()
  }, [])

  return (
    <div>
      {
        product ? (
          <>
            <h1>{product.name}</h1>
            <p>Price: {product.unitPrice}</p>
          </>
        ) : (
          <>
            <p>Product not found</p>
          </>
        )
      }
    </div>
  )
}
