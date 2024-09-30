import { useContext, useState } from 'react'
import { API_URL } from '../constants/constantes'
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../context/user'

export function useProducts () {
  const [products, setProducts] = useState([])
  const { getProduct } = useProduct()

  const loadProducts = async (filtrar) => {
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
    
    setProducts(filtrar ? productsList.filter(product => product.stock > 0) : productsList)
  }

  const updateProductStock = async (productId, stockAdd) => {
    try {
      const productData = await getProduct(productId)
      const newStock = productData.stock + stockAdd
      productData.stock = newStock

      const response = await fetch(`${API_URL}api/Products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
      })
    } catch (error) {
      console.log(error)
    }
  }

  return { products, setProducts, loadProducts, updateProductStock }
}

export function useProduct () {
  const { productId } = useParams()
  const [product, setProduct] = useState(null)

  const getProduct = async (thisProductId) => {
    const prodId = (thisProductId) ? thisProductId : productId

    try {
      const response = await fetch(`${API_URL}api/Products/${prodId}`)

      if (!response.ok) {
        throw new Error('Error al obtener los datos del producto')
      }

      const productData = await response.json()
      
      if (thisProductId) {
        return productData
      }

      setProduct(productData)
    } catch (error) {
      console.log('Error:', error)
    }
  }

  return { product, getProduct }
}

export function usePublishProduct () {
  const [product, setProduct] = useState({ name: '', description: '', imageUrl: '', unitPrice: 0, stock: 0 })
  const { userVal } = useContext(UserContext)

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event?.preventDefault()
    console.log(userVal)
    const productData = {
      productId: 0,
      name: product.name,
      description: product.description,
      imageUrl: product.imageUrl,
      unitPrice: product.unitPrice,
      stock: product.stock,
      dateCreated: new Date().toISOString(),
      userId: userVal.userId
    }

    try {
      const response = await fetch(`${API_URL}api/Products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      })

      if (response.ok) {
        navigate('/my-product')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return { product, setProduct, handleSubmit }
}
