import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { Container, Nav, Navbar, NavDropdown, Offcanvas } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faHome } from '@fortawesome/free-solid-svg-icons'

import { useLogout } from '../hooks/useLogout'

export default function NavComponent () {
  const { userVal, logout } = useLogout()
  const [menuMessage, setMenuMessage] = useState(`Menu ${(userVal.userName !== '') ? `de ${userVal.userName}` : ''}`)
  const [showOffCanvas, setShowOffCanvas] = useState(false)

  const handleClose = () => setShowOffCanvas(false)
  const handleShow = () => setShowOffCanvas(true)

  useEffect(() => {
    setMenuMessage(`Menu ${(userVal.userName) ? `de ${userVal.userName}` : ''}`)
  }, [userVal])

  return (
    <Navbar key={'lg'} expand={'lg'} className='bg-body-tertiary mb-3'>
      <Container fluid>
        <Navbar.Brand as={Link} to='/'>CompraNet</Navbar.Brand>
        <Navbar.Toggle aria-controls='offcanvasNavbar-expand-lg' onClick={handleShow} />
        <Navbar.Offcanvas
          show={showOffCanvas}
          onHide={handleClose}
          id='offcanvasNavbar-expand-lg'
          aria-labelledby='offcanvasNavbarLabel-expand-lg'
          placement='end'
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id='offcanvasNavbarLabel-expand-lg'>
              {menuMessage}
            </Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body>
            <Nav className='justify-content-end flex-grow-1 pe-3'>
              <Nav.Link as={Link} to='/' onClick={handleClose}><FontAwesomeIcon icon={faHome} /> Home</Nav.Link>
              {
                (Number.isInteger(userVal.userId) && userVal.userId > 0) ? (
                  <>
                    <Nav.Link as={Link} to='/cart' onClick={handleClose}>
                      <FontAwesomeIcon icon={faShoppingCart} /> My Cart
                    </Nav.Link>
                    <NavDropdown title='Product' id='basic-nav-dropdown'>
                      <NavDropdown.Item as={Link} to='/my-product' onClick={handleClose}>My Products</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to='/publish-product' onClick={handleClose}>Publish Product</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to='/bought' onClick={handleClose}>Purchase</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link as={Link} to='/' onClick={() => {logout(); handleClose()}}>Log Out</Nav.Link>
                  </>
                ) : (
                  <>
                    <Nav.Link as={Link} to='/login' onClick={handleClose}>Log In</Nav.Link>
                    <Nav.Link as={Link} to='/register' onClick={handleClose}>Register</Nav.Link>
                  </>
                )
              }
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  )
}
