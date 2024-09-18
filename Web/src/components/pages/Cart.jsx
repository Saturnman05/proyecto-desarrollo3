import { Button, Container, Table, Image } from 'react-bootstrap'
import { useEffect } from 'react'
import { useCart } from '../../hooks/useCart'
import { useNavigate } from 'react-router-dom'

export default function Cart () {
  const { cartProducts, loadUserCartProducts, removeFromCart } = useCart()
  const navigate = useNavigate()
  useEffect(() => {
    loadUserCartProducts()
  }, [])

  return (
    <Container className="flex-grow-1 py-2">
      <h1 className="text-center mb-5">Cart Page</h1>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Image</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            (cartProducts) ? (
              cartProducts.map((product) => (
                <tr key={product.productId} onClick={() => navigate(`/product/${product.productId}`)}>
                  <td>
                    <Image src={product.imageUrl} rounded fluid style={{ maxWidth: '100px' }} />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.unitPrice}</td>
                  <td>
                    <Button variant="danger" className="mt-auto" onClick={(event) => removeFromCart(event, product.productId)}>
                      Remove from Cart
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  Error...
                </td>
              </tr>
            )
          }
        </tbody>
      </Table>
    </Container>
  )
}
