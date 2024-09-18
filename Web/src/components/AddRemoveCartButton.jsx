import { useContext, useEffect } from 'react'
import { useCart } from '../hooks/useCart'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { UserContext } from '../context/user'

export default function AddRemoveCartButton ({ detailProduct }) {
  const { isInCart, addToCart, removeFromCart, loadUserCartProducts } = useCart()
  const { userVal } = useContext(UserContext)

  useEffect(() => {
    loadUserCartProducts()
  }, [])

  return (
    <>
      {
        (Number.isInteger(userVal.userId)) ? (
          (isInCart(detailProduct.productId)) ? (
            <Button variant='danger' className='mt-auto' onClick={(event) => {removeFromCart(event, detailProduct.productId)}}>
              Remove from Cart
            </Button>
          ) : (
            <Button variant='primary' className='mt-auto' onClick={(event) => addToCart(event, detailProduct.productId)}>
              <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
            </Button>
          )
        ) : (
          <Button variant='secondary' className='mt-auto' onClick={(event) => {event.stopPropagation(); alert('Log In to use this functionality')}}>Add to Cart</Button>
        )
      }
    </>
  )
}
