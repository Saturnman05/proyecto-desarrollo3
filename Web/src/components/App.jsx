import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './Login'
import PaginaInicio from './PaginaInicio'
import NavComponent from './NavComponent'

export default function App () {
  return (
    <>
      <NavComponent />
      <Router>
        <Routes>
          <Route path="/" element={<PaginaInicio />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  )
}
