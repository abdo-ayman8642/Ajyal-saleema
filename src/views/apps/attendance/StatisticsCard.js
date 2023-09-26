// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import ChevronUp from 'mdi-material-ui/ChevronUp'
import TrendingUp from 'mdi-material-ui/TrendingUp'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import Groups2Icon from '@mui/icons-material/Groups2'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople'
import PersonOffIcon from '@mui/icons-material/PersonOff'

//{ totalStudents, attend, absent }
const StatisticsCard = ({ StudentsData }) => {
  const [totalStudents, totalPresent, totalAbsent] = StudentsData?.chartState

  const salesData = [
    {
      stats: totalStudents || 0,
      color: 'primary',
      title: 'Total Students',
      icon: <Groups2Icon />
    },
    {
      icon: <EmojiPeopleIcon />,
      stats: totalPresent || 0,
      color: 'success',
      title: 'Attended Students'
    },
    {
      color: 'error',
      stats: totalAbsent || 0,
      icon: <PersonOffIcon />,
      title: 'Absent Students'
    }
  ]
  const renderStats = () => {
    return salesData.map((sale, index) => (
      <Grid item xs={12} sm={4} key={index}>
        <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
          <CustomAvatar skin='light' variant='rounded' color={sale.color} sx={{ mr: 4 }}>
            {sale.icon}
          </CustomAvatar>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='h6' sx={{ fontWeight: 600 }}>
              {sale.stats}
            </Typography>
            <Typography variant='caption'>{sale.title}</Typography>
          </Box>
        </Box>
      </Grid>
    ))
  }
  return (
    <Card>
      <CardHeader
        sx={{ pb: 7.25, textAlign: 'center' }}
        title='Attendance Overview'
        titleTypographyProps={{ variant: 'h6' }}
        action={
          <IconButton aria-label='settings' className='card-more-options'>
            <DotsVertical />
          </IconButton>
        }
      />
      <CardContent>
        <Grid container spacing={6}>
          {renderStats()}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default StatisticsCard
