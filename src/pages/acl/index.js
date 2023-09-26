// ** React Imports
import { useContext } from 'react'

// ** Context Imports

// ** MUI Imports
import Grid from '@mui/material/Grid'
import { useAuth } from 'src/hooks/useAuth'

const ACLPage = () => {
  // ** Hooks
  const user = useAuth()

  return (
    <Grid container spacing={6}>
      Acl
    </Grid>
  )
}

export default ACLPage
