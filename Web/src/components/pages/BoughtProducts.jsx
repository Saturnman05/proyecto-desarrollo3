import { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useFactura } from '../../hooks/useFactura'
import { useNavigate } from 'react-router-dom'

export default function BoughtProducts () {
  const { facturas, getFacturaUsuario } = useFactura()
  const navigate = useNavigate()

  useEffect(() => {
    getFacturaUsuario()
  }, [])

  return (
    <Container className='flex-grow-1 py-2'>
      <h1>Purchase History</h1>
      {
        facturas.map(factura => (
          <div className='factura' onClick={() => navigate(`/factura/${factura.facturaId}`)}>
            <hr/>
            <p>Bill no. {factura.facturaId}</p>
            <p>Products Amount: {factura.productos.length}</p>
            <p>Total price: ${factura.totalPrice}</p>
          </div>
        ))
      }
    </Container>
  )
}
