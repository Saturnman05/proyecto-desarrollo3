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

  const totalPrice = cartProducts ? cartProducts.reduce((total, product) => total + product.unitPrice, 0) : 0

  return (
    <Container className="flex-grow-1 py-2">
      <h1 className="text-center mb-5">Cart Page</h1>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Image</th>
            <th>Product Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            cartProducts ? (
              cartProducts.map((product) => (
                <tr key={product.productId} onClick={() => navigate(`/product/${product.productId}`)}>
                  <td>
                    <Image src={product.imageUrl} rounded fluid style={{ maxWidth: '100px' }} />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>${product.unitPrice.toFixed(2)}</td>
                  <td>
                    <Button variant="danger" className="mt-auto" onClick={(event) => removeFromCart(event, product.productId)}>
                      Remove from Cart
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">Error...</td>
              </tr>
            )
          }

          <tr>
            <td colSpan="3" className="text-end fw-bold">Total:</td>
            <td colSpan="2" className="fw-bold">${totalPrice.toFixed(2)}</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  )
}
