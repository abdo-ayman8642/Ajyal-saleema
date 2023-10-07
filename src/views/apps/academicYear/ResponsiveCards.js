import React from 'react'
import { Grid, Card, CardContent, Typography } from '@mui/material'

function ResponsiveCardGrid({ cardData }) {
  return (
    <Grid container spacing={2}>
      {cardData.map((data, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card>
            <CardContent>
              <Typography variant='h5' component='div' sx={{ textAlign: 'center' }}>
                {data.header}
              </Typography>
              <Typography variant='body2' color='textSecondary' sx={{ textAlign: 'center', fontSize: '2rem' }}>
                {data.number}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default ResponsiveCardGrid
