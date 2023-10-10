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
  const { academic: view } = user?.user?.permissions?.nav
  const { read } = user?.user?.permissions?.year

  const handlePageChange = nextPage => {
    dispatch(fetchYears(nextPage))
  }

  useEffect(() => {
    dispatch(fetchYears(1))
  }, [dispatch])

  const sums = years?.data?.reduce(
    (acc, obj) => {
      acc.total_classes += obj.total_classes
      acc.total_schools += obj.total_schools
      acc.total_students += obj.total_students
      acc.total_camps += obj.total_camps

      return acc
    },
    { total_classes: 0, total_schools: 0, total_students: 0, total_camps: 0 }
  )

  const {
    total_classes = null,
    total_departs = null,
    total_schools = null,
    total_students = null,
    total_camps = null
  } = sums || {}

  const cardData = [
    { header: 'Total Departments', number: years?.total },
    { header: 'Total Schools', number: total_schools },
    { header: 'Total Camps', number: total_camps },
    { header: 'Total Classes', number: total_classes },
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
