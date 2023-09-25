import { CircularProgress, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import PageHeader from 'src/views/apps/academicYear/PageHeader'
import TableHeader from 'src/views/apps/academicYear/TableHeader'

import { fetchGovs, getCampsByAdministration } from 'src/store/apps/academicData/actions'
import DataTable from 'src/views/apps/academicYear/Table'
import { useRouter } from 'next/router'
import { handlePastRoute } from 'src/store/apps/academicData'

function CampsData() {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.academicData?.campsLoading)
  const camps = useSelector(state => state.academicData?.camps)
  const [showDrawer, setDrawer] = useState(false)
  const router = useRouter()
  const administrationId = router.query.id

  useEffect(() => {
    dispatch(getCampsByAdministration({ id: administrationId, type: 'camp' }))
  }, [dispatch, administrationId])

  const handlePageChange = nextPage => {
    dispatch(getCampsByAdministration({ id: administrationId, type: 'camp', page: nextPage }))
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
        <PageHeader src={'/images/govs.jpg'} />
      </Grid>
      <Grid item xs={12} md={12}>
        <Grid container>
          <Grid item xs={12}>
            <TableHeader
              title={'الكامبات'}
              formType={'camps'}
              showDrawer={showDrawer}
              setDrawer={setDrawer}
              addData={{ department_id: administrationId, type: 'camp' }}
            />
          </Grid>
          <Grid item xs={12}>
            <DataTable
              dataName={'الكامب'}
              formType={'camps'}
              storeData={'camps'}
              pathname={`camp/student`}
              pastRoute={administrationId}
              editData={{ department_id: administrationId, type: 'camp' }}
              handlePageChange={handlePageChange}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default CampsData
