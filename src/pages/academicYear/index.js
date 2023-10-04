import { CircularProgress, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import PageHeader from 'src/views/apps/academicYear/PageHeader'
import TableHeader from 'src/views/apps/academicYear/TableHeader'
import { useAuth } from 'src/hooks/useAuth'
import { fetchYears } from 'src/store/apps/academicData/actions'
import DataTable from 'src/views/apps/academicYear/Table'

function AcademicYear() {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.academicData?.yearsLoading)
  const [showYearDrawer, setYearDrawer] = useState(false)
  const user = useAuth()

  const { year } = user?.user?.permissions
  const { add, edit, delete: deletee, read } = year
  console.log(add, edit, deletee, read)
  console.log(user)

  const handlePageChange = nextPage => {
    dispatch(fetchYears(nextPage))
  }

  useEffect(() => {
    dispatch(fetchYears(1))
  }, [dispatch])

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
    <>
      <Grid container spacing={10}>
        <Grid item xs={12} md={12}>
          <PageHeader src={'/images/academics2.jpg'} />
        </Grid>

        <Grid item xs={12} md={12}>
          <Grid container>
            {add && (
              <Grid item xs={12}>
                <TableHeader
                  title={'السنة التنفيذية'}
                  formType={'years'}
                  showDrawer={showYearDrawer}
                  setDrawer={setYearDrawer}
                />
              </Grid>
            )}
            {read ? (
              <Grid item xs={12}>
                <DataTable
                  dataName={'العام الدراسي'}
                  formType={'years'}
                  storeData={'years'}
                  pathname={`academicYear/gov`}
                  handlePageChange={handlePageChange}
                />
              </Grid>
            ) : (
              <h1 style={{ display: 'block', margin: '5% auto' }}>Don't Have permission</h1>
            )}
          </Grid>
        </Grid>
        {/* {read ? (
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
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <h1 style={{ display: 'block', margin: '5% auto' }}>Don't Have permission</h1>
        )} */}
      </Grid>
    </>
  )
}

export default AcademicYear
