import dynamic from 'next/dynamic'

// Create a dynamic import for the BarChart component
const BarChart = dynamic(() => import('@mui/x-charts').then(module => module.BarChart), {
  ssr: false // This disables server-side rendering for this component
})

const chartSetting = {
  height: 400
}

const valueFormatter = value => `${value} حضور الطلاب`

const HorizontalBars = ({ dataset }) => {
  return (
    <BarChart
      dataset={
        dataset || [
          {
            session_name: '1',
            number_of_attendant_Students: 0
          },
          {
            session_name: '2',
            number_of_attendant_Students: 0
          },
          {
            session_name: '3',
            number_of_attendant_Students: 0
          },
          {
            session_name: '4',
            number_of_attendant_Students: 0
          },
          {
            session_name: '5',
            number_of_attendant_Students: 0
          },
          {
            session_name: '6',
            number_of_attendant_Students: 0
          },
          {
            session_name: '7',
            number_of_attendant_Students: 0
          },
          {
            session_name: '8',
            number_of_attendant_Students: 0
          },
          {
            session_name: '9',
            number_of_attendant_Students: 0
          },
          {
            session_name: '10',
            number_of_attendant_Students: 0
          },
          {
            session_name: '11',
            number_of_attendant_Students: 0
          },
          {
            session_name: '12',
            number_of_attendant_Students: 0
          }
        ]
      }
      yAxis={[{ scaleType: 'band', dataKey: 'session_name' }]}
      series={[{ dataKey: 'number_of_attendant_Students', valueFormatter }]}
      layout='horizontal'
      leftAxis={null}
      {...chartSetting}
    />
  )
}
export default HorizontalBars
