import { createContext, useState } from 'react';

// crear el context
export const UserContext = createContext()

// crear el provider
export function UserProvider ({ children }) {
  const [userVal, setUserVal] = useState({userId: '', username: '', fullName: '', password: ''})

  return (
    <UserContext.Provider value={{
      userVal,
      setUserVal  
    }}
    >
      {children}
    </UserContext.Provider>
  )
}
