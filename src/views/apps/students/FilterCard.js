// ** MUI Imports
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Card,
  CardContent,
  Box,
  IconButton,
  Collapse,
  Backdrop,
  CircularProgress,
  Grid
} from '@mui/material'

// ** Icons Imports
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import { CardHeader } from '@mui/material'
import { ChevronDown, ChevronUp, Close, Refresh } from 'mdi-material-ui'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  fetchAdministrByGov,
  fetchAdministration,
  fetchClasses,
  fetchData,
  fetchGov,
  fetchGrades,
  fetchSchools,
  fetchYears,
  filterBy
} from 'src/store/apps/student/actions'
import { useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { resetSearchedStudents } from 'src/store/apps/student'

const defaultValues = {
  year: '',
  gov: '',
  administr: '',
  school: '',
  grade: '',
  class: ''
}

const schema = yup.object().shape({
  year: yup.string(),
  gov: yup.string(),
  administr: yup.string(),
  school: yup.string(),
  grade: yup.string(),
  class: yup.string()
})

const FilterCard = () => {
  const {
    reset,
    control,
    setValue,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  /** states and variables */
  const [collapsed, setCollapsed] = useState(false)
  const [reload, setReload] = useState(false)
  const dispatch = useDispatch()

  const selectedYear = watch('year')
  const selectedGov = watch('gov')
  const selectedAdminstr = watch('administr')
  const selectedSchool = watch('school')
  const selectedGrade = watch('grade')
  const searchedStudents = useSelector(state => state.students?.searchedStudents)
  const years = useSelector(state => state.student.years.data)
  const govs = useSelector(state => state.student.gov?.data)
  const administration = useSelector(state => state.student.administration?.data)
  const schools = useSelector(state => state.student.schools?.data)
  const grades = useSelector(state => state.student.grades?.data)
  const classes = useSelector(state => state.student.classes?.data)
  const [searchBy, setSearchBy] = useState()

  /** submit button to prevent reload page before filtering  */

  useEffect(() => {
    if (selectedGov && selectedYear) {
      dispatch(fetchAdministrByGov({ yearId: selectedYear, cityId: selectedGov }))
    }
    if (selectedAdminstr) {
      dispatch(fetchSchools({ id: selectedAdminstr }))
    }
    if (selectedSchool) {
      dispatch(fetchGrades())
    }
    if (selectedGrade) {
      dispatch(fetchClasses({ id: selectedSchool }))
    }
  }, [selectedYear, selectedGov, selectedAdminstr, selectedGrade, selectedSchool, dispatch])

  /** functions */
  const handleBackDrop = () => {
    setReload(true)
    setTimeout(() => {
      setReload(false)
    }, 500)
    reset()
    dispatch(resetSearchedStudents())
  }

  const handleChange = event => {
    const { name, value } = event.target
    setSearchBy(name)
    setValue(name, value)
  }

  const onSubmit = data => {
    dispatch(filterBy({ query: searchBy, value: watch(searchBy) }))
  }

  return (
    <Card>
      <CardHeader
        title={
          <Typography variant='h4' style={{ fontSize: '24px' }}>
            بحث متقدم
          </Typography>
        }
        action={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              size='small'
              aria-label='collapse'
              sx={{ mr: 2, color: 'text.secondary' }}
              onClick={() => {
                dispatch(fetchYears())
                dispatch(fetchGov())
                setCollapsed(!collapsed)
              }}
            >
              {!collapsed ? <ChevronDown fontSize='small' /> : <ChevronUp fontSize='small' />}
            </IconButton>
            <IconButton
              size='small'
              aria-label='reload'
              onClick={() => handleBackDrop()}
              sx={{ mr: 2, color: 'text.secondary' }}
            >
              <Refresh fontSize='small' />
            </IconButton>
          </Box>
        }
        sx={{ backgroundColor: '#F5F5F7', mb: 5 }}
      />
      <Collapse in={collapsed}>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={6}>
                <FormControl fullWidth sx={{ mb: 6 }}>
                  <Controller
                    name='year'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value } }) => (
                      <Box>
                        <InputLabel id='year-select-label'>Academic year</InputLabel>
                        <Select
                          fullWidth
                          name='year'
                          value={value}
                          id='year-select'
                          label='Academic year'
                          labelId='year-select-label'
                          onChange={handleChange}
                          inputProps={{ placeholder: 'Select year' }}
                        >
                          {years?.map(y => (
                            <MenuItem value={y.id} key={y.id}>
                              {y.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </Box>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormControl fullWidth sx={{ mb: 6 }}>
                  <Controller
                    name='gov'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Box>
                        <InputLabel id='gov-select-label'>Select governorate</InputLabel>
                        <Select
                          fullWidth
                          value={value}
                          id='gov-select'
                          label='Select governorate'
                          labelId='gov-select-label'
                          onChange={onChange}
                          inputProps={{ placeholder: 'Select governorate' }}
                        >
                          {govs?.map(g => (
                            <MenuItem value={g.id} key={g.id}>
                              {g.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </Box>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth sx={{ mb: 6 }}>
                  <Controller
                    name='administr'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Box>
                        <InputLabel id='adminstr-select-label'>Select administration</InputLabel>
                        <Select
                          fullWidth
                          value={value}
                          id='adminstr-select'
                          label='Select administration'
                          labelId='adminstr-select-label'
                          onChange={onChange}
                          disabled={!selectedGov || !selectedYear}
                          inputProps={{ placeholder: 'Select administration' }}
                        >
                          {administration?.map(ad => (
                            <MenuItem value={ad.id} key={ad.id}>
                              {ad.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </Box>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth sx={{ mb: 6 }}>
                  <Controller
                    name='school'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Box>
                        <InputLabel id='school-select-label'>Select school</InputLabel>
                        <Select
                          fullWidth
                          value={value}
                          id='school-select'
                          label='Select school'
                          labelId='school-select-label'
                          onChange={onChange}
                          disabled={!selectedAdminstr}
                          inputProps={{ placeholder: 'Select school' }}
                        >
                          {schools?.map(s => (
                            <MenuItem value={s.id} key={s.id}>
                              {s.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </Box>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth sx={{ mb: 6 }}>
                  <Controller
                    name='grade'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Box>
                        <InputLabel id='grade-select-label'>Select grade</InputLabel>
                        <Select
                          fullWidth
                          value={value}
                          id='grade-select'
                          label='Select grade'
                          labelId='grade-select-label'
                          onChange={onChange}
                          disabled={!selectedSchool}
                          inputProps={{ placeholder: 'Select grade' }}
                        >
                          {grades?.map(g => (
                            <MenuItem value={g.id} key={g.id}>
                              {g.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </Box>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={3}></Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Button
                  size='large'
                  type='submit'
                  variant='contained'
                  sx={{ mb: 2, fontSize: '1rem', fontWeight: 'bold' }}
                >
                  submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
        <Backdrop
          open={reload}
          sx={{
            position: 'absolute',
            color: theme => theme.palette.common.white,
            zIndex: theme => theme.zIndex.mobileStepper - 1
          }}
        >
          <CircularProgress color='inherit' />
        </Backdrop>
      </Collapse>
    </Card>
  )
}

export default FilterCard
