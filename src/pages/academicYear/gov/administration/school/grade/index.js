import { CircularProgress, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import PageHeader from 'src/views/apps/academicYear/PageHeader'
import TableHeader from 'src/views/apps/academicYear/TableHeader'

import { fetchGrades } from 'src/store/apps/academicData/actions'
import DataTable from 'src/views/apps/academicYear/Table'
import { useRouter } from 'next/router'

function GradesData() {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.academicData?.gradesLoading)
  const [showDrawer, setDrawer] = useState(false)
  const router = useRouter()
  const pastRoute = router.query.id

  useEffect(() => {
    dispatch(fetchGrades(1))
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
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default GradesData
