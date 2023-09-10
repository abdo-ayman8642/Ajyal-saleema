// ** React Imports
import { useContext } from 'react'
import { useAuth } from 'src/hooks/useAuth'

// ** Component Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

const CanViewNavSectionTitle = props => {
  // ** Props
  const { children, navTitle } = props

  // ** Hook
  const auth = useAuth()

  if (auth.user || (navTitle && navTitle.auth === false)) {
    return <>{children}</>
  } else {
    return null
  }
}

export default CanViewNavSectionTitle
