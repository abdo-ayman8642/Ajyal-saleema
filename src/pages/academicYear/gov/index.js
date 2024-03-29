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
import ResponsiveCardGrid from 'src/views/apps/academicYear/responsiveCards'
import { fetchYears } from 'src/store/apps/academicData/actions'
import { useAuth } from 'src/hooks/useAuth'
import NoPermissionComponent from 'src/views/apps/permissions/noAccess'

function getObjectById(objects, id) {
  if (!objects) return null

  for (let i = 0; i < objects.length; i++) {
    if (objects[i].id === id) {
      return objects[i]
    }
  }

  return null
}

function GovData() {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.academicData?.govsLoading)
  const [showDrawer, setDrawer] = useState(false)
  const router = useRouter()
  const yearId = router.query.id
  const data = useSelector(state => state.academicData['years'])
  const searchedQuery = useSelector(state => state.academicData?.searchedQuery)
  const searchedData = useSelector(state => state.academicData?.searchedData)
  const user = useAuth()
  const { academic: view } = user?.user?.permissions?.nav

  const { read } = user?.user?.permissions?.year?.govs || {}

  const {
    total_classes = null,
    total_departs = null,
    total_schools = null,
    total_students = null,
    total_camps = null
  } = getObjectById(data?.data, Number(yearId)) || {}

  const cardData = [
    { header: 'مجموع الإدارات', number: total_departs },
    { header: 'مجموع المعسكرات', number: total_camps },
    { header: 'مجموع المدارس', number: total_schools },
    { header: 'مجموع الفصول', number: total_classes },
    { header: 'مجموع الطلاب', number: total_students }
  ]

  useEffect(() => {
    dispatch(fetchGovs(1))
    dispatch(handlePastRoute(yearId))
    dispatch(fetchYears(1))
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
      {view && read ? (
        <>
          {' '}
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
                  filters={cardData}
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
                <ResponsiveCardGrid cardData={cardData} />
              </Grid>
            </Grid>
          </Grid>
        </>
      ) : (
        <NoPermissionComponent featureName='Governorate' />
      )}
    </Grid>
  )
}

export default GovData
