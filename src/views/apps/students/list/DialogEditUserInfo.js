// ** React Imports
import { useState, forwardRef, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Fade from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import Select from '@mui/material/Select'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import FormDate from '../../../sharedComponents/FormDate'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

/** import libraries */
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { editStudent, getClass } from 'src/store/apps/student/actions'
import { FormHelperText } from '@mui/material'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const DialogEditUserInfo = ({ toggle }) => {
  // ** States

  const defaultValues = {
    name: '',
    age: '',
    gender: '',
    birthdate: new Date()
  }

  const schema = yup.object().shape({
    name: yup
      .string()
      .min(3, obj => showErrors('First Name', obj.value.length, obj.min))
      .required('Please enter a valid name'),
    birthdate: yup.date(),
    gender: yup.string(),
    class: yup.string()
  })

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

  useEffect(() => {
    if (selectedStudent) {
      setValue('name', selectedStudent.name)
      setValue('gender', selectedStudent.gender)
      setValue('age', selectedStudent.age)
      setValue('class', selectedStudent?.class)
    }
    console.log(selectedStudent.degree)
    dispatch(getClass(selectedStudent.degree))
  }, [selectedStudent])

  const dispatch = useDispatch()
  const selectedStudent = useSelector(state => state.student.selectedStudent)
  const classes = useSelector(state => state.student.classes)
  const selectedClass = watch('class')

  console.log(selectedStudent)

  /** Functions */

  const showErrors = (field, valueLen, min) => {
    if (valueLen === 0) {
      return `${field} field is required`
    } else if (valueLen > 0 && valueLen < min) {
      return `${field} must be at least ${min} characters`
    } else {
      return ''
    }
  }

  console.log(selectedClass)

  const onSubmit = data => {
    console.log(selectedClass)

    let formData = {
      name: data.name,
      gender: data.gender,
      clase_id: data.class
    }

    dispatch(editStudent({ data: formData, id: selectedStudent.id }))
    reset()
    handleClose()
  }

  const handleClose = () => {
    toggle()
    reset()
  }

  return (
    <Dialog fullWidth open={toggle} maxWidth='xs' scroll='body' onClose={handleClose} TransitionComponent={Transition}>
      <DialogContent sx={{ pb: 6, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
        <IconButton
          size='small'
          onClick={() => handleClose()}
          sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
        >
          <Close />
        </IconButton>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
            Edit User Information
          </Typography>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={6}>
            <Grid item sm={12} xs={12}>
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
                    />
                  )}
                />
                {errors.name && <FormHelperText sx={{ color: 'error.main' }}>{errors.name.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item sm={12} xs={12}>
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
                      >
                        <MenuItem value='male'>Male</MenuItem>
                        <MenuItem value='female'>Female</MenuItem>
                      </Select>
                    </Box>
                  )}
                />
                {errors.gender && <FormHelperText sx={{ color: 'error.main' }}>{errors.gender.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item sm={12} xs={12}>
              <FormControl fullWidth sx={{ mb: 6 }}>
                <Controller
                  name='class'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <Box>
                      <InputLabel id='class-select-label'>Class</InputLabel>
                      <Select
                        fullWidth
                        value={value}
                        id='class-select'
                        label='Class'
                        labelId='class-select-label'
                        onChange={onChange}
                        inputProps={selectedStudent.class}
                      >
                        {classes &&
                          classes?.map(c => (
                            <MenuItem value={c.id} key={c.id}>
                              {c.name}
                            </MenuItem>
                          ))}
                      </Select>
                    </Box>
                  )}
                />
                {errors.class && <FormHelperText sx={{ color: 'error.main' }}>{errors.class.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item sm={12} xs={12}>
              <Grid item sm={12} xs={12}>
                <FormControl fullWidth sx={{ mb: 6 }}>
                  <Controller
                    name='age'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Age'
                        onChange={onChange}
                        placeholder='Enter your age'
                        error={Boolean(errors.age)}
                      />
                    )}
                  />
                  {errors.age && <FormHelperText sx={{ color: 'error.main' }}>{errors.age.message}</FormHelperText>}
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={12} xs={12} sx={{ pb: { xs: 8, sm: 12.5 }, justifyContent: 'space-between' }}>
            <Button variant='contained' sx={{ mr: 2 }} type='submit'>
              Submit
            </Button>
            <Button variant='outlined' color='secondary' onClick={() => handleClose()}>
              Discard
            </Button>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default DialogEditUserInfo
