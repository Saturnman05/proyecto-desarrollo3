import { useEffect } from 'react'
import { useProducts } from '../../hooks/useProducts'
import { useNavigate } from 'react-router-dom'
import { Button, Container, Col, Card, Row, } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { useCart } from '../../hooks/useCart'

export default function PaginaInicio () {  
  const { products, loadProducts } = useProducts()
  const { addToCart, removeFromCart, loadUserCartProducts, isInCart } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    loadProducts()
    loadUserCartProducts()
  }, [])

  return (
    <div className='pagina-inicio'>
      <Container className='flex-grow-1 py-2'>
        <h1 className='text-center mb-5'>Our Products</h1>
        <Row xs={1} sm={2} md={3} lg={4} className='g-4'>
          {
            products.map((product) => (
              <Col key={product.productId}>
                <Card className='h-100 clickable' onClick={() => navigate(`/product/${product.productId}`)}>
                  <Card.Img variant='top' src={product.imageUrl} />
                  <Card.Body className='d-flex flex-column'>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text className='text-muted mb-4'>${product.unitPrice}</Card.Text>
                    {
                      (isInCart(product.productId)) ? (
                        <Button variant='danger' className='mt-auto' onClick={(event) => {removeFromCart(event, product.productId)}}>Remove from Cart</Button>
                      ) : (
                        <Button variant='primary' className='mt-auto' onClick={(event) => addToCart(event, product.productId)}>
                          <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
                        </Button>
                      )
                    }
                  </Card.Body>
                </Card>
              </Col>
            ))
          }
        </Row>
      </Container>
    </div>
  )
}
