import { useContext, useEffect, useState } from 'react'
import { Button, Container, Form, Nav, Navbar, NavDropdown, Offcanvas } from 'react-bootstrap'
import { UserContext } from '../context/user'

export default function NavComponent () {
  const { userVal, setUserVal } = useContext(UserContext)
  const [menuMessage, setMenuMessage] = useState(`Menu ${(userVal.userName !== '') ? `de ${userVal.userName}` : ''}`)

  useEffect(() => {
    setMenuMessage(`Menu ${(userVal.userName) ? `de ${userVal.userName}` : ''}`)
  }, [userVal])

  const logout = () => {
    setUserVal({ userId: '', username: '', fullName: '', password: '' })
  }

  return (
    <Navbar key={"xxl"} expand={"xxl"} className="bg-body-tertiary mb-3">
      <Container fluid>
        <Navbar.Brand href="/">CompraNet</Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar-expand-xxl" />
        <Navbar.Offcanvas
          id="offcanvasNavbar-expand-xxl"
          aria-labelledby="offcanvasNavbarLabel-expand-xxl"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel-expand-xxl">
              {menuMessage}
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link href="/">Home</Nav.Link>
              {
                (Number.isInteger(userVal.userId) && userVal.userId > 0) ? (
                  <Nav.Link href="/" onClick={() => logout()}>Log Out</Nav.Link>
                ) : (
                  <>
                    <Nav.Link href="/login">Log In</Nav.Link>
                    <Nav.Link href='/register'>Register</Nav.Link>
                  </>
                )
              }
              <NavDropdown
                title="Dropdown"
                id="offcanvasNavbarDropdown-expand-xxl"
              >
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success" onClick={() => { console.log(userVal); console.log(userVal.userId) }}>Search</Button>
            </Form>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  )
}
