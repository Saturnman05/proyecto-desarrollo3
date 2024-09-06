import { useEffect } from 'react'
import { useProducts } from '../hooks/useProducts'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

import NavComponent from '../components/NavComponent'

export default function PaginaInicio () {  
  const { products, loadProducts } = useProducts()

  useEffect(() => {
    loadProducts()
  })

  return (
    <div className="pagina-inicio">
      <NavComponent />
      {
        (products.length > 0) ? (
          products.map(product => (
            <Card key={product.productId} className='card' style={{ width: '18rem' }}>
              <Card.Img variant='top' src={product.imageUrl}/>
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">${product.unitPrice}</Card.Subtitle>
                <Card.Text>{product.description}</Card.Text>
                <Button variant="primary">View product</Button>
              </Card.Body>
            </Card>
          ))
        ) : (<p>No hay productos</p>)
      }
    </div>
  )
}
