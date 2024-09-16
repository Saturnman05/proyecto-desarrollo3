import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import NavComponent from './NavComponent'

import Cart from './pages/Cart'
import Login from './pages/Login'
import PaginaInicio from './pages/PaginaInicio'
import Product from './pages/Product'
import Register from './pages/Register'

export default function App () {
  return (
    <>
      <Router>
        <NavComponent />
        <Routes>
          <Route path="/" element={<PaginaInicio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart/:userId" element={<Cart />} /> 
        </Routes>
      </Router>
    </>
  )
}
