import { CircularProgress, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import PageHeader from 'src/views/apps/academicYear/PageHeader'
import TableHeader from 'src/views/apps/academicYear/TableHeader'

import { fetchCampStudents, fetchGovs, filterBy, getCampsByAdministration } from 'src/store/apps/academicData/actions'
import DataTable from 'src/views/apps/academicYear/Table'
import { useRouter } from 'next/router'
import { handlePastRoute } from 'src/store/apps/academicData'
import { fetchData } from 'src/store/apps/student/actions'
import { useAuth } from 'src/hooks/useAuth'
import student from 'src/store/apps/student'
import ResponsiveCardGrid from 'src/views/apps/academicYear/responsiveCards'
import NoPermissionComponent from 'src/views/apps/permissions/noAccess'

function CampsData() {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.academicData?.studentsLoading)
  const [showDrawer, setDrawer] = useState(false)
  const data = useSelector(state => state.academicData['students'])
  const router = useRouter()
  const campId = router.query.id
  const user = useAuth()

  const { year } = user?.user?.permissions
  const { add, edit, delete: deletee, read } = year

  const cardData = [{ header: 'Total Students', number: data?.data?.total }]

  useEffect(() => {
    dispatch(filterBy({ page: 1, query: 'school_camp', value: campId }))
  }, [dispatch, campId])

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
      {read ? (
        <>
          <Grid item xs={12} md={12}>
            <PageHeader src={'/images/govs.jpg'} />
          </Grid>
          <Grid item xs={12} md={12}>
            <Grid container>
              <Grid item xs={12}>
                <TableHeader
                  title={'الطلاب'}
                  formType={'students'}
                  showDrawer={showDrawer}
                  setDrawer={setDrawer}
                  addData={{ urlId: campId, query: 'school_camp', school_id: campId }}
                />
              </Grid>
              <Grid item xs={12}>
                <DataTable
                  dataName={'الطالب'}
                  formType={'students'}
                  storeData={'students'}
                  pathname={`student/view`}
                  pastRoute={campId}
                  editData={{ urlId: campId, query: 'school_camp' }}
                />

                <ResponsiveCardGrid cardData={cardData} />
              </Grid>
            </Grid>
          </Grid>
        </>
      ) : (
        <NoPermissionComponent featureName='Students' />
      )}
    </Grid>
  )
}

export default CampsData
