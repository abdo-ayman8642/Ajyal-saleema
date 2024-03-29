import { CircularProgress, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import PageHeader from 'src/views/apps/academicYear/PageHeader'
import TableHeader from 'src/views/apps/academicYear/TableHeader'

import { fetchSchools } from 'src/store/apps/academicData/actions'
import DataTable from 'src/views/apps/academicYear/Table'
import { useRouter } from 'next/router'
import { useAuth } from 'src/hooks/useAuth'
import ResponsiveCardGrid from 'src/views/apps/academicYear/responsiveCards'
import NoPermissionComponent from 'src/views/apps/permissions/noAccess'
import SchoolDataTable from 'src/views/apps/academicYear/schoolDataTable'

function SchoolsData() {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.academicData?.schoolsLoading)
  const [showDrawer, setDrawer] = useState(false)
  let data = useSelector(state => state.academicData['schools'])
  const router = useRouter()
  const { id } = router.query
  const user = useAuth()

  const { read } = user?.user?.permissions?.year?.schools || {}
  const { academic: view } = user?.user?.permissions?.nav || {}

  useEffect(() => {
    dispatch(fetchSchools({ page: 1, id: id, type: 'school' }))
  }, [dispatch, id])

  if (!Array.isArray(data)) data = []

  const sums = data?.reduce(
    (acc, obj) => {
      acc.total_classes += obj.total_classes
      acc.total_students += obj.total_students
      acc.firstExamAttend += obj.exams_attendance?.[0]?.attendance
      acc.secondExamAttend += obj.exams_attendance?.[1]?.attendance
      acc.total_teachers += obj.total_teachers

      return acc
    },
    { total_classes: 0, total_students: 0, firstExamAttend: 0, secondExamAttend: 0, total_teachers: 0 }
  )

  const {
    total_classes = null,
    total_students = null,
    firstExamAttend = null,
    secondExamAttend = null,
    total_teachers = null
  } = sums || {}

  const cardData = [
    { header: 'مجموع المدارس', number: data?.length },
    { header: 'مجموع الفصول', number: total_classes },
    { header: 'مجموع الطلاب', number: total_students },
    { header: 'الحاضرين فى الامتحان القبلى', number: firstExamAttend },
    { header: 'الحاضرين فى الامتحان البعدى', number: secondExamAttend },
    { header: 'عدد المدرسين', number: total_teachers }
  ]

  if (loading) {
    return (
      <Grid container sx={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Grid item>
          <CircularProgress />
        </Grid>
      </Grid>
    )
  }

  // const handlePageChange = nextPage => {
  //   dispatch(fetchSchools({ page: nextPage, id: id, type: 'school' }))
  // }

  return (
    <Grid container>
      {read && view ? (
        <>
          <Grid item xs={12} md={12}>
            <PageHeader src={'/images/academics.jpg'} />
          </Grid>
          <Grid item xs={12} md={12}>
            <Grid container>
              <Grid item xs={12}>
                <TableHeader
                  title={'المدارس المشاركة'}
                  formType={'schools'}
                  showDrawer={showDrawer}
                  setDrawer={setDrawer}
                  addData={{ department_id: id, type: 'school' }}
                  enableSearch={true}
                  filters={cardData}
                />
              </Grid>

              <Grid item xs={12}>
                <SchoolDataTable
                  editData={{ department_id: id, type: 'school' }}
                  dataName={'المدرسة '}
                  formType={'schools'}
                  storeData={'schools'}
                  pathname={'school/grade'}
                />
                <ResponsiveCardGrid cardData={cardData} />
              </Grid>
            </Grid>
          </Grid>{' '}
        </>
      ) : (
        <NoPermissionComponent featureName='School' />
      )}
    </Grid>
  )
}

export default SchoolsData
