import { useContext, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { UserContext } from '../../context/user'
import { useFactura } from '../../hooks/useFactura'

export default function BoughtProducts () {
  const { facturas, getFacturaUsuario } = useFactura()

  useEffect(() => {
    getFacturaUsuario()
  }, [])

  return (
    <Container className='flex-grow-1 py-2'>
      <h1>Purchase History</h1>
      {
        facturas.map(factura => (
          <>
            <p>Factura no. {factura.facturaId}</p>
            <p>User ID: {factura.userId}</p>
            <p>Products Amount: {factura.productos.length}</p>
          </>
        ))
      }
    </Container>
  )
}
