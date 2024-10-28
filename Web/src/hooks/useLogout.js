import { useContext } from 'react'
import { UserContext } from '../context/user'

export function useLogout () {
  const { userVal, setUserVal } = useContext(UserContext)

  const logout = () => {
    setUserVal({ userId: '', username: '', fullName: '', password: '' })
  }

  return { userVal, setUserVal, logout }
}
