// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
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
import SelectWrapper from 'src/views/sharedComponents/SelectWrapper'
import { handleActions } from 'src/helperFunctions/academicDataActions'
import { fetchGovs, fetchYears } from 'src/store/apps/academicData/actions'

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
  name: yup
    .string()
    .min(3, obj => showErrors('First Name', obj.value.length, obj.min))
    .required('Please enter a valid name'),
  year: yup.string().required(),
  administration: yup.string().required(),
})

const defaultValues = {
  name: '',
  year: '',
  administration: '',
}

const SchoolAddForm = props => {
  // ** Props
  const { open, toggle, title } = props

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
  const selectedAdministration = watch('administration')
  const years = useSelector(state => state.academicData?.data.years.data)
  const administrations = useSelector(state => state.academicData?.data.administrations?.data.data)
  const addAction = handleActions('add', 'schools')

  console.log(administrations)

  useEffect(() => {
    dispatch(fetchYears())
  }, [selectedYear])

  useEffect(() => {
    if (selectedYear) {
      dispatch(fetchGovs())
    }
  }, [selectedYear, dispatch])

  //** Functions */

  const onSubmit = data => {
    let formData = {
      name: data.name,
      department_id: selectedAdministration
    }

    dispatch(addAction({ data: formData}))
    handleClose()
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
        <Typography variant='h6'>{title}</Typography>
        <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
      </Header>
      <Box sx={{ p: 5 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SelectWrapper
            control={control}
            name='year'
            label='السنة الدراسية'
            errors={errors}
            options={years}
            disable={true}
          />
          <SelectWrapper
            control={control}
            name='administration'
            label='الإدارة التعليمية'
            errors={errors}
            options={administrations}
            disable={selectedYear}
          />
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='name'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='المدرسة'
                  onChange={onChange}
                  placeholder='Enter your name'
                  error={Boolean(errors.fullName)}
                  disabled={!selectedAdministration}
                />
              )}
            />
            {errors.name && <FormHelperText sx={{ color: 'error.main' }}>{errors.name.message}</FormHelperText>}
          </FormControl>
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

export default SchoolAddForm
