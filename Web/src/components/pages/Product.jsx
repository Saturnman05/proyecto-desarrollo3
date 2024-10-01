import { useContext, useEffect } from 'react'
import { useProduct } from '../../hooks/useProducts'
import AddRemoveCartButton from '../AddRemoveCartButton'
import { UserContext } from '../../context/user'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function Product () {
  const { product, getProduct } = useProduct()
  const { userVal } = useContext(UserContext)

  const navigate = useNavigate()

  useEffect(() => {
    getProduct(null)
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
            {product.userId === userVal.userId && (
              <Button variant='warning' onClick={() => navigate('/publish-product', { state: { edit: true, product: product }})}>
                Edit
              </Button>
            )}
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
