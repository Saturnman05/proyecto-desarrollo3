import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Container, Col, Card, Row, Placeholder } from 'react-bootstrap'

import { useProducts } from '../../hooks/useProducts'
import AddRemoveCartButton from '../AddRemoveCartButton'

export default function PaginaInicio () {  
  const { products, loadProducts } = useProducts()
  const navigate = useNavigate()

  useEffect(() => {
    loadProducts(true)
  }, [])

  return (
    <div className='pagina-inicio'>
      <Container className='flex-grow-1 py-2'>
        <h1 className='text-center mb-5'>Our Products</h1>
        <Row xs={1} sm={2} md={3} lg={4} className='g-4'>
          {
            (products.length > 0) ? (
              products.map((product) => (
                <Col key={product.productId}>
                  <Card className='h-100 clickable' onClick={() => navigate(`/product/${product.productId}`)}>
                    <Card.Img variant='top' src={product.imageUrl} />
                    <Card.Body className='d-flex flex-column'>
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Text className='text-muted mb-4'>${product.unitPrice}</Card.Text>
                      <AddRemoveCartButton detailProduct={product} />
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <Col>
                <Card className='h-100 clickable'>
                  <Card.Img variant="top" src="holder.js/100px180" />
                  
                  <Card.Body className='d-flex flex-column'>
                    <Placeholder as={Card.Title} animation="glow">
                      <Placeholder xs={6} />
                    </Placeholder>

                    <Placeholder as={Card.Text} animation="glow">
                      <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                      <Placeholder xs={6} /> <Placeholder xs={8} />
                    </Placeholder>
                    <Placeholder.Button variant="primary" xs={6} />
                  </Card.Body>
                </Card>
              </Col>
            )
          }
        </Row>
      </Container>
    </div>
  )
}
