// ** MUI Imports
import { Grid, Card, Typography, styled, TextField, CardContent } from '@mui/material'

const PageHeader = props => {
  // ** Props
  const { title, subtitle } = props

  const CustomizedCard = styled(Card)(({ theme, banner }) => ({
    border: 0,
    boxShadow: 'none',
    backgroundSize: 'cover',
    marginBottom: theme.spacing(6),
    backgroundImage: banner
      ? `url(${banner})`
      : theme.palette.mode === 'light'
      ? 'url(/images/pages/pages-header-bg-light.png)'
      : 'url(/images/pages/pages-header-bg-dark.png)'
  }))

  const CustomizedTextField = styled(TextField)(({ theme }) => ({
    width: '100%',
    '& .MuiOutlinedInput-root': {
      backgroundColor: theme.palette.background.paper
    },
    [theme.breakpoints.up('sm')]: {
      width: 450
    }
  }))
  return (
    <CustomizedCard>
      <CardContent sx={{ minHeight: '200px', p: theme => `${theme.spacing(6.75, 7)} !important` }}>
        <Grid container sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='h4' sx={{ mb: 2 }}>
            {title} {subtitle || null}
          </Typography>
          <Grid item>
            <CustomizedTextField />
          </Grid>
        </Grid>
      </CardContent>
    </CustomizedCard>
  )
}

export default PageHeader
