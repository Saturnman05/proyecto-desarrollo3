import { useParams } from 'react-router-dom'
import { API_URL } from '../../constants/constantes'
import { useEffect, useState } from 'react'

export default function Product() {
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

  useEffect(() => {
    getProduct()
  }, [])

  return (
    <div>
      {
        product ? (
          <>
            <h1>{product.name}</h1>
            <p>Price: {product.unitPrice}</p>
          </>
        ) : (
          <>
            <p>Product not found</p>
          </>
        )
      }
    </div>
  )
}
