import { CircularProgress, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import PageHeader from 'src/views/apps/academicYear/PageHeader'
import TableHeader from 'src/views/apps/academicYear/TableHeader'
import { useAuth } from 'src/hooks/useAuth'
import { fetchYears } from 'src/store/apps/academicData/actions'
import DataTable from 'src/views/apps/academicYear/Table'
import { academicDataInputs } from 'src/helperFunctions/AcademicDataInputs'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'

function AcademicYear() {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.academicData?.yearsLoading)
  const [showYearDrawer, setYearDrawer] = useState(false)

  const user = useAuth()

  const { year } = user?.user?.permissions
  const { add, edit, delete: deletee, read } = year
  console.log(user)

  const handlePageChange = nextPage => {
    dispatch(fetchYears(nextPage))
  }

  useEffect(() => {
    dispatch(fetchYears(1))
  }, [dispatch])

  const years = useSelector(state => state.academicData['years'])
  const {
    total_classes = null,
    total_departs = null,
    total_schools = null,
    total_students = null
  } = years?.data?.[0]?.totals || {}
  console.log(total_classes, total_departs, total_schools, total_students)
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
                <div style={{ display: 'flex', gap: '1rem', marginTop: '5rem', justifyContent: 'space-evenly' }}>
                  <Card>
                    <CardActionArea>
                      <CardContent>
                        <Typography gutterBottom variant='h5' component='div'>
                          Total Departments
                        </Typography>
                        <Typography
                          variant='body2'
                          color='text.secondary'
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: '2rem',
                            fontSize: '8rem'
                          }}
                        >
                          {total_departs}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                  <Card>
                    <CardActionArea>
                      <CardContent>
                        <Typography gutterBottom variant='h5' component='div'>
                          Total Schools
                        </Typography>
                        <Typography
                          variant='body2'
                          color='text.secondary'
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: '2rem',
                            fontSize: '8rem'
                          }}
                        >
                          {total_schools}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                  <Card>
                    <CardActionArea>
                      <CardContent>
                        <Typography gutterBottom variant='h5' component='div'>
                          Total Classes
                        </Typography>
                        <Typography
                          variant='body2'
                          color='text.secondary'
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: '2rem',
                            fontSize: '8rem'
                          }}
                        >
                          {total_classes}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                  <Card>
                    <CardActionArea>
                      <CardContent>
                        <Typography gutterBottom variant='h5' component='div'>
                          Total Students
                        </Typography>
                        <Typography
                          variant='body2'
                          color='text.secondary'
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: '2rem',
                            fontSize: '8rem'
                          }}
                        >
                          {total_students}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </div>
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
