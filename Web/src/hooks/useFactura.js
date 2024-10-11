import { useContext, useState } from 'react'
import { UserContext } from '../context/user'
import { API_URL } from '../constants/constantes'

export function useFactura () {
  const { userVal } = useContext(UserContext)
  const [facturas, setFacturas] = useState([])

  const getFacturaUsuario = async () => {
    try {
      const response = await fetch(`${API_URL}api/Facturas/user/${userVal.userId}`)
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

  const getFacturaById = async (facturaId) => {
    try {
      const response = await fetch(`${API_URL}api/Facturas/${facturaId}`)
      const facturaJson = await response.json()
      const factura = {
        facturaId: facturaJson.facturaId,
        emissionDate: facturaJson.emissionDate,
        totalPrice: facturaJson.totalPrice,
        userId: facturaJson.userId,
        productos: facturaJson.productos
      }
      setFacturas(factura)
    } catch (error) {
      console.log(error)
    }
  }

  return { facturas, getFacturaUsuario, getFacturaById }
}