import { Button, Card, CardContent, Grid, styled, Typography } from '@mui/material'

// Define the Card component
const HeaderCard = styled(Card)(({ theme }) => ({
  height: 300, // Set the height of the header
  backgroundImage: `url(/images/ssss.jpg)`, // Set the banner image
  backgroundSize: 'cover', // Scale the image to cover the header
  backgroundPosition: 'center' // Center the image within the header
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

// Define the page header component
const PageHeader = ({ toggleAdd, numberOfExams }) => {
  const handleOnClick = () => {
    toggleAdd()
  }
  return (
    <HeaderCard banner='/path/to/banner.jpg' sx={{ mb: 10, width: '100%', px: { xs: 3, sm: 5 } }}>
      <HeaderContent>
        <StyledTypography variant='h2' color='textPrimary' sx={{ py: 5 }}>
          الإمتحانات
        </StyledTypography>
        {numberOfExams < 2 && (
          <>
            <SubtitleTypography variant='subtitle2' color='textSecondary'>
              يمكنك إضافة امتحان جديد
            </SubtitleTypography>
            <HeaderButton variant='contained' sx={{ fontSize: '1rem', fontWeight: 'bold' }} onClick={handleOnClick}>
              إضافة إمتحان
            </HeaderButton>
          </>
        )}
      </HeaderContent>
    </HeaderCard>
  )
}
export default PageHeader
