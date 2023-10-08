import { CircularProgress, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import PageHeader from 'src/views/apps/academicYear/PageHeader'
import TableHeader from 'src/views/apps/academicYear/TableHeader'

import { fetchAdministrations, fetchGovs, fetchSchools } from 'src/store/apps/academicData/actions'
import DataTable from 'src/views/apps/academicYear/Table'
import { useRouter } from 'next/router'
import { useAuth } from 'src/hooks/useAuth'
import ResponsiveCardGrid from 'src/views/apps/academicYear/responsiveCards'

function SchoolsData() {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.academicData?.schoolsLoading)
  const [showDrawer, setDrawer] = useState(false)
  const data = useSelector(state => state.academicData['schools'])
  const router = useRouter()
  const { id } = router.query
  const user = useAuth()

  const { year } = user?.user?.permissions
  const { add, edit, delete: deletee, read } = year

  useEffect(() => {
    dispatch(fetchSchools({ page: 1, id: id, type: 'school' }))
  }, [dispatch, id])

  const sums = data?.reduce(
    (acc, obj) => {
      acc.total_classes += obj.total_classes
      acc.total_schools += obj.total_schools
      acc.total_students += obj.total_students

      return acc
    },
    { total_classes: 0, total_schools: 0, total_students: 0 }
  )

  const { total_classes = null, total_departs = null, total_schools = null, total_students = null } = sums || {}

  const cardData = [
    { header: 'Total Schools', number: data?.length },
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

  const handlePageChange = nextPage => {
    dispatch(fetchSchools({ page: nextPage, id: id, type: 'school' }))
  }

  return (
    <Grid container spacing={10}>
      <Grid item xs={12} md={12}>
        <PageHeader src={'/images/academics.jpg'} />
      </Grid>
      <Grid item xs={12} md={12}>
        <Grid container>
          <Grid item xs={12}>
            <TableHeader
              title={'المدارس المشاركة'}
              formType={'schools'}
              showDrawer={showDrawer}
              setDrawer={setDrawer}
              addData={{ department_id: id, type: 'school' }}
              enableSearch={true}
            />
          </Grid>

          <Grid item xs={12}>
            <DataTable
              editData={{ department_id: id, type: 'school' }}
              dataName={'المدرسة '}
              formType={'schools'}
              storeData={'schools'}
              pathname={'school/grade'}
              handlePageChange={handlePageChange}
            />
            <ResponsiveCardGrid cardData={cardData} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default SchoolsData
