import dynamic from 'next/dynamic'
import styles from './ApexChartComponent.module.css' // Import your CSS module
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import StatisticsCard from './StatisticsCard'

const ApexChart = () => {
  const [chartState, setChartState] = useState([0, 0])

  const state = {
    series: chartState.slice(2),
    options: {
      title: {
        align: 'center'
      },
      legend: {
        position: 'bottom',
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
      labels: ['حضور', 'غياب'],
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
  const sessions_ids_list = useSelector(state => state.attendance.sessionsList)
  const currInput = useSelector(state => state.attendance.currentInput)

  useEffect(() => {
    fecthAttendance()

    const timerId = setTimeout(() => {
      setChartState(prev => prev)
    }, 300)

    return () => {
      // Clear the timer to prevent validation after unmounting
      clearTimeout(timerId)
    }
  }, [sessions_ids_list, currInput])

  const fecthAttendance = async () => {
    const path = `https://edu.kyanlabs.com/edu/api/students/sessions/attendance?${currInput?.[1]}=${
      currInput?.[0] || 1
    }`
    try {
      const response = await fetch(path, {
        headers: { 'content-type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({ sessions_ids: sessions_ids_list })
      })
      const jsonData = await response.json()
      const { TotalStudents, totalPresent, totalAbsent, average } = jsonData
      setChartState([TotalStudents || 0, average || 0, totalPresent || 0, totalAbsent || 0])
    } catch (error) {
      console.error('Error fetching data', error)
    }
  }

  return (
    <>
      <StatisticsCard StudentsData={{ chartState }} />
      <div id='chart' className={styles['chart-container']}>
        <ReactApexcharts options={state.options} series={state.series} type='pie' width={500} />
      </div>
    </>
  )
}

export default ApexChart
