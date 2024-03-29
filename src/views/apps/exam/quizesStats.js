// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import LinearProgress from '@mui/material/LinearProgress'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import QuizIcon from '@mui/icons-material/Quiz'

// ** Icons Imports

import FemaleIcon from '@mui/icons-material/Female'
import MaleIcon from '@mui/icons-material/Male'

const QuizStats = ({ data }) => {
  //** stats & vars */
  const { data: exams } = data

  const searchString = 'قبل'

  const index = exams?.findIndex(item => item?.name?.includes(searchString))

  const firstQuiz = exams[index]
  const secondQuiz = exams[(index + 1) % 2]
  const firstQuizAttendant = firstQuiz?.TotalNumberOfStudents || 0
  const secondQuizAttendant = secondQuiz?.TotalNumberOfStudents || 0
  const total = firstQuizAttendant + secondQuizAttendant
  return (
    <Card>
      <CardContent>
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant='h6' sx={{ mb: 1.5 }}>
              عدد حضور الامتحان القبلى و البعدى
            </Typography>
            <Typography variant='h6'>{total}</Typography>
          </Box>
        </Box>
        <Box sx={{ mb: 7, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ mb: 2.5, display: 'flex', alignItems: 'center', mb: 5 }}>
              <CustomAvatar
                skin='light'
                color='warning'
                variant='rounded'
                sx={{ mr: 1.5, height: 24, width: 24, borderRadius: '6px' }}
              >
                <QuizIcon sx={{ fontSize: '0.875rem' }} />
              </CustomAvatar>
              <Typography variant='body'>الامتحان القبلى</Typography>
            </Box>
            <Typography variant='h5'>{firstQuizAttendant} طالب</Typography>
            <Typography variant='caption'>{`${Math.round((firstQuizAttendant / total) * 100) || 0} %`}</Typography>
          </Box>
          <Divider flexItem sx={{ m: 0 }} orientation='vertical'>
            <CustomAvatar
              skin='light'
              color='secondary'
              sx={{ height: 24, width: 24, fontSize: '0.6875rem', color: 'text.secondary' }}
            >
              VS
            </CustomAvatar>
          </Divider>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', flexDirection: 'column' }}>
            <Box sx={{ mb: 2.5, display: 'flex', alignItems: 'center', mb: 5 }}>
              <Typography sx={{ mr: 1.5 }} variant='body2'>
                الامتحان البعدى
              </Typography>
              <CustomAvatar skin='light' variant='rounded' sx={{ height: 24, width: 24, borderRadius: '6px' }}>
                <QuizIcon sx={{ fontSize: '0.875rem' }} />
              </CustomAvatar>
            </Box>
            <Typography variant='h5'>طالب {secondQuizAttendant}</Typography>
            <Typography variant='caption'>{`${Math.round((secondQuizAttendant / total) * 100) || 0} %`}</Typography>
          </Box>
        </Box>
        <LinearProgress
          value={Math.round((firstQuizAttendant / total) * 100)}
          variant='determinate'
          sx={{
            height: 10,
            '&.MuiLinearProgress-colorPrimary': { backgroundColor: 'primary.main' },
            '& .MuiLinearProgress-bar': {
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              backgroundColor: 'warning.main'
            }
          }}
        />
      </CardContent>
    </Card>
  )
}

export default QuizStats
