import { useEffect } from 'react'
import { useProduct } from '../../hooks/useProducts'
import { useCart } from '../../hooks/useCart'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

export default function Product () {
  const { product, getProduct } = useProduct()
  const { addToCart, removeFromCart, isInCart, loadUserCartProducts } = useCart()

  useEffect(() => {
    getProduct()
    loadUserCartProducts()
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
            {
              (isInCart(product.productId)) ? (
                <Button variant='danger' className='mt-auto' onClick={(event) => {removeFromCart(event, product.productId)}}>
                  Remove from Cart
                </Button>
              ) : (
                <Button variant='primary' className='mt-auto' onClick={(event) => addToCart(event, product.productId)}>
                  <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
                </Button>
              )
            }
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
