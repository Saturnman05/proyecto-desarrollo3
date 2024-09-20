import { useContext, useState } from 'react'
import { API_URL } from '../constants/constantes'
import { UserContext } from '../context/user'

export function useCart () {
  const [products, setProducts] = useState([])
  const { userVal } = useContext(UserContext)

  const getCarritoId = async () => {
    const response = await fetch(`${API_URL}api/Carrito/carritobyuser/${userVal.userId}`)
    const responseJson = await response.json()
    const carritoId = responseJson.carritoId
    return carritoId
  }

  const loadUserCartProducts = async () => {
    try {
      const carritoId = await getCarritoId()
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

  const removeFromCart = async (event, productId) => {
    event.stopPropagation()

    try {
      const carritoId = await getCarritoId()

      const carritoProduct = {
        carritoId: carritoId,
        productId: productId,
        productAmount: 1
      }
      
      const response = await fetch(`${API_URL}api/Carrito/DeleteProduct`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(carritoProduct)
      })

      if (response.ok) {
        loadUserCartProducts()
      }
    } catch (error) {
      console.log('Error: ', error)
    }
  }

  const addToCart = async (event, productId) => {
    event.stopPropagation()

    try {
      const carritoId = await getCarritoId()

      const carritoProduct = {
        carritoId: carritoId,
        productId: productId,
        productAmount: 1
      }
      
      const response = await fetch(`${API_URL}api/Carrito/AddProduct`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(carritoProduct)
      })

      if (response.ok) {
        loadUserCartProducts()
      }
    } catch (error) {
      console.log('Error: ', error)
    }
  }

  const isInCart = (productId) => {
    return products.some(cartProduct => cartProduct.productId === productId)
  }

  return { cartProducts: products, setProducts, loadUserCartProducts, removeFromCart, addToCart, isInCart }
}
