import { CircularProgress, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import PageHeader from 'src/views/apps/academicYear/PageHeader'
import TableHeader from 'src/views/apps/academicYear/TableHeader'

import { fetchAdministrations, searchData } from 'src/store/apps/academicData/actions'
import DataTable from 'src/views/apps/academicYear/Table'
import { useRouter } from 'next/router'
import ResponsiveCardGrid from 'src/views/apps/academicYear/responsiveCards'
import { useAuth } from 'src/hooks/useAuth'
import NoPermissionComponent from 'src/views/apps/permissions/noAccess'
import themeConfig from 'src/configs/themeConfig'
import ExportToExcelButton from 'src/views/sharedComponents/ExportFilters'

function AdministrationData() {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.academicData?.administrationsLoading)
  const searchedData = useSelector(state => state.academicData?.searchedData)
  const searchedQuery = useSelector(state => state.academicData?.searchedQuery)
  const data = useSelector(state => state.academicData['administrations'])
  const user = useAuth()
  const { academic: view } = user?.user?.permissions?.nav || {}
  const { read } = user?.user?.permissions?.year?.administrations || {}

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

  const cardData = [
    { header: 'مجموع الإدارات', number: data?.data?.length },
    { header: 'مجموع المدارس', number: data?.totals?.total_schools },
    { header: 'مجموع المعسكرات', number: data?.totals?.total_camps },
    { header: 'مجموع الفصول', number: data?.totals?.total_classes },
    { header: 'مجموع الطلاب', number: data?.totals?.total_students },
    { header: 'الحاضرين فى الامتحان القبلى', number: data?.totals?.['exam attendance']?.[0]?.attendance },
    { header: 'الحاضرين فى الامتحان البعدى', number: data?.totals?.['exam attendance']?.[1]?.attendance },
    { header: 'عدد المدرسين', number: data?.totals?.total_teachers }
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
    if (searchedData) {
      dispatch(searchData({ page: nextPage, searched: 'departs', query: searchedQuery }))
    } else {
      dispatch(fetchAdministrations({ page: nextPage, cityId: id, yearId: pastRoute }))
    }
  }

  return (
    <Grid container>
      {view && read ? (
        <>
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
                  filters={cardData}
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
                <ResponsiveCardGrid cardData={cardData} />
              </Grid>
            </Grid>
          </Grid>
        </>
      ) : (
        <NoPermissionComponent featureName='Administrations' />
      )}
    </Grid>
  )
}

export default AdministrationData
