import * as React from 'react'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Selectors from 'src/views/apps/attendance/selectors'
import Checkboxes from 'src/views/apps/attendance/checkboxes'
import ApexChart from 'src/views/apps/attendance/chart'
import PageHeader from 'src/@core/components/page-header'
import Link from '@mui/material/Link'
import { Button, Card, CardContent, Grid, styled, Typography } from '@mui/material'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}))

// Define the Card component
const HeaderCard = styled(Card)(({ theme }) => ({
  height: 300, // Set the height of the header
  backgroundImage: `url(/images/laptop-alarm-clock-glasses-yellow-background.jpg)`, // Set the banner image
  backgroundSize: 'cover', // Scale the image to cover the header
  backgroundPosition: '0% 18%' // Center the image within the header
}))

// Define the content of the header
const HeaderContent = styled(CardContent)(({ theme }) => ({
  backgroundColor: 'transparent', // Set a transparent background color
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  zIndex: 1 // Set a higher z-index to place the content on top of the banner image
}))

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: theme.typography.pxToRem(48),
  lineHeight: 1,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  color: '#fff',
  textShadow: `0 2px 4px rgba(0,0,0,0.5)` // Add a text shadow to make the text more legible
}))

const SubtitleTypography = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(18),
  color: '#fff',
  marginBottom: theme.spacing(4),
  textShadow: `0 2px 4px rgba(0,0,0,0.5)` // Add a text shadow to make the text more legible
}))

const HeaderButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  borderRadius: theme.shape.borderRadius,
  boxShadow: `0 2px 4px rgba(0,0,0,0.5)`, // Add a box shadow to make the button more prominent
  '&:hover': {
    backgroundColor: theme.palette.primary.light
  }
}))

function Attendance() {
  return (
    <>
      <HeaderCard banner='/path/to/banner.jpg' sx={{ mb: 10, width: '100%', px: { xs: 3, sm: 5 } }}>
        <HeaderContent>
          <StyledTypography variant='h2' color='textPrimary' sx={{ py: 5 }}>
            الحضور
          </StyledTypography>
        </HeaderContent>
      </HeaderCard>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 3, sm: 5, md: 8 }}>
        <Grid item xs={3}>
          <Selectors />
        </Grid>
        <Grid item xs={9}>
          <Item sx={{ marginBottom: '20px' }}>
            <Checkboxes />
          </Item>
          <ApexChart />
        </Grid>
      </Grid>
    </>
  )
}

export default Attendance
