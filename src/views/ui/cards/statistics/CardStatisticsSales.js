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

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import ShowChartIcon from '@mui/icons-material/ShowChart'
import BarChartIcon from '@mui/icons-material/BarChart'
import SchoolIcon from '@mui/icons-material/School'

const renderStats = statsObj => {
  return statsObj.map((state, index) => (
    <Grid item xs={12} sm={4} key={index}>
      <Box key={index} sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <CustomAvatar skin='light' variant='rounded' color={state.color} sx={{ mr: 4 }}>
            {state.icon}
          </CustomAvatar>
          <Typography variant='h6' sx={{ fontWeight: 600 }}>
            {state.stats}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='caption'>{state.title}</Typography>
        </Box>
      </Box>
    </Grid>
  ))
}

const CardStatisticsstates = ({ data, gradesStudents }) => {
  const totalStudents = gradesStudents?.reduce((total, grade) => total + grade.students_numberes, 0)
  const totalClasses = data?.reduce((total, grade) => total + grade.Total, 0)

  const statistics = [
    {
      title: 'إجمالي المراحل التعليمية',
      stats: data?.length,
      icon: <ShowChartIcon color='error' />
    },
    {
      title: 'إجمالي الطلبة',
      stats: totalStudents,
      icon: <SchoolIcon />
    },
    {
      title: 'إجمالي الفصول',
      stats: totalClasses,
      icon: <BarChartIcon color='warning' />
    },
    {
      title: 'إجمالي المراحل التعليمية',
      stats: data?.length,
      icon: <ShowChartIcon color='error' />
    },
    {
      title: 'إجمالي الطلبة',
      stats: totalStudents,
      icon: <SchoolIcon />
    },
    {
      title: 'إجمالي الفصول',
      stats: totalClasses,
      icon: <BarChartIcon color='warning' />
    }
  ]

  return (
    <Card sx={{ height: 250 }}>
      <CardHeader title='ملخص' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <Grid container spacing={6}>
          {renderStats(statistics)}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default CardStatisticsstates
