import { BarChart } from '@mui/x-charts'

const chartSetting = {
  xAxis: [
    {
      label: 'حضور الحصص'
    }
  ],
  width: 500,
  height: 400
}

const valueFormatter = value => `${value}`

const HorizontalBars = ({ dataset }) => {
  return (
    <BarChart
      dataset={
        dataset || [
          {
            session_name: '1: مجموعاتي الغذائية',
            number_of_attendant_Students: 20
          },
          {
            session_name: '2: الفوائد والمغذيات في المجموعات الغذائية',
            number_of_attendant_Students: 14
          },
          {
            session_name: '3: المجموعات الغذائية والحصص',
            number_of_attendant_Students: 11
          },
          {
            session_name: '4: الفاكهة والخضار ألوان قوس قزح',
            number_of_attendant_Students: 8
          },
          {
            session_name: '5: النشاط البدني',
            number_of_attendant_Students: 16
          },
          {
            session_name: '6: النشاط البدني الرجوع الى درس 5',
            number_of_attendant_Students: 18
          },
          {
            session_name: '7: أهمية وجبة الإفطار',
            number_of_attendant_Students: 24
          },
          {
            session_name: '8:الوجبات الخفيفة الصحية(سناك صحي)',
            number_of_attendant_Students: 71
          },
          {
            session_name: '9: أين تختبيء الدهون والسكريات',
            number_of_attendant_Students: 24
          },
          {
            session_name: '10: أسنان نظيفة، أسنان قوية',
            number_of_attendant_Students: 42
          },
          {
            session_name: '11: الماء أفضل شيء',
            number_of_attendant_Students: 2
          },
          {
            session_name: '12: القيمة الغذائية',
            number_of_attendant_Students: 13
          }
        ]
      }
      yAxis={[{ scaleType: 'band', dataKey: 'session_name' }]}
      series={[{ dataKey: 'number_of_attendant_Students', label: 'حضور الحصص', valueFormatter }]}
      layout='horizontal'
      leftAxis={null}
      {...chartSetting}
    />
  )
}
export default HorizontalBars
