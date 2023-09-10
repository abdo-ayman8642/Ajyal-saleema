// ** React Imports
import { useContext } from 'react'
import { useAuth } from 'src/hooks/useAuth'

// ** Component Imports

const CanViewNavLink = props => {
  const { children, navLink } = props
 
  const auth = useAuth()
 
  if (auth.user || (navLink && navLink.auth === false)) {
    return <>{children}</>
  } else {
   return null
  }
 }

export default CanViewNavLink
