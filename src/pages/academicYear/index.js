import { CircularProgress, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import PageHeader from 'src/views/apps/academicYear/PageHeader'
import TableHeader from 'src/views/apps/academicYear/TableHeader'
import { useAuth } from 'src/hooks/useAuth'
import { fetchYears } from 'src/store/apps/academicData/actions'
import DataTable from 'src/views/apps/academicYear/Table'
import ResponsiveCardGrid from 'src/views/apps/academicYear/responsiveCards'
import NoPermissionComponent from 'src/views/apps/permissions/noAccess'

function AcademicYear() {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.academicData?.yearsLoading)
  const [showYearDrawer, setYearDrawer] = useState(false)
  const years = useSelector(state => state.academicData['years'])
  const user = useAuth()
  const { academic: view } = user?.user?.permissions?.nav || {}
  const { read } = user?.user?.permissions?.year?.years || {}

  const handlePageChange = nextPage => {
    dispatch(fetchYears(nextPage))
  }

  useEffect(() => {
    dispatch(fetchYears(1))
  }, [dispatch])

  const cardData = [
    { header: 'مجموع السنين التنفيذية', number: years?.data?.length },
    { header: 'مجموع الإدارات', number: years?.totals?.total_departs },
    { header: 'مجموع المدارس', number: years?.totals?.total_schools },
    { header: 'مجموع المعسكرات', number: years?.totals?.total_camps },
    { header: 'مجموع الفصول', number: years?.totals?.total_classes },
    { header: 'مجموع الطلاب', number: years?.totals?.total_students }
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
      {view && read ? (
        <>
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
                  filters={cardData}
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
                <ResponsiveCardGrid cardData={cardData} />
              </Grid>
            </Grid>
          </Grid>
        </>
      ) : (
        <NoPermissionComponent featureName='Academic Years' />
      )}
    </Grid>
  )
}

export default AcademicYear
