import React from 'react'
import PropTypes from 'prop-types'
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

Providers.propTypes = {
  children: PropTypes.node.isRequired,
}
