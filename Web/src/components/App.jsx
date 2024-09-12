import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import PaginaInicio from './pages/PaginaInicio'
import Register from './pages/Register'
import NavComponent from './NavComponent'

export default function App () {
  return (
    <>
      <NavComponent />
      <Router>
        <Routes>
          <Route path="/" element={<PaginaInicio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  )
}
