import React from 'react'
import { UserProvider } from '../context/user'

export default function Providers ({ children }) {
  return (
    <React.StrictMode>
      <UserProvider>
        { children }
      </UserProvider>
    </React.StrictMode>
  )
}
