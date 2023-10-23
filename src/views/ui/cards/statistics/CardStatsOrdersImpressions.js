// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CircularProgress from '@mui/material/CircularProgress'

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import CellphoneLink from 'mdi-material-ui/CellphoneLink'
import ShoppingOutline from 'mdi-material-ui/ShoppingOutline'
import CustomChip from 'src/@core/components/mui/chip'
import LaptopMacIcon from '@mui/icons-material/LaptopMac'
import CustomAvatar from 'src/@core/components/mui/avatar'
import DomainVerificationIcon from '@mui/icons-material/DomainVerification'

const CardStatsOrdersImpressions = ({ data }) => {
  console.log(data)
  return (
    <Card>
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Box>
            <Typography sx={{ mb: 'auto', fontWeight: 600, whiteSpace: 'nowrap' }}>الحصص</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mt: 8
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
                alignItems: 'flex-start',
                mr: 7
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CustomAvatar
                  skin='light'
                  color='secondary'
                  variant='rounded'
                  sx={{
                    mr: 1.5,
                    width: 36,
                    height: 24,
                    fontSize: '0.75rem',
                    borderRadius: '6px',
                    color: 'text.primary',
                    p: 4
                  }}
                >
                  <LaptopMacIcon />
                </CustomAvatar>
                <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>{data.totalSessions}</Typography>
              </Box>
              <Typography variant='body2' sx={{ color: 'success.main' }}>
                إجمالي الحصص
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
                alignItems: 'flex-start',
                my: 1
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CustomAvatar
                  skin='light'
                  color='secondary'
                  variant='rounded'
                  sx={{
                    mr: 1.5,
                    width: 36,
                    height: 24,
                    fontSize: '0.75rem',
                    borderRadius: '6px',
                    color: 'text.primary',
                    p: 4
                  }}
                >
                  <DomainVerificationIcon />
                </CustomAvatar>
                <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>{data.totalParticipation}</Typography>
              </Box>
              <Typography variant='body2' sx={{ color: 'success.main' }}>
                إجمالي الطلبة المشاركة
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
                alignItems: 'flex-start',
                m: '1rem'
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CustomAvatar
                  skin='light'
                  color='secondary'
                  variant='rounded'
                  sx={{
                    mr: 1.5,
                    width: 36,
                    height: 24,
                    fontSize: '0.75rem',
                    borderRadius: '6px',
                    color: 'text.primary',
                    p: 4
                  }}
                >
                  <DomainVerificationIcon />
                </CustomAvatar>
                <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>{data?.average}%</Typography>
              </Box>
              <Typography variant='body2' sx={{ color: 'success.main' }}>
                متوسط نسبة حضور الطلاب
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box>
          <Box sx={{ my: 1.375, display: 'flex', alignItems: 'center' }}>
            <Box sx={{ mr: 6.5, display: 'flex', position: 'relative' }}>
              <CircularProgress
                size={60}
                value={100}
                thickness={5}
                variant='determinate'
                sx={{
                  position: 'absolute',
                  '& .MuiCircularProgress-circle': { strokeWidth: 4 },
                  color: theme =>
                    theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.customColors.bodyBg
                }}
              />
              <CircularProgress
                size={60}
                value={(data.totalAttendance / data.totalParticipation) * 100}
                thickness={5}
                color='primary'
                variant='determinate'
                sx={{ '& .MuiCircularProgress-circle': { strokeWidth: 4, strokeLinecap: 'round' } }}
              />
              <Box sx={{ mt: -3, ml: -2.5, top: '50%', left: '50%', display: 'flex', position: 'absolute' }}>
                <CellphoneLink fontSize='small' sx={{ color: 'primary.main' }} />
              </Box>
            </Box>
            <div>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                <Typography variant='h6' sx={{ mr: 1.75 }}>
                  {data.totalAttendance}
                </Typography>
              </Box>
              <Typography variant='body2'>إجمالي الحضور</Typography>
            </div>
          </Box>
          <Divider sx={{ my: 5 }} />
          <Box sx={{ my: 1.375, display: 'flex', alignItems: 'center' }}>
            <Box sx={{ mr: 6.5, position: 'relative' }}>
              <CircularProgress
                size={60}
                value={100}
                thickness={5}
                variant='determinate'
                sx={{
                  position: 'absolute',
                  '& .MuiCircularProgress-circle': { strokeWidth: 4 },
                  color: theme =>
                    theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.customColors.bodyBg
                }}
              />
              <CircularProgress
                size={60}
                thickness={5}
                value={(data.totalAbsence / data.totalParticipation) * 100}
                color='warning'
                variant='determinate'
                sx={{ '& .MuiCircularProgress-circle': { strokeWidth: 4, strokeLinecap: 'round' } }}
              />
              <Box sx={{ mt: -3, ml: -2.5, position: 'absolute', top: '50%', left: '50%' }}>
                <ShoppingOutline fontSize='small' sx={{ color: 'warning.main' }} />
              </Box>
            </Box>
            <div>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                <Typography variant='h6' sx={{ mr: 1.75 }}>
                  {data.totalAbsence}
                </Typography>
              </Box>
              <Typography variant='body2'>إجمالي الغياب</Typography>
            </div>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default CardStatsOrdersImpressions
