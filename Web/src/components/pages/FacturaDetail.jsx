import { Link, useParams } from "react-router-dom"
import { useFactura } from "../../hooks/useFactura"
import { useEffect } from "react"
import { Container, Spinner } from "react-bootstrap"

export default function FacturaDetail () {
  const { facturas, getFacturaById, getProductsFromFactura, products } = useFactura()
  const { facturaId } = useParams()

  useEffect(() => {
    getFacturaById(facturaId)
    getProductsFromFactura(facturaId)
  }, [])
  
  return (
    <Container className='flex-grow-1 py-2'>
      <Link to='/bought'>Back</Link>
      <h1>Purchase Detail</h1>
      <p>Bill no. {facturas?.facturaId || 'Loading...'}</p> {/* Verificación de existencia o mensaje */}
      
      <p>Products:</p>
      {
        products.length === 0 ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <ul>
            {products.map((producto, index) => (
              <li key={index}>
                <Link to={`/product/${producto.productId}`}><h5>{producto.name}</h5></Link>
                <p>Description: {producto.description}</p>
                <p>Price: ${producto.unitPrice}</p>
                <img src={producto.imageUrl} alt={producto.name} style={{ width: "100px" }} />
              </li>
            ))}
          </ul>
        )
      }
      <p>Total: ${facturas.totalPrice}</p>
    </Container>
  )
}