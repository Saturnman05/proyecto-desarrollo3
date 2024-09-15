import { useEffect } from 'react'
import { useProducts } from '../../hooks/useProducts'
import { Button, Container, Col, Card, Row, } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function PaginaInicio () {  
  const { products, loadProducts } = useProducts()

  const navigate = useNavigate()

  const mockProducts = [
    { productId: 1, name: "Minimal Chair", description: '', unitPrice: "$199", stock: 12, dateCreated: '10/1/2024', imageUrl: "https://gotmuebles.mx/cdn/shop/products/silla-core-got-muebles.jpg?v=1456415173" },
    { productId: 2, name: "Sleek Table", description: '', unitPrice: "$299", stock: 12, dateCreated: '10/1/2024', imageUrl: "https://www.miliboo.es/mesa-rectangular-extensible-con-extensiones-integradas-de-roble-claro-140-170-cm-ank-55287-64f1dc9203256_1200_675_.jpg" },
    { productId: 3, name: "Creatina", description: 'Creatina, pero no la de Greg Doucette', unitPrice: "$20", stock: 12, dateCreated: '10/1/2024', imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdDA1hq7ItMYJ4o8AeRoyspQjNR3_dEcfcCw&s" },
    { productId: 4, name: "Cozy Rug", description: '', unitPrice: "$159", stock: 12, dateCreated: '10/1/2024', imageUrl: "https://mydormstore.ca/cdn/shop/files/S8111ac2a108e465f994622373f156e98r_f0b8823b-5615-484a-bd04-8f1fdbe32c18.jpg?v=1690491123&width=1445" },
    { productId: 5, name: "Elegant Vase", description: '', unitPrice: "$79", stock: 12, dateCreated: '10/1/2024', imageUrl: "https://m.media-amazon.com/images/I/61KvH-iybDL.jpg" },
    { productId: 6, name: "Simple Bookshelf", description: '', unitPrice: "$249", stock: 12, dateCreated: '10/1/2024', imageUrl: "https://images.prismic.io/containerstoriesproduction/a54f09505edc38a103b5de2af84711b69ebb5d64_4simplebookshelfideas_1200_tip.jpg?auto=format" },
    { productId: 7, name: "Minimalist Clock", description: '', unitPrice: "$69", stock: 12, dateCreated: '10/1/2024', imageUrl: "https://www.zuiver.com/media/catalog/product/cache/75d4fed6916b4fccba5b665c8fe3ed87/8/5/8500047_01000_x_1000.jpg" },
    { productId: 8, name: "Sleek Desk", description: '', unitPrice: "$349", stock: 12, dateCreated: '10/1/2024', imageUrl: "https://i.etsystatic.com/27040509/r/il/b4ea1a/3660935010/il_570xN.3660935010_igkp.jpg" },
  ]

  useEffect(() => {
    loadProducts()
  }, [])

  return (
    <div className="pagina-inicio">
      <Container className="flex-grow-1 py-2">
        <h1 className="text-center mb-5">Our Products</h1>
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {
            products.map((product) => (
              <Col key={product.productId}>
                <Card className="h-100 clickable" onClick={() => navigate(`/product/${product.productId}`)}>
                  <Card.Img variant='top' src={product.imageUrl} />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text className="text-muted mb-4">${product.unitPrice}</Card.Text>
                    <Button variant="primary" className="mt-auto">Add to Cart</Button>
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
