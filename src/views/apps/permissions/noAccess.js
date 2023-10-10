import React from 'react'
import { Typography, Button, Box, Grid } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock'

const NoPermissionComponent = ({ featureName, onRetry }) => {
  return (
    <Grid container justifyContent='center' alignItems='center' sx={{ mt: '8rem' }}>
      <Grid item>
        <Box textAlign='center'>
          <LockIcon style={{ fontSize: 100, color: 'gray' }} />
          <Typography variant='h4' color='textSecondary' gutterBottom>
            Access Denied
          </Typography>
          <Typography variant='body1' color='textSecondary' paragraph>
            You do not have permission to access the {featureName} Section
          </Typography>
        </Box>
      </Grid>
    </Grid>
  )
}

export default NoPermissionComponent
