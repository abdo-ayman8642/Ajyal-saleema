import { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Typography from '@mui/material/Typography'
import MuiTab from '@mui/material/Tab'
import { useSelector } from 'react-redux'
import ExamWrapper from './ExamWrapper'
import { Grid } from '@mui/material'

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

  useEffect(() => {
    if (exams && exams.length > 0) {
      setValue(exams[0].id?.toString())
    }
  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Grid container>
      <Grid item md={12} sx={{ width: '100%' }}>
        <TabContext value={value?.toString()}>
          <TabList variant='fullWidth' onChange={handleChange} aria-label='full width tabs example'>
            {exams?.map(ex => (
              <Tab key={ex.id} value={ex.id.toString()} label={ex.name} />
            ))}
          </TabList>
          {exams?.map(ex => (
            <TabPanel value={ex.id.toString()} sx={{ p: 0, width: '100%' }} key={ex.id}>
              <ExamWrapper exam={ex} key={ex.id} />
            </TabPanel>
          ))}
        </TabContext>
      </Grid>
    </Grid>
  )
}

export default TabsFullWidth
