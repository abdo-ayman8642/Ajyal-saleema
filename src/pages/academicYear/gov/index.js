import { CircularProgress, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import PageHeader from 'src/views/apps/academicYear/PageHeader'
import TableHeader from 'src/views/apps/academicYear/TableHeader'

import { fetchGovs, searchData } from 'src/store/apps/academicData/actions'
import DataTable from 'src/views/apps/academicYear/Table'
import { useRouter } from 'next/router'
import { handlePastRoute } from 'src/store/apps/academicData'

function GovData() {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.academicData?.govsLoading)
  const [showDrawer, setDrawer] = useState(false)
  const router = useRouter()
  const yearId = router.query.id
  const searchedQuery = useSelector(state => state.academicData?.searchedQuery)
  const searchedData = useSelector(state => state.academicData?.searchedData)

  console.log(searchedQuery)

  useEffect(() => {
    dispatch(fetchGovs(1))
    dispatch(handlePastRoute(yearId))
  }, [dispatch, yearId])

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
      dispatch(searchData({ page: nextPage, searched: 'cities', query: searchedQuery }))
    } else {
      dispatch(fetchGovs(nextPage))
    }
  }

  return (
    <Grid container spacing={10}>
      <Grid item xs={12} md={12}>
        <PageHeader src={'/images/govs.jpg'} />
      </Grid>
      <Grid item xs={12} md={12}>
        <Grid container>
          <Grid item xs={12}>
            <TableHeader
              fetchData={fetchGovs}
              title={'المحافظات'}
              formType={'govs'}
              showDrawer={showDrawer}
              setDrawer={setDrawer}
              fetchParams={1}
              placeholder={'المحافظة'}
            />
          </Grid>
          <Grid item xs={12}>
            <DataTable
              dataName={'المحافظة'}
              formType={'govs'}
              storeData={'govs'}
              pathname={`gov/administration`}
              pastRoute={yearId}
              handlePageChange={handlePageChange}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default GovData
