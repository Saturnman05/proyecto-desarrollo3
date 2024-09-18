import { useEffect } from 'react'
import { useProduct } from '../../hooks/useProducts'
import AddRemoveCartButton from '../AddRemoveCartButton'

export default function Product () {
  const { product, getProduct } = useProduct()

  useEffect(() => {
    getProduct()
  }, [])

  return (
    <div>
      {
        product ? (
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              flexDirection: 'column', 
              width: '80%',
              maxWidth: '600px',
              margin: '0 auto'
            }}
          >
            <h1>{product.name}</h1>
            <img src={product.imageUrl} alt={product.name} />
            <p>Product description: {product.description}</p>
            <p>Price: ${product.unitPrice}</p>
            <p>Amount in stock: {product.stock}</p>
            <AddRemoveCartButton detailProduct={product} />
          </div>
        ) : (
          <div 
            id='product-not-found' 
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <p>Product not found</p>
          </div>
        )
      }
    </div>
  )
}
