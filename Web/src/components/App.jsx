import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './Login'
import PaginaInicio from './PaginaInicio'

function App () {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<PaginaInicio />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  )
}

export default App