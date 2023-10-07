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
import { useAuth } from 'src/hooks/useAuth'
import ResponsiveCardGrid from 'src/views/apps/academicYear/responsiveCards'

function CampsData() {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.academicData?.campsLoading)
  const camps = useSelector(state => state.academicData?.camps)
  const [showDrawer, setDrawer] = useState(false)
  const router = useRouter()
  const administrationId = router.query.id

  const user = useAuth()

  const { year } = user?.user?.permissions
  const { add, edit, delete: deletee, read } = year

  useEffect(() => {
    dispatch(getCampsByAdministration({ id: administrationId, type: 'camp' }))
  }, [dispatch, administrationId])

  const handlePageChange = nextPage => {
    dispatch(getCampsByAdministration({ id: administrationId, type: 'camp', page: nextPage }))
  }

  const sums = camps.reduce(
    (acc, obj) => {
      acc.total_students += obj.total_students

      return acc
    },
    { total_students: 0 }
  )

  const { total_students = null } = sums || {}

  const cardData = [
    { header: 'Total Camps', number: camps.length },
    { header: 'Total Students', number: total_students }
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

  return (
    <Grid container spacing={10}>
      <Grid item xs={12} md={12}>
        <PageHeader src={'/images/govs.jpg'} />
      </Grid>
      <Grid item xs={12} md={12}>
        <Grid container>
          {add && (
            <Grid item xs={12}>
              <TableHeader
                title={'المعسكرات'}
                formType={'camps'}
                showDrawer={showDrawer}
                setDrawer={setDrawer}
                addData={{ department_id: administrationId, type: 'camp' }}
              />
            </Grid>
          )}
          {read ? (
            <Grid item xs={12}>
              <DataTable
                dataName={'المعسكر'}
                formType={'camps'}
                storeData={'camps'}
                pathname={`camp/student`}
                pastRoute={administrationId}
                editData={{ department_id: administrationId, type: 'camp' }}
                handlePageChange={handlePageChange}
                renderAgain={() => {
                  dispatch(getCampsByAdministration({ id: administrationId, type: 'camp' }))
                }}
              />
              <ResponsiveCardGrid cardData={cardData} />
            </Grid>
          ) : (
            <h1 style={{ display: 'block', margin: '5% auto' }}>Don't Have permission</h1>
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default CampsData
