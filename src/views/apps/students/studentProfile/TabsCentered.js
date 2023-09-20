import { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import MuiTab from '@mui/material/Tab'
import { useSelector } from 'react-redux'
import { Grid } from '@mui/material'
import LeftSide from './LeftSide'
import { useRouter } from 'next/router'
import HasNotExam from './HasNotExam'
import RightSide from './RightSide'
import { useDispatch } from 'react-redux'
import { fetchBy, fetchById } from 'src/store/apps/student/actions'

const Tab = styled(MuiTab)(({ theme }) => ({
  minHeight: 48,
  flexDirection: 'row',
  '& svg': {
    marginBottom: '0 !important',
    marginRight: theme.spacing(1)
  },
  width: '100px',
  fontSize: '1rem',
  fontWeight: 'bold'
}))

const TabsFullWidth = () => {
  // ** State
  const [value, setValue] = useState('')
  const exams = useSelector(state => state.exams?.data?.data)
  const router = useRouter()
  const routeId = router.query.id
  const dispatch = useDispatch()

  const student =
    useSelector(state => state.student.singleStudent?.data) || useSelector(state => state.academicData?.selectedData)

  // useEffect(() => {
  //   if (exams && exams.length > 0) {
  //     setValue(exams[0].id?.toString())
  //   }
  // }, [])

  useEffect(() => {
    dispatch(fetchById(routeId))
  }, [dispatch])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  console.log(student, exams)
  const StudentExamView = () => {
    if (routeId) {
      if (student?.has_exam && exams?.length) {
        return (
          <Grid item md={8}>
            <TabContext value={value?.toString()}>
              <TabList variant='fullWidth' onChange={handleChange} aria-label='full width tabs example'>
                {exams?.map(ex => (
                  <Tab key={ex.id} value={ex.id.toString()} label={ex.name} />
                ))}
              </TabList>
              {exams?.map(ex => (
                <TabPanel value={ex.id.toString()} sx={{ p: 0, width: '100%' }} key={ex.id}>
                  <RightSide id={ex.id} studentId={routeId} />
                </TabPanel>
              ))}
            </TabContext>
          </Grid>
        )
      } else {
        return (
          <Grid item spacing={10}>
            <HasNotExam />
          </Grid>
        )
      }
    }
  }

  return (
    <Grid container spacing={10}>
      <Grid item md={4} style={{ zIndex: '999' }}>
        <LeftSide data={student} />
      </Grid>
      <StudentExamView />
    </Grid>
  )
}

export default TabsFullWidth
