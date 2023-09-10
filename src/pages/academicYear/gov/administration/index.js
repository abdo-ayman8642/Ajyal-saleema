import { CircularProgress, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import PageHeader from 'src/views/apps/academicYear/PageHeader'
import TableHeader from 'src/views/apps/academicYear/TableHeader'

import { fetchAdministrations, fetchGovs, searchData } from 'src/store/apps/academicData/actions'
import DataTable from 'src/views/apps/academicYear/Table'
import { useRouter } from 'next/router'

function AdministrationData() {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.academicData?.administrationsLoading)
  const searchedData = useSelector(state => state.academicData?.searchedData)
  const searchedQuery = useSelector(state => state.academicData?.searchedQuery)
  const [showDrawer, setDrawer] = useState(false)
  const router = useRouter()
  const { pastRoute, id } = router.query

  const formActionData = {
    year_id: pastRoute,
    city_id: id
  }

  useEffect(() => {
    dispatch(fetchAdministrations({ page: 1, cityId: id, yearId: pastRoute }))
  }, [pastRoute, dispatch, id])

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
          <Grid item xs={12}>
            <DataTable
              dataName={'الإدارة '}
              formType={'administrations'}
              storeData={'administrations'}
              editData={formActionData}
              handlePageChange={handlePageChange}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default AdministrationData
