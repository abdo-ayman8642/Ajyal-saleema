// ** React Imports
import { useContext } from 'react'

// ** Component Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

const CanViewNavGroup = props => {
  const { children, navGroup } = props

  const auth = useAuth()

  if (auth.user || (navGroup && navGroup.auth === false)) {
    return <>{children}</>
  } else {
    return null
  }
}

export default CanViewNavGroup
