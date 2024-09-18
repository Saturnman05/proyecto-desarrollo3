import { createContext, useState } from 'react'

// crear el context
export const CartContext = createContext()

//crear el provider
export function CartProvider ({ children }) {
  const [cartProducts, setCartProducts] = useState([])

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
