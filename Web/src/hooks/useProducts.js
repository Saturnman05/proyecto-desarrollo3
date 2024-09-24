import { useState } from 'react'
import { API_URL } from '../constants/constantes'
import { useParams } from 'react-router-dom'

export function useProducts () {
  const [products, setProducts] = useState([])

  const loadProducts = async () => {
    const allProductsResponse = await fetch(`${API_URL}api/Products`)
    const productsJson = await allProductsResponse.json()

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
  }

  return { products, setProducts, loadProducts }
}

export function useProduct () {
  const { productId } = useParams()
  const [product, setProduct] = useState(null)

  const getProduct = async () => {
    try {
      const response = await fetch(`${API_URL}api/Products/${productId}`)

      if (!response.ok) {
        throw new Error('Error al obtener los datos del producto')
      }

      const productData = await response.json()
      setProduct(productData)
    } catch (error) {
      console.log('Error:', error)
    }
  }

  return { product, getProduct }
}
