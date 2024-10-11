import { useParams } from "react-router-dom"
import { useFactura } from "../../hooks/useFactura"
import { useEffect } from "react"

export default function FacturaDetail () {
  const { facturas, getFacturaById } = useFactura()
  const { facturaId } = useParams()

  useEffect(() => {
    getFacturaById(facturaId)
  }, [])
  
  return (
    <>
      <h1>factura detail</h1>
      {
        <h1>{facturas.facturaId}</h1>
      }
    </>
  )
}