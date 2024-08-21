import { createContext, useState } from 'react';

// crear el context
export const UserContext = createContext()

// crear el provider
// eslint-disable-next-line react/prop-types
export function UserProvider ({ children }) {
  const [userVal, setUserVal] = useState({username: '', fullName: '', password: ''})
  return (
    <UserContext.Provider value={{
      userVal,
      setUserVal  
    }}>
      {children}
    </UserContext.Provider>
  )
}
