import { CircularProgress, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import PageHeader from 'src/views/apps/academicYear/PageHeader'
import TableHeader from 'src/views/apps/academicYear/TableHeader'

import { fetchClasses } from 'src/store/apps/academicData/actions'
import DataTable from 'src/views/apps/academicYear/Table'
import { useRouter } from 'next/router'
import ResponsiveCardGrid from 'src/views/apps/academicYear/responsiveCards'
import { useAuth } from 'src/hooks/useAuth'
import NoPermissionComponent from 'src/views/apps/permissions/noAccess'

function ClassesData() {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.academicData?.classesLoading)
  const data = useSelector(state => state.academicData['classes'])
  const user = useAuth()
  const { read } = user?.user?.permissions?.year?.classes || {}
  const { academic: view } = user?.user?.permissions?.nav || {}

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

  const { total_students = null } = data?.totals || {}

  const cardData = [{ header: 'مجموع الطلاب', number: total_students }]

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
    <Grid container>
      {read && view ? (
        <>
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
                  renderAgain={() => {
                    dispatch(fetchClasses({ page: 1, schoolId: pastRoute, gradeId: id }))
                  }}
                />
                <ResponsiveCardGrid cardData={cardData} />
              </Grid>
            </Grid>
          </Grid>
        </>
      ) : (
        <NoPermissionComponent featureName='Class' />
      )}
    </Grid>
  )
}

export default ClassesData
