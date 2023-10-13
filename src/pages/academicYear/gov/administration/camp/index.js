import { CircularProgress, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import PageHeader from 'src/views/apps/academicYear/PageHeader'
import TableHeader from 'src/views/apps/academicYear/TableHeader'

import { getCampsByAdministration } from 'src/store/apps/academicData/actions'
import DataTable from 'src/views/apps/academicYear/Table'
import { useRouter } from 'next/router'
import { useAuth } from 'src/hooks/useAuth'
import ResponsiveCardGrid from 'src/views/apps/academicYear/responsiveCards'
import NoPermissionComponent from 'src/views/apps/permissions/noAccess'

function CampsData() {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.academicData?.campsLoading)
  let camps = useSelector(state => state.academicData?.camps)
  const [showDrawer, setDrawer] = useState(false)
  const router = useRouter()
  const administrationId = router.query.id

  const user = useAuth()

  const { read } = user?.user?.permissions?.year?.camps || {}
  const { academic: view } = user?.user?.permissions?.nav || {}

  useEffect(() => {
    dispatch(getCampsByAdministration({ id: administrationId, type: 'camp' }))
  }, [dispatch, administrationId])

  const handlePageChange = nextPage => {
    dispatch(getCampsByAdministration({ id: administrationId, type: 'camp', page: nextPage }))
  }

  if (!Array.isArray(camps)) camps = []

  const sums = camps?.reduce(
    (acc, obj) => {
      acc.total_students += obj.total_students

      return acc
    },
    { total_students: 0 }
  )

  const { total_students = null } = sums || {}

  const cardData = [
    { header: 'مجموع المعسكرات', number: camps?.length },
    { header: 'مجموع الطلاب', number: total_students }
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
    <Grid container>
      {read && view ? (
        <>
          <Grid item xs={12} md={12}>
            <PageHeader src={'/images/govs.jpg'} />
          </Grid>
          <Grid item xs={12} md={12}>
            <Grid container>
              <Grid item xs={12}>
                <TableHeader
                  title={'المعسكرات'}
                  formType={'camps'}
                  showDrawer={showDrawer}
                  setDrawer={setDrawer}
                  addData={{ department_id: administrationId, type: 'camp' }}
                />
              </Grid>

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
            </Grid>
          </Grid>
        </>
      ) : (
        <NoPermissionComponent featureName='Camps' />
      )}
    </Grid>
  )
}

export default CampsData
