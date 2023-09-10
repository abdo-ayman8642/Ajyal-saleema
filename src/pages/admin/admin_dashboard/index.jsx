// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icon Imports
import CartPlus from 'mdi-material-ui/CartPlus'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'

// ** Custom Component Import
import CardStatisticsVertical from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

import CrmAward from 'src/views/dashboards/crm/CrmAward'



function Admin_Dashboard() {
  const arr = [1, 2, 3]
  
  return (

    <ApexChartWrapper>
      <Grid container spacing={6} className='match-height'>
        {arr.map((item,idx) => (
          <Grid key={idx} item xs={12} md={4}>
            <CrmAward />
          </Grid>
        ))}

      </Grid>
    </ApexChartWrapper>
  )
}

export default Admin_Dashboard