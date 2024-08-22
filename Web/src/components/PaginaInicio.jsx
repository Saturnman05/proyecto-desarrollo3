import { Card, CardHeader, CardBody, CardFooter, Text, Heading, Image } from "@chakra-ui/react"

import { useEffect } from "react"
import { useProducts } from "../hooks/useProducts"

import Nav from "./Nav"

export default function PaginaInicio () {  
  const { products, loadProducts } = useProducts()

  useEffect(() => {
    loadProducts()
  })

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
