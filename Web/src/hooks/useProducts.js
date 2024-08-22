import { useState } from "react";
import { API_URL } from "../constants/constantes";

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
      dateCreated: product.dateCreated
    }))
    
    setProducts(productsList)
  }

  return { products, setProducts, loadProducts }
}