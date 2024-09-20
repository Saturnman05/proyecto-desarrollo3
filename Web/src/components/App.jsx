import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import NavComponent from './NavComponent'

import BoughtProducts from './pages/BoughtProducts'
import Cart from './pages/Cart'
import Login from './pages/Login'
import MyProduct from './pages/MyProduct'
import PaginaInicio from './pages/PaginaInicio'
import Product from './pages/Product'
import PublishProduct from './pages/PublishProduct'
import Register from './pages/Register'

export default function App () {
  return (
    <>
      <Router>
        <NavComponent />
        <Routes>
          <Route path='/' element={<PaginaInicio />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/product/:productId' element={<Product />} />
          <Route path='/cart/:userId' element={<Cart />} />
          <Route path='/my-product' element={<MyProduct />} />
          <Route path='/bought' element={<BoughtProducts />} />
          <Route path='/publish-product' element={<PublishProduct />}/>
        </Routes>
      </Router>
    </>
  )
}
