import { useContext, useState } from 'react'
import { UserContext } from '../context/user'
import { API_URL } from '../constants/constantes'

export function useFactura () {
    const { userVal } = useContext(UserContext)
    const [facturas, setFacturas] = useState([])

    // Obtener todas las facturas del usuario
    const getFacturaUsuario = async () => {
      try {
        const response = await fetch(`${API_URL}api/Facturas`)
        const facturaJson = await response.json()
        
        const allFacturas = facturaJson?.map(factura => ({
          facturaId: factura.facturaId,
          rnc: factura.rnc,
          emissionDate: factura.emissionDate,
          totalPrice: factura.totalPrice,
          userId: factura.userId,
          productos: [...factura.productos]
        }))

        setFacturas(allFacturas.filter(factura => factura.userId === userVal.userId))
      } catch (error) {
        console.log(error)
      }
    }
  
    return { facturas, getFacturaUsuario }
}