import { useContext } from 'react'
import { UserContext } from '../context/user'

export function useUser () {
  const { userVal, setUserVal } = useContext(UserContext)
  return { userVal, setUserVal }
}