import React from 'react'
import { UserProvider } from '../context/user'

export default function Providers ({ children }) {
  return (
    <>
      <UserProvider>
        { children }
      </UserProvider>
    </>
  )
}
