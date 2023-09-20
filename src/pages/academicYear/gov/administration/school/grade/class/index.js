import { CircularProgress, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import PageHeader from 'src/views/apps/academicYear/PageHeader'
import TableHeader from 'src/views/apps/academicYear/TableHeader'

import { fetchClasses } from 'src/store/apps/academicData/actions'
import DataTable from 'src/views/apps/academicYear/Table'
import { useRouter } from 'next/router'

function ClassesData() {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.academicData?.classesLoading)
  const [showDrawer, setDrawer] = useState(false)
  const router = useRouter()
  const { pastRoute, id } = router.query

  const requestData = {
    school_id: pastRoute,
    level_id: id
  }

  useEffect(() => {
    dispatch(fetchClasses({ page: 1, schoolId: pastRoute, gradeId: id }))
  }, [dispatch, id, pastRoute])

  const handlePageChange = nextPage => {
    dispatch(fetchClasses({ page: nextPage, schoolId: pastRoute, gradeId: id }))
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
    <Grid container spacing={10}>
      <Grid item xs={12} md={12}>
        <PageHeader src={'/images/class.jpg'} />
      </Grid>
      <Grid item xs={12} md={12}>
        <Grid container>
          <Grid item xs={12}>
            <TableHeader
              title={'الفصول'}
              formType={'classes'}
              showDrawer={showDrawer}
              setDrawer={setDrawer}
              addData={requestData}
            />
          </Grid>
          <Grid item xs={12}>
            <DataTable
              dataName={'الفصل'}
              formType={'classes'}
              storeData={'classes'}
              editData={requestData}
              pathname={'class/student'}
              handlePageChange={handlePageChange}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ClassesData
