import { CircularProgress, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import PageHeader from 'src/views/apps/academicYear/PageHeader'
import TableHeader from 'src/views/apps/academicYear/TableHeader'

import { fetchAdministrations, fetchGovs, searchData } from 'src/store/apps/academicData/actions'
import DataTable from 'src/views/apps/academicYear/Table'
import { useRouter } from 'next/router'
import { useAuth } from 'src/hooks/useAuth'
import ResponsiveCardGrid from 'src/views/apps/academicYear/responsiveCards'

function AdministrationData() {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.academicData?.administrationsLoading)
  const searchedData = useSelector(state => state.academicData?.searchedData)
  const searchedQuery = useSelector(state => state.academicData?.searchedQuery)
  const data = useSelector(state => state.academicData['administrations'])
  console.log(data?.data)

  const [showDrawer, setDrawer] = useState(false)
  const router = useRouter()
  const { pastRoute, id } = router.query

  const formActionData = {
    year_id: pastRoute,
    city_id: id
  }

  const user = useAuth()

  const { year } = user?.user?.permissions
  const { add, edit, delete: deletee, read } = year
  useEffect(() => {
    dispatch(fetchAdministrations({ page: 1, cityId: id, yearId: pastRoute }))
  }, [pastRoute, dispatch, id])

  const sums = data?.data?.reduce(
    (acc, obj) => {
      acc.total_classes += obj.total_classes
      acc.total_schools += obj.total_schools
      acc.total_students += obj.total_students

      return acc
    },
    { total_classes: 0, total_schools: 0, total_students: 0 }
  )

  console.log(sums)

  const { total_classes = null, total_departs = null, total_schools = null, total_students = null } = sums || {}

  const cardData = [
    { header: 'Total Schools', number: total_schools },
    { header: 'Total Classes', number: total_classes },
    { header: 'Total Students', number: total_students }
  ]
  console.log(cardData)
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
    if (searchedData) {
      dispatch(searchData({ page: nextPage, searched: 'departs', query: searchedQuery }))
    } else {
      dispatch(fetchAdministrations({ page: nextPage, cityId: id, yearId: pastRoute }))
    }
  }

  return (
    <Grid container spacing={10}>
      <Grid item xs={12} md={12}>
        <PageHeader src={'/images/administration.jpg'} />
      </Grid>
      <Grid item xs={12} md={12}>
        <Grid container>
          {add && (
            <Grid item xs={12}>
              <TableHeader
                title={'الإدارات التعليمية'}
                formType={'administrations'}
                showDrawer={showDrawer}
                setDrawer={setDrawer}
                addData={formActionData}
                fetchData={fetchAdministrations}
                fetchParams={{ page: 1, cityId: id, yearId: pastRoute }}
                placeholder={'الإدارة التعليمية'}
              />
            </Grid>
          )}
          {read ? (
            <Grid item xs={12}>
              <DataTable
                dataName={'الإدارة '}
                formType={'administrations'}
                storeData={'administrations'}
                editData={formActionData}
                handlePageChange={handlePageChange}
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

export default AdministrationData
