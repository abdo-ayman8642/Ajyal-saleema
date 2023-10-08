// ** MUI Imports
import Grid from '@mui/material/Grid'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { dashboardData } from 'src/store/apps/user/actions'
import CardStatsCharacter from 'src/@core/components/card-statistics/card-stats-with-image'
import CardStatisticsBarChart from 'src/views/ui/cards/statistics/CardStatisticsBarChart'
import { CircularProgress } from '@mui/material'
import AnalyticsVisitsByDay from 'src/views/dashboards/analytics/AnalyticsVisitsByDay'
import CardStatsDonutChart from 'src/views/ui/cards/statistics/CardStatisticsDonutChart'

import GenderStats from 'src/views/apps/exam/GenderStats'
import CalendarWrapper from 'src/@core/styles/libs/fullcalendar'
import Calendar from 'src/views/apps/calendar/Calendar'
import DashboardCalendar from 'src/views/apps/dashboard/DashboardCalendar'
import CardStatisticsWeeklySalesBg from 'src/views/ui/cards/statistics/CardStatisticsWeeklySalesBg'
import CardStatsOrdersImpressions from 'src/views/ui/cards/statistics/CardStatsOrdersImpressions'
import CardProjectStatistics from 'src/views/ui/cards/advanced/CardProjectStatistics'
import CardStatisticsSales from 'src/views/ui/cards/statistics/CardStatisticsSales'
import PageHeader from 'src/views/apps/academicYear/PageHeader'
import { useAuth } from 'src/hooks/useAuth'
import NoPermissionComponent from 'src/views/apps/permissions/noAccess'

const _ = require('lodash')

const Home = () => {
  const dispatch = useDispatch()
  const dashboardStats = useSelector(state => state.user?.dashboard?.data)
  const loading = useSelector(state => state.user?.dashboardLoading)
  const user = useAuth()
  const permission = user?.user?.permissions?.nav?.home

  useEffect(() => {
    _.isEmpty(user?.user) && window.location.reload()
    dispatch(dashboardData())
  }, [dispatch])

  const teacherData = {
    title: 'المدرسين',
    chipColor: 'primary',
    chipText: 'هذا العام - 2023',
    src: '/images/cards/card-stats-img-1.png',
    stats: dashboardStats?.teachers_numbers,
    cardImg: '/images/avatars/1.png'
  }

  const userData = {
    title: 'الأعضاء',
    chipColor: 'primary',
    chipText: 'هذا العام - 2023',
    src: '/images/cards/card-stats-img-3.png',
    stats: dashboardStats?.users_numbers,
    cardImg: '/images/avatars/3.png'
  }

  const studentsData = {
    title: 'الطلاب',
    chipColor: 'primary',
    chipText: 'هذا العام - 2023',
    src: '/images/cards/card-stats-img-3.png',
    stats: dashboardStats?.students_numbers,
    cardImg: '/images/avatars/4.png'
  }

  const schoolData = {
    title: 'المدارس',
    chipColor: 'primary',
    chipText: 'هذا العام - 2023',
    src: '/images/pages/misc-under-maintenance.png',
    stats: dashboardStats?.shools_numbers,
    cardImg: '/images/school.jpg'
  }

  const examOne = {
    title: 'الإختبار الاول',
    fail: dashboardStats?.failure_exam_students_numbers || 200,
    success: dashboardStats?.success_exam_students_numbers || 1000,
    total: dashboardStats?.failure_exam_students_numbers + dashboardStats?.success_exam_students_numbers || 1200
  }

  const examTwo = {
    title: 'الإختبار الثاني',
    success: 200,
    fail: 20,
    total: 220
  }

  const genderData = {
    female: dashboardStats?.female_students_numbers,
    male: dashboardStats?.male_students_numbers
  }

  const sessionsData = {
    totalAttendance: dashboardStats?.Total_Attendance[0]?.Total_Present_Students,
    totalAbsence: dashboardStats?.Total_Attendance[0]?.Total_Missed_Students,
    totalSessions: dashboardStats?.sessions_numbers,
    totalParticipation:
      dashboardStats?.Total_Attendance[0]?.Total_Present_Students +
      dashboardStats?.Total_Attendance[0]?.Total_Missed_Students
  }

  const classData = {
    title: 'الفصول',
    chipColor: 'primary',
    chipText: 'هذا العام - 2023',
    src: '/images/pages/pricing-cta-illustration.png',
    stats: dashboardStats?.classes_numbers,
    cardImg: '/images/school.jpg'
  }

  const gradeData = {
    title: 'الصفوف',
    chipColor: 'primary',
    chipText: 'هذا العام - 2023',
    src: '/images/pages/kb-personalization.png',
    stats: dashboardStats?.grades.length,
    cardImg: '/images/school.jpg'
  }

  if (loading) {
    return (
      <Grid container sx={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Grid item>
          <CircularProgress />
        </Grid>
      </Grid>
    )
  }

  return (
    <Grid container spacing={6}>
      {permission ? (
        <>
          <Grid item xs={12} lg={3}>
            <CardStatsCharacter data={schoolData} />
          </Grid>

          <Grid item xs={12} lg={3}>
            <CardStatsCharacter data={classData} />
          </Grid>
          <Grid item xs={12} lg={3} sx={{ breakInside: 'avoid' }}>
            <CardStatsCharacter data={teacherData} />
          </Grid>
          {/* <Grid item xs={12} lg={3}>
        <CardStatsCharacter data={userData} />
      </Grid> */}
          <Grid item xs={12} lg={3}>
            <CardStatsCharacter data={studentsData} />
          </Grid>
          {/* {dashboardStats?.exams_results?.map(exam => (
        <Grid item xs={12} lg={2} key={exam.id}>
          <CardStatsDonutChart
            title={exam.name}
            fail={exam.failure_exam_students_numbers}
            success={exam.success_exam_students_numbers}
            total={exam.failure_exam_students_numbers + exam.success_exam_students_numbers}
          />
        </Grid>
      ))} */}

          <Grid item xs={12} lg={5}>
            <CardStatsOrdersImpressions data={sessionsData} />
          </Grid>
          <Grid item xs={12} lg={6}>
            <GenderStats data={genderData} />
          </Grid>

          <Grid item xs={12} lg={12}>
            <DashboardCalendar data={dashboardStats?.event} />
          </Grid>
        </>
      ) : (
        <NoPermissionComponent featureName='Dashboard' />
      )}
    </Grid>
  )
}

export default Home
