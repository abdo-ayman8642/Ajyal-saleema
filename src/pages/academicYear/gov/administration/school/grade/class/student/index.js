import { CircularProgress, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PageHeader from 'src/views/apps/academicYear/PageHeader'
import TableHeader from 'src/views/apps/academicYear/TableHeader'

import { filterBy } from 'src/store/apps/academicData/actions'
import DataTable from 'src/views/apps/academicYear/Table'
import { useRouter } from 'next/router'
import ResponsiveCardGrid from 'src/views/apps/academicYear/responsiveCards'

function getObjectById(objects, id) {
  if (!objects) return null

  for (let i = 0; i < objects.length; i++) {
    if (objects[i].id === id) {
      return objects[i]
    }
  }

  // If no matching object is found, return null or handle it as needed

  return null
}

function StudentsData() {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.academicData?.studentsLoading)
  const [showDrawer, setDrawer] = useState(false)
  const data = useSelector(state => state.academicData['students'])
  const router = useRouter()
  const id = router.query.id

  const cardData = [{ header: 'Total Students', number: data?.data?.total }]

  useEffect(() => {
    dispatch(filterBy({ page: 1, query: 'class', value: id }))
  }, [dispatch, id])

  const handlePageChange = nextPage => {
    dispatch(filterBy({ page: nextPage, query: 'class', value: id }))
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
        <PageHeader src={'/images/students2.jpg'} />
      </Grid>
      <Grid item xs={12} md={12}>
        <Grid container>
          <Grid item xs={12}>
            <TableHeader
              title={'الطلاب'}
              formType={'students'}
              showDrawer={showDrawer}
              setDrawer={setDrawer}
              addData={{ urlId: id, query: 'class', clase_id: id }}
            />
          </Grid>
          <Grid item xs={12}>
            <DataTable
              dataName={'الطالب'}
              formType={'students'}
              storeData={'students'}
              editData={{ urlId: id, query: 'class' }}
              pathname={'student/view'}
              handlePageChange={handlePageChange}
            />
            <ResponsiveCardGrid cardData={cardData} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default StudentsData
