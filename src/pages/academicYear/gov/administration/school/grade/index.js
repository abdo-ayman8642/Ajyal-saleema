import { CircularProgress, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import PageHeader from 'src/views/apps/academicYear/PageHeader'
import TableHeader from 'src/views/apps/academicYear/TableHeader'

import { fetchGrades, fetchSchools } from 'src/store/apps/academicData/actions'
import DataTable from 'src/views/apps/academicYear/Table'
import { useRouter } from 'next/router'
import ResponsiveCardGrid from 'src/views/apps/academicYear/responsiveCards'

function GradesData() {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.academicData?.gradesLoading)
  const [depId, setDepId] = useState(null)
  const [showDrawer, setDrawer] = useState(false)
  const router = useRouter()
  const pastRoute = router.query.id
  const data = useSelector(state => state.academicData['grades'])

  const sums = data?.data?.reduce(
    (acc, obj) => {
      acc.total_classes += obj.total_classes || 0
      acc.total_students += obj.total_students || 0
      return acc
    },
    { total_classes: 0, total_schools: 0, total_students: 0 }
  )

  const { total_classes = null, total_departs = null, total_schools = null, total_students = null } = sums || {}

  const cardData = [
    { header: 'Total Classes', number: total_classes },
    { header: 'Total Students', number: total_students }
  ]

  useEffect(() => {
    dispatch(fetchGrades({ page: 1, id: pastRoute }))
  }, [dispatch])

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
      <Grid item xs={12} md={12}>
        <PageHeader src={'/images/grades.jpg'} />
      </Grid>
      <Grid item xs={12} md={12}>
        <Grid container>
          <Grid item xs={12}>
            <TableHeader title={'الصفوف'} formType={'grades'} showDrawer={showDrawer} setDrawer={setDrawer} />
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
    </Grid>
  )
}

export default GradesData
