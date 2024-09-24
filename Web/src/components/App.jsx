import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Suspense, lazy } from 'react'

import NavComponent from './NavComponent'

const BoughtProducts = lazy(() => import('./pages/BoughtProducts'))
const Cart = lazy(() => import('./pages/Cart'))
const Login = lazy(() => import('./pages/Login'))
const MyProduct = lazy(() => import('./pages/MyProduct'))
const PaginaInicio = lazy(() => import('./pages/PaginaInicio'))
const Product = lazy(() => import('./pages/Product'))
const PublishProduct = lazy(() => import('./pages/PublishProduct'))
const Register = lazy(() => import('./pages/Register'))

export default function App () {
  return (
    <Router>
      <NavComponent />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={<PaginaInicio />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/product/:productId' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/my-product' element={<MyProduct />} />
          <Route path='/bought' element={<BoughtProducts />} />
          <Route path='/publish-product' element={<PublishProduct />} />
        </Routes>
      </Suspense>
    </Router>
  )
}
