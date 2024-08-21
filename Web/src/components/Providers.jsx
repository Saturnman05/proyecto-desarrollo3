import React from 'react'
import PropTypes from 'prop-types'
import { ChakraProvider } from '@chakra-ui/react'
import { UserProvider } from '../context/user'

export default function Providers ({ children }) {
  return (
    <React.StrictMode>
      <ChakraProvider>
        <UserProvider>
          { children }
        </UserProvider>
      </ChakraProvider>
    </React.StrictMode>
  )
}

Providers.propTypes = {
  children: PropTypes.node.isRequired,
}
