import { CircularProgress } from '@mui/material'
import { Grid } from 'mdi-material-ui'
import React from 'react'

function Loading() {
  return (
    <Grid container sx={{justifyContent:'center', alignItems: 'center', height: '100%'}}>
        <Grid item>
          <CircularProgress />
        </Grid>
    </Grid>
  )
}

export default Loading