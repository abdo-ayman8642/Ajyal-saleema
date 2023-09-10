import { Button, Card, CardContent, Grid, styled, Typography } from '@mui/material'

// Define the Card component
const HeaderCard = styled(Card)(({ theme }) => ({
  height: 400, // Set the height of the header
  backgroundSize: 'cover', // Scale the image to cover the header
  backgroundPosition: 'top' // Center the image within the header
}))

// Define the content of the header

// Define the page header component
const PageHeader = ({ src }) => {
  return (
    <HeaderCard
      src={src}
      banner='/path/to/banner.jpg'
      sx={{ mb: 10, width: '100%', px: { xs: 3, sm: 5 }, backgroundImage: `url(${src})` }}
    ></HeaderCard>
  )
}
export default PageHeader
