import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faHome, faUser } from '@fortawesome/free-solid-svg-icons'

import { useLogout } from '../hooks/useLogout'

export default function NavComponent () {
  const { userVal, logout } = useLogout()
  const [menuMessage, setMenuMessage] = useState(`Menu ${(userVal.userName !== '') ? `de ${userVal.userName}` : ''}`)

  useEffect(() => {
    setMenuMessage(`Menu ${(userVal.userName) ? `de ${userVal.userName}` : ''}`)
  }, [userVal])

  return (
    <Navbar key={'lg'} expand={'lg'} className='bg-body-tertiary mb-3'>
      <Container fluid>
        <Navbar.Brand as={Link} to='/'>CompraNet</Navbar.Brand>
        <Navbar.Toggle aria-controls='offcanvasNavbar-expand-lg' />
        <Navbar.Offcanvas
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
              <Nav.Link as={Link} to='/'><FontAwesomeIcon icon={faHome} /> Home</Nav.Link>
              {
                (Number.isInteger(userVal.userId) && userVal.userId > 0) ? (
                  <>
                    <Nav.Link as={Link} to={`cart/${userVal.userId}`}>
                      <FontAwesomeIcon icon={faShoppingCart} /> My Cart
                    </Nav.Link>
                    <Nav.Link as={Link} to='/publish-product'>Publish Product</Nav.Link>
                    <Nav.Link as={Link} to='/' onClick={() => logout()}>Log Out</Nav.Link>
                  </>
                ) : (
                  <>
                    <Nav.Link as={Link} to='/login'>Log In</Nav.Link>
                    <Nav.Link as={Link} to='/register'>Register</Nav.Link>
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
