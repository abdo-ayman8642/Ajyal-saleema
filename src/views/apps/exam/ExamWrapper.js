import { Grid } from '@mui/material'
import React, { useState } from 'react'
import LeftSide from './left/LeftSide'
import RightSide from '../../sharedComponents/RightSide'

function ExamWrapper({ exam }) {
  //** stats & variables */

  return (
    <Grid container spacing={4} sx={{ mt: 4 }}>
      <Grid item xs={12} lg={4}>
        <LeftSide exam={exam} />
      </Grid>
      <Grid item xs={12} lg={8}>
        <RightSide exam={exam} />
      </Grid>
    </Grid>
  )
}

export default ExamWrapper
