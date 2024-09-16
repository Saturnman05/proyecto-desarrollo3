import { useContext, useState } from 'react'
import { API_URL } from '../constants/constantes'
import { UserContext } from '../context/user'

export function useCart () {
  const [products, setProducts] = useState()
  const { userVal } = useContext(UserContext)

  const loadUserCartProducts = async () => {
    try {
      const response = await fetch(`${API_URL}api/Carrito/carritobyuser/${userVal.userId}`)
      const responseJson = await response.json()
      const carritoId = await responseJson.carritoId
      
      const productsResponse = await fetch(`${API_URL}api/Carrito/productoscarrito/${carritoId}`)
      const productsJson = await productsResponse.json()

      const productsList = productsJson?.map(product => ({
        productId: product.productId,
        name: product.name,
        description: product.description,
        imageUrl: product.imageUrl,
        unitPrice: product.unitPrice,
        stock: product.stock,
        dateCreated: product.dateCreated
      }))

      setProducts(productsList)
    } catch (error) {
      console.log('Error: ', error)
    }
  }

  return { products, setProducts, loadUserCartProducts }
}