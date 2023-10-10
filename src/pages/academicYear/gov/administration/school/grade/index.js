import { CircularProgress, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import PageHeader from 'src/views/apps/academicYear/PageHeader'
import TableHeader from 'src/views/apps/academicYear/TableHeader'

import { fetchGrades } from 'src/store/apps/academicData/actions'
import DataTable from 'src/views/apps/academicYear/Table'
import { useRouter } from 'next/router'
import ResponsiveCardGrid from 'src/views/apps/academicYear/responsiveCards'
import { useAuth } from 'src/hooks/useAuth'
import NoPermissionComponent from 'src/views/apps/permissions/noAccess'

function GradesData() {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.academicData?.gradesLoading)
  const [showDrawer, setDrawer] = useState(false)
  const router = useRouter()
  const pastRoute = router.query.id
  const data = useSelector(state => state.academicData['grades'])
  const user = useAuth()

  const { read } = user?.user?.permissions?.year?.grades
  const { academic: view } = user?.user?.permissions?.nav

  const { total_classes = null, total_students = null } = data?.data?.[0] || {}

  const cardData = [
    { header: 'Total Classes', number: total_classes },
    { header: 'Total Students', number: total_students }
  ]

  useEffect(() => {
    dispatch(fetchGrades({ page: 1, id: pastRoute }))
  }, [dispatch, pastRoute])

  if (loading) {
    return (
      <Grid container sx={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Grid item>
          <CircularProgress />
        </Grid>
      </Grid>
    )
  }

  const handlePageChange = nextPage => {
    dispatch(fetchGrades(nextPage))
  }

  return (
    <Grid container spacing={10}>
      {read && view ? (
        <>
          <Grid item xs={12} md={12}>
            <PageHeader src={'/images/grades.jpg'} />
          </Grid>
          <Grid item xs={12} md={12}>
            <Grid container>
              <Grid item xs={12}>
                <TableHeader
                  title={'الصفوف'}
                  formType={'grades'}
                  showDrawer={showDrawer}
                  setDrawer={setDrawer}
                  addData={{ school_id: pastRoute }}
                />
              </Grid>

              <Grid item xs={12}>
                <DataTable
                  dataName={'الصف '}
                  formType={'grades'}
                  storeData={'grades'}
                  pathname={'grade/class'}
                  pastRoute={pastRoute}
                  handlePageChange={handlePageChange}
                />
                <ResponsiveCardGrid cardData={cardData} />
              </Grid>
            </Grid>
          </Grid>
        </>
      ) : (
        <NoPermissionComponent featureName='Grade' />
      )}
    </Grid>
  )
}

export default GradesData
