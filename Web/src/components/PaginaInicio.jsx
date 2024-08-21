import { useEffect, useState } from "react"
import { Card, CardHeader, CardBody, CardFooter, Text, Heading, Image } from "@chakra-ui/react"

import Nav from "./Nav"
import { API_URL } from "../constants/constantes"

// eslint-disable-next-line react/prop-types
export default function PaginaInicio () {
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

  useEffect(() => {
    loadProducts()
  }, [])

  return (
    <div className="pagina-inicio">
      <Nav />

      {
        (products.length > 0) ? (
          products.map(product => (
            <Card key={product.productId} className='card'>
              <CardHeader>
                <Heading size='md'>{product.name}</Heading>
              </CardHeader>

              <Image objectFit='cover' maxW={{ base: '100%', sm: '200px' }} src={product.imageUrl} />

              <CardBody>
                <Text>Descripción: {product.description}</Text>
              </CardBody>

              <CardFooter>
                <Text>Precio: ${product.unitPrice}</Text>
              </CardFooter>
            </Card>
          ))
        ) : (<p>No hay productos</p>)
      }
    </div>
  )
}