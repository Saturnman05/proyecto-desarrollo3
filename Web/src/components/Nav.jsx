import SideMenu from './SideMenu'

import { useContext } from 'react'
import { UserContext } from '../context/user'

import './Nav.css'

export default function Nav () {
  const { userVal } = useContext(UserContext)

  return (
    <div className='nav-box'>
      <img src="" alt="logo" />
      {
        userVal ? (<p>Bienvenido, {userVal.userName}</p>) : (<p>Bienvenido</p>)
      }
      <SideMenu />
    </div>
  )
}