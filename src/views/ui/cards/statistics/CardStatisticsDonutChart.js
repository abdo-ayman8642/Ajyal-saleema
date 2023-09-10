// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { Chip } from '@mui/material'

const CardStatsDonutChart = ({ fail, success, title, total }) => {
  // ** Hook
  const theme = useTheme()

  const options = {
    legend: { show: false },
    stroke: { width: 5, colors: [theme.palette.background.paper] },
    colors: [theme.palette.primary.main, theme.palette.success.main, theme.palette.secondary.main],
    labels: [`${new Date().getFullYear()}`, `${new Date().getFullYear() - 1}`, `${new Date().getFullYear() - 2}`],
    tooltip: {
      y: {
        formatter: val => {
          const percentage = (val / total) * 100

          return `${percentage.toFixed(2)}%`
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            name: { show: false },
            total: {
              label: '',
              show: true,
              formatter(val) {
                return ''
              }
            },
            value: {
              offsetY: 6,
              formatter(val) {
                return `${val}`
              }
            }
          }
        }
      }
    }
  }

  // if (success === 0 && fail === 0) {
  //   return (
  //     <Card>
  //       <CardContent>
  //         <Typography>{'No data to display'}</Typography>
  //       </CardContent>
  //     </Card>
  //   )
  // }

  return (
    <Card>
      <CardContent
        sx={{
          '& .apexcharts-canvas .apexcharts-datalabel-value': {
            fontWeight: 600,
            fontSize: '1rem !important',
            fill: theme.palette.text.secondary
          }
        }}
      >
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography sx={{ mb: 1.5, fontWeight: 600, whiteSpace: 'nowrap' }}>{title}</Typography>
          {/* <Typography variant='h6' sx={{ mr: 1.5 }}>
            {fail + success}
          </Typography> */}
          {/* <Typography variant='subtitle2' sx={{ color: 'success.main' }}>
            +16%
          </Typography> */}
        </Box>
        <Typography variant='body2' sx={{ color: 'success.main' }}>
          نسبة النجاح
        </Typography>
        {success === 0 && fail === 0 ? (
          <Chip
            label='الإمتحان لم يبدأ بعد'
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              my: 9
            }}
          />
        ) : (
          <ReactApexcharts type='donut' height={135} options={options} series={[fail, success]} />
        )}
        <Typography variant='body2'>{`اجمالي الطلبة المشاركة ${fail + success} طالب`}</Typography>
      </CardContent>
    </Card>
  )
}

export default CardStatsDonutChart
