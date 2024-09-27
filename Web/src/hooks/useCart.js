import { useContext, useState } from 'react'
import { API_URL } from '../constants/constantes'
import { UserContext } from '../context/user'

export function useCart () {
  const [products, setProducts] = useState([])
  const { userVal } = useContext(UserContext)

  const totalPrice = products ? products.reduce((total, product) => total + product.unitPrice, 0) : 0

  const getCarritoId = async () => {
    const response = await fetch(`${API_URL}api/Carrito/carritobyuser/${userVal.userId}`)
    const responseJson = await response.json()
    const carritoId = responseJson.carritoId
    return carritoId
  }

  // aqui esta el error del userId
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
        dateCreated: product.dateCreated,
        userId: product.userId
      }))

      setProducts(productsList)
    } catch (error) {
      console.log('Error: ', error)
    }
  }

  const removeFromCart = async (event, productId) => {
    event?.stopPropagation()

    try {
      const carritoId = await getCarritoId()
      console.log('id del carrito', carritoId)

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

  const updateProduct = async (product) => {
    // TODO: terminar esta funcion
    // Creo que ya esta terminada
    const productData = {
      productId: product.productId,
      name: product.name,
      description: product.description,
      imageUrl: product.imageUrl,
      unitPrice: product.unitPrice,
      stock: product.stock,
      dateCreated: product.dateCreated,
      userId: product.userId
    }

    try {
      const response = await fetch(`${API_URL}api/products/${product.productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
      })

      if (response.ok) {
        console.log('succes')
      }
    } catch (error) {
      console.log(error)
    }
  }
  

  const buyCart = async (rnc) => {
    console.log(products)

    const productsName = products?.map(product => product.name)

    const facturaData = {
      facturaId: 0,
      rnc: rnc,
      emissionDate: new Date().toISOString(),
      totalPrice: totalPrice,
      userId: userVal.userId,
      productos: productsName
    }

    console.log(JSON.stringify(facturaData))

    try {
      const response = await fetch(`${API_URL}api/Facturas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(facturaData)
      })

      if (response.ok) {
        for (let product of products) {
          product.stock--
          // TODO: update products para que se guarde en la base de datos
          await updateProduct(product)
          await removeFromCart(null, product)
        }
        console.log('success')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return { cartProducts: products, setProducts, loadUserCartProducts, removeFromCart, addToCart, isInCart, totalPrice, buyCart }
}
