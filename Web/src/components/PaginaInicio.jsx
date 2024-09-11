import { useEffect } from 'react'
import { useProducts } from '../hooks/useProducts'
import { Button, Container, Col, Card, Row, } from 'react-bootstrap'

export default function PaginaInicio () {  
  const { products, loadProducts } = useProducts()

  const mockProducts = [
    { productId: 1, name: "Minimal Chair", description: '', unitPrice: "$199", stock: 12, dateCreated: '10/1/2024', imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdDA1hq7ItMYJ4o8AeRoyspQjNR3_dEcfcCw&s" },
    { productId: 2, name: "Sleek Table", description: '', unitPrice: "$299", stock: 12, dateCreated: '10/1/2024', imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdDA1hq7ItMYJ4o8AeRoyspQjNR3_dEcfcCw&s" },
    { productId: 3, name: "Modern Lamp", description: '', unitPrice: "$89", stock: 12, dateCreated: '10/1/2024', imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdDA1hq7ItMYJ4o8AeRoyspQjNR3_dEcfcCw&s" },
    { productId: 4, name: "Cozy Rug", description: '', unitPrice: "$159", stock: 12, dateCreated: '10/1/2024', imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdDA1hq7ItMYJ4o8AeRoyspQjNR3_dEcfcCw&s" },
    { productId: 5, name: "Elegant Vase", description: '', unitPrice: "$79", stock: 12, dateCreated: '10/1/2024', imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdDA1hq7ItMYJ4o8AeRoyspQjNR3_dEcfcCw&s" },
    { productId: 6, name: "Simple Bookshelf", description: '', unitPrice: "$249", stock: 12, dateCreated: '10/1/2024', imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdDA1hq7ItMYJ4o8AeRoyspQjNR3_dEcfcCw&s" },
    { productId: 7, name: "Minimalist Clock", description: '', unitPrice: "$69", stock: 12, dateCreated: '10/1/2024', imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdDA1hq7ItMYJ4o8AeRoyspQjNR3_dEcfcCw&s" },
    { productId: 8, name: "Sleek Desk", description: '', unitPrice: "$349", stock: 12, dateCreated: '10/1/2024', imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdDA1hq7ItMYJ4o8AeRoyspQjNR3_dEcfcCw&s" },
  ]

  useEffect(() => {
    loadProducts()
  }, [])

  return (
    <div className="pagina-inicio">
      <Container className="flex-grow-1 py-2">
        <h1 className="text-center mb-5">Our Products</h1>
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {mockProducts.map((product) => (
            <Col key={product.productId}>
              <Card className="h-100">
                <Card.Img variant='top' src={product.imageUrl} />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text className="text-muted mb-4">{product.unitPrice}</Card.Text>
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
