import { CircularProgress, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import PageHeader from 'src/views/apps/academicYear/PageHeader'
import TableHeader from 'src/views/apps/academicYear/TableHeader'

import { fetchYears } from 'src/store/apps/academicData/actions'
import DataTable from 'src/views/apps/academicYear/Table'

function AcademicYear() {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.academicData?.yearsLoading)
  const [showYearDrawer, setYearDrawer] = useState(false)

  const handlePageChange = nextPage => {
    dispatch(fetchYears(nextPage))
  }

  useEffect(() => {
    dispatch(fetchYears(1))
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

  return (
    <Grid container spacing={10}>
      <Grid item xs={12} md={12}>
        <PageHeader src={'/images/academics2.jpg'} />
      </Grid>
      <Grid item xs={12} md={12}>
        <Grid container>
          <Grid item xs={12}>
            <TableHeader
              title={'السنة التنفيذية'}
              formType={'years'}
              showDrawer={showYearDrawer}
              setDrawer={setYearDrawer}
            />
          </Grid>
          <Grid item xs={12}>
            <DataTable
              dataName={'العام الدراسي'}
              formType={'years'}
              storeData={'years'}
              pathname={`academicYear/gov`}
              handlePageChange={handlePageChange}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default AcademicYear
