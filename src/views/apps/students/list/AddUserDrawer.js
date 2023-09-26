// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

// ** Third Party Importsx
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'
import { handleSelectedStudent } from 'src/store/apps/student'
import {
  addStudent,
  fetchAdministration,
  fetchClasses,
  fetchGov,
  fetchGrades,
  fetchSchools,
  fetchYears,
  handleImport
} from 'src/store/apps/student/actions'
import FormDate from 'src/views/sharedComponents/FormDate'
import SelectWrapper from 'src/views/sharedComponents/SelectWrapper'
import ImpExpFile from './ImpExpFile'

//** handle errors in form Validations

const showErrors = (field, valueLen, min) => {
  if (valueLen === 0) {
    return `${field} field is required`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else {
    return ''
  }
}

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

//**  Form Validation
const schema = yup.object().shape({
  gov: yup.string().required(),
  administr: yup.string().required(),
  school: yup.string().required(),
  grade: yup.string().required(),
  class: yup.string().required()
})

const defaultValues = {
  name: '',
  birthDate: new Date(),
  year: '',
  gov: '',
  administr: '',
  school: '',
  grade: '',
  class: '',
  gender: ''
}

const SidebarAddStudent = props => {
  // ** Props
  const { open, toggle } = props

  // ** stats && variables
  const dispatch = useDispatch()

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

  // ** State & variables
  const selectedYear = watch('year')
  const selectedGov = watch('gov')
  const selectedAdminstr = watch('administr')
  const selectedSchool = watch('school')
  const selectedGrade = watch('grade')
  const selectedClass = watch('class')
  const selectedStudent = useSelector(state => state.student.selectedStudent)
  const years = useSelector(state => state.student.years.data)
  const govs = useSelector(state => state.student.gov?.data)
  const administration = useSelector(state => state.student.administration?.data)
  const schools = useSelector(state => state.student.schools?.data)
  const grades = useSelector(state => state.student.grades?.data)
  const classes = useSelector(state => state.student.classes?.data)
  const [files, setFiles] = useState([])

  useEffect(() => {
    dispatch(fetchYears())
  }, [selectedYear])

  useEffect(() => {
    if (selectedYear) {
      dispatch(fetchGov())
    }
  }, [selectedYear, dispatch])

  useEffect(() => {
    if (selectedGov) {
      dispatch(fetchAdministration({ cityId: selectedGov, yearId: selectedYear }))
    }
  }, [selectedGov, selectedYear, dispatch])

  useEffect(() => {
    if (selectedAdminstr) {
      dispatch(fetchSchools({ id: selectedAdminstr }))
    }
  }, [selectedAdminstr, dispatch])

  useEffect(() => {
    if (selectedSchool) {
      dispatch(fetchGrades())
    }
  }, [selectedSchool, dispatch])

  useEffect(() => {
    if (selectedGrade) {
      dispatch(fetchClasses({ id: selectedSchool }))
    }
  }, [selectedGrade, selectedSchool, dispatch])

  //** Functions */

  const onSubmit = data => {
    if (files.length === 0) {
      let formData = {
        name: data.name,
        gender: data.gender,
        birthdate: data.birthDate,
        clase_id: selectedClass
      }

      dispatch(addStudent({ data: formData }))
      handleClose()
    }

    if (files.length > 0) {
      const formData = new FormData()
      formData.append('file', files[0])
      formData.append('class_id', selectedClass)

      const formDataObject = {}
      for (const [key, value] of formData.entries()) {
        formDataObject[key] = value
      }

      const fileX = formData.get('file')
      const reader = new FileReader()

      reader.onload = () => {}
      reader.readAsText(fileX)
      dispatch(handleImport(formData))
      handleClose()
    }
  }

  const handleClose = () => {
    dispatch(handleSelectedStudent(null))
    toggle()
    reset()
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h6'>Add Student</Typography>
        <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
      </Header>
      <Box sx={{ p: 5 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='name'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Full Name'
                  onChange={onChange}
                  placeholder='Enter your name'
                  error={Boolean(errors.fullName)}
                  disabled={files.length > 0}
                />
              )}
            />
            {errors.name && <FormHelperText sx={{ color: 'error.main' }}>{errors.name.message}</FormHelperText>}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='birthDate'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <FormDate disabled={files.length > 0} onChange={onChange} value={value} label={'Birth Date'} />
              )}
            />

            {errors.birthDate && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.birthDate.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='gender'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Box>
                  <InputLabel id='gender-select-label'>Gender</InputLabel>
                  <Select
                    fullWidth
                    value={value}
                    id='gender-select'
                    label='Gender'
                    labelId='gender-select-label'
                    onChange={onChange}
                    inputProps={{ placeholder: 'Select Gender' }}
                    disabled={files.length > 0}
                  >
                    <MenuItem value='male'>Male</MenuItem>
                    <MenuItem value='female'>Female</MenuItem>
                  </Select>
                </Box>
              )}
            />
            {errors.gender && <FormHelperText sx={{ color: 'error.main' }}>{errors.gender.message}</FormHelperText>}
          </FormControl>
          <SelectWrapper
            control={control}
            name={'year'}
            label={'Academic Year'}
            errors={errors}
            options={years}
            disable={true}
            es
          />
          <SelectWrapper
            control={control}
            name={'gov'}
            label={'Governorate'}
            errors={errors}
            options={govs}
            disable={selectedYear}
          />
          <SelectWrapper
            control={control}
            name={'administr'}
            label={'Administration'}
            errors={errors}
            options={administration}
            disable={selectedGov}
            action={fetchAdministration}
          />
          <SelectWrapper
            control={control}
            name={'school'}
            label={'School'}
            errors={errors}
            options={schools}
            disable={selectedAdminstr}
          />
          <SelectWrapper
            control={control}
            name={'grade'}
            label={'grade'}
            errors={errors}
            options={grades}
            disable={selectedSchool}
          />
          <SelectWrapper
            control={control}
            name={'class'}
            label={'class'}
            errors={errors}
            options={classes?.data}
            disable={selectedGrade}
          />
          <ImpExpFile files={files} setFiles={setFiles} />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }}>
              Submit
            </Button>
            <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default SidebarAddStudent
