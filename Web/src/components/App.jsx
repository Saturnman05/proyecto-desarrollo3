import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import NavComponent from './NavComponent'

import Login from './pages/Login'
import PaginaInicio from './pages/PaginaInicio'
import Product from './pages/Product'
import Register from './pages/Register'

export default function App () {
  return (
    <>
      <NavComponent />
      <Router>
        <Routes>
          <Route path="/" element={<PaginaInicio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:productId" element={<Product />} />
        </Routes>
      </Router>
    </>
  )
}
