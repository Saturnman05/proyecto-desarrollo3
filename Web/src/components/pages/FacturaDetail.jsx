import { useParams } from "react-router-dom"
import { useFactura } from "../../hooks/useFactura"
import { useEffect } from "react"
import { Container } from "react-bootstrap"

export default function FacturaDetail () {
  const { facturas, getFacturaById } = useFactura()
  const { facturaId } = useParams()

  useEffect(() => {
    getFacturaById(facturaId)
  }, [])
  
  return (
    <Container className='flex-grow-1 py-2'>
      <h1>Purchase Detail</h1>
      <p>Bill no. {facturas?.facturaId}</p>
      <p>Products:</p>
      <ul>
        {
          facturas?.productos?.map((producto, index) => (
            <li key={index}>{producto}</li>
          ))
        }
      </ul>
    </Container>
  )
}