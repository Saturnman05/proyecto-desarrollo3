import { useEffect } from 'react'
import { useProducts } from '../hooks/useProducts'
import { Button, Container, Col, Card, Row, } from 'react-bootstrap'

export default function PaginaInicio () {  
  const { products, loadProducts } = useProducts()

  const mockProducts = [
    { id: 1, name: "Minimal Chair", price: "$199", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdDA1hq7ItMYJ4o8AeRoyspQjNR3_dEcfcCw&s" },
    { id: 2, name: "Sleek Table", price: "$299", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdDA1hq7ItMYJ4o8AeRoyspQjNR3_dEcfcCw&s" },
    { id: 3, name: "Modern Lamp", price: "$89", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdDA1hq7ItMYJ4o8AeRoyspQjNR3_dEcfcCw&s" },
    { id: 4, name: "Cozy Rug", price: "$159", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdDA1hq7ItMYJ4o8AeRoyspQjNR3_dEcfcCw&s" },
    { id: 5, name: "Elegant Vase", price: "$79", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdDA1hq7ItMYJ4o8AeRoyspQjNR3_dEcfcCw&s" },
    { id: 6, name: "Simple Bookshelf", price: "$249", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdDA1hq7ItMYJ4o8AeRoyspQjNR3_dEcfcCw&s" },
    { id: 7, name: "Minimalist Clock", price: "$69", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdDA1hq7ItMYJ4o8AeRoyspQjNR3_dEcfcCw&s" },
    { id: 8, name: "Sleek Desk", price: "$349", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdDA1hq7ItMYJ4o8AeRoyspQjNR3_dEcfcCw&s" },
  ]

  useEffect(() => {
    loadProducts()
  }, [])

  return (
    <div className="pagina-inicio">
      <Container className="flex-grow-1 py-5">
        <h1 className="text-center mb-5">Our Products</h1>
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {mockProducts.map((product) => (
            <Col key={product.id}>
              <Card className="h-100">
                <Card.Img variant='top' src={product.image} />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text className="text-muted mb-4">{product.price}</Card.Text>
                  <Button variant="primary" className="mt-auto">Add to Cart</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  )
}
