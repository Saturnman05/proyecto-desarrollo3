import { useContext, useEffect } from 'react'
import { Button, Card, Container, Col, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

import { useProducts } from '../../hooks/useProducts'
import { UserContext } from '../../context/user'

export default function MyProduct () {
  const { products, loadProducts } = useProducts()
  const { userVal } = useContext(UserContext)

  const navigate = useNavigate()

  useEffect(() => {
    loadProducts()
  }, [])

  return (
    <Container className='flex-grow-1 py-2'>
      <h1 className='text-center mb-5'>My Products</h1>

      <Link to='/publish-product'>
        <Button variant='outline-primary' style={{ marginBottom: '15px'}}>Publish Product</Button>
      </Link>
      
      <Row xs={1} sm={2} md={3} lg={4} className='g-4'>
      {
        products && products.length > 0 ? (
          (() => {
            const filteredProducts = products.filter(product => product.userId === userVal.userId)
            return filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <Col key={product.productId}>
                  <Card className='h-100 clickable' onClick={() => navigate(`/product/${product.productId}`)}>
                    <Card.Img variant='top' src={product.imageUrl} />
                    <Card.Body className='d-flex flex-column'>
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Text className='text-muted mb-4'>${product.unitPrice}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p>No products published</p>
            )
          })()
        ) : (
          <p>No products published</p>
        )
      }
      </Row>
    </Container>
  )
}
