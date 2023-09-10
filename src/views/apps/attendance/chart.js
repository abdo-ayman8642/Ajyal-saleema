import dynamic from 'next/dynamic'
import styles from './ApexChartComponent.module.css' // Import your CSS module
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

const ApexChart = () => {
  const [chartState, setChartState] = useState([0, 0])
  console.log(chartState)
  const state = {
    series: chartState,
    options: {
      title: {
        align: 'center'
      },
      legend: {
        horizontalAlign: 'center',
        markers: {
          width: 12,
          height: 12,
          strokeWidth: 0,
          strokeColor: '#fff',
          fillColors: undefined,
          radius: 12,
          customHTML: undefined,
          onClick: undefined,
          offsetX: 4,
          offsetY: 0
        }
      },
      chart: {
        width: 380,
        type: 'pie'
      },
      labels: ['Attendance', 'Absence'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ]
    }
  }
  const checkBoxesState = useSelector(state => state.attendance.sessionsList)
  const currInput = useSelector(state => state.attendance.currentInput)
  useEffect(() => {
    fecthAttendance()
  }, [checkBoxesState, currInput])

  const fecthAttendance = async () => {
    const path = `https://edu.kyanlabs.com/edu/api/students/sessions/attendance?${currInput?.[1]}=${
      currInput?.[0] || 1
    }`
    console.log(path)
    try {
      const response = await fetch(path, {
        headers: { 'content-type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({ sessions_ids: checkBoxesState })
      })
      const jsonData = await response.json()
      console.log(jsonData)
      const { totalPresent, totalAbsent } = jsonData
      setChartState([totalPresent || 0, totalAbsent || 0])
    } catch (error) {
      console.error('Error fetching data', error)
    }
  }
  return (
    <div id='chart' className={styles['chart-container']}>
      <ReactApexChart options={state.options} series={state.series} type='pie' width={500} />
    </div>
  )
}

export default ApexChart
