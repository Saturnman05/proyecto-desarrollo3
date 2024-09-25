import { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useCart } from '../../hooks/useCart'
import jsPDF from 'jspdf'

export default function BuyProducts () {
  const { cartProducts, totalPrice, loadUserCartProducts, buyCart } = useCart() // Usa las funciones necesarias del hook useCart
  const [rnc, setRnc] = useState('') // Estado para almacenar el RNC ingresado por el usuario

  useEffect(() => {
    loadUserCartProducts()
  }, [])

  const generatePDF = (rnc) => {
    const doc = new jsPDF()
    doc.setFontSize(18)
    doc.text('Factura', 20, 20)

    doc.setFontSize(12)
    doc.text(`RNC: ${rnc}`, 20, 30)
    doc.text(`Total: $${totalPrice}`, 20, 40)

    doc.text('Productos:', 20, 50)
    cartProducts.forEach((product, index) => {
      doc.text(`${index + 1}. ${product.name} - $${product.unitPrice}`, 20, 60 + index * 10)
    })

    doc.save('factura.pdf') // Guarda el archivo como "factura.pdf"
  }

  const handleBuy = (e) => {
    e.preventDefault()
    if (rnc && totalPrice > 0) {
      buyCart(rnc)
      generatePDF(rnc)
    } else {
      console.log('RNC es requerido o el carrito está vacío')
    }
  }

  return (
    <main className='center-column'>
      <h1>Buy Products</h1>
      
      {
        (cartProducts.length === 0) ? (
          <p>No tienes productos en tu carrito.</p>
        ) : (
          <>
            <h2>Total: ${totalPrice}</h2>
            <Form onSubmit={handleBuy}>
              <Form.Group className='mb-3'>
                <Form.Label>RNC</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='111-1111-1111'
                  value={rnc}
                  onChange={(e) => setRnc(e.target.value)}
                />
              </Form.Group>
              <Button variant='primary' type='submit'>
                Buy
              </Button>
            </Form>
          </>
        )
      }
    </main>
  )
}
