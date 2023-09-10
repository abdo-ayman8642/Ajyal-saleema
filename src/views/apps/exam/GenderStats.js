// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import LinearProgress from '@mui/material/LinearProgress'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Icons Imports

import FemaleIcon from '@mui/icons-material/Female'
import MaleIcon from '@mui/icons-material/Male'

const GenderStats = ({ data }) => {
  //** stats & vars */
  const total = data.male + data.female
  const malePercentage = (data.male / total) * 100
  const femalePercentage = (data.female / total) * 100

  return (
    <Card>
      <CardContent>
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant='h6' sx={{ mb: 1.5 }}>
              نسبة الذكور و الإناث
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
                <MaleIcon sx={{ fontSize: '0.875rem' }} />
              </CustomAvatar>
              <Typography variant='body'>الذكور</Typography>
            </Box>
            <Typography variant='h6'>{`${Math.floor(malePercentage)}%`}</Typography>
            <Typography variant='caption' sx={{ color: 'text.disabled' }}>
              {data.male}
            </Typography>
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
                الإناث
              </Typography>
              <CustomAvatar skin='light' variant='rounded' sx={{ height: 24, width: 24, borderRadius: '6px' }}>
                <FemaleIcon sx={{ fontSize: '0.875rem' }} />
              </CustomAvatar>
            </Box>
            <Typography variant='h6'>{`${Math.floor(femalePercentage)}%`}</Typography>
            <Typography variant='caption' sx={{ color: 'text.disabled' }}>
              {data.female}
            </Typography>
          </Box>
        </Box>
        <LinearProgress
          value={malePercentage}
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

export default GenderStats
