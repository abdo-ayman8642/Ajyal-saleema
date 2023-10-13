// ** React Imports
import { useState, useEffect, useRef } from 'react'

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

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'
import { handleSelectedTeacher } from 'src/store/apps/teachers'
import { fetchData } from 'src/store/apps/teachers/actions'
import { assignTeacher } from 'src/store/apps/teachers/actions'

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
const schema = yup.object().shape({})

const defaultValues = {
  teacher: ''
}

const AssignTeacher = props => {
  // ** Props
  const { open, toggle, data, renderAgain } = props

  // ** Hooks
  const dispatch = useDispatch()
  const { id = null, type = null } = data || {}
  const place_id = type ? { schools: id } : { classes: id }

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

  const [teacherId, setTeacherId] = useState(null)
  const [selected, setSelected] = useState(false)

  const teachers = useSelector(state => state.teachers?.data?.data)

  useEffect(() => {
    dispatch(fetchData(1))
  }, [])

  //** Functions */
  const onSubmit = async e => {
    await dispatch(assignTeacher({ data: { ...place_id, teacher_id: teacherId } }))
    renderAgain()
    handleClose()
    renderAgain()
  }

  const handleClose = () => {
    setTeacherId(null)
    toggle()
    reset()
  }

  const onChangeTeacher = teacher => {
    setTeacherId(teacher?.target?.value)
    setSelected(true)
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
        <Typography variant='h5'>إضافة المعلم</Typography>
        <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
      </Header>

      <Box sx={{ p: 5 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <InputLabel
              id='teacher-select-label'
              sx={{
                transform: selected ? 'translate(0, -6px) scale(0.75)' : '', // Move label up when an option is selected
                backgroundColor: selected ? 'white' : '',
                margin: selected ? '0 1rem' : '',
                padding: selected ? '0 0.5rem' : ''

                //color: selected ? 'blue' : 'rgba(0, 0, 0, 0.54)' // Change label color when an option is selected
              }}
            >
              حدد المعلم
            </InputLabel>
            <Controller
              name='teacher'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Select
                  fullWidth
                  value={value}
                  id='teacher-select'
                  labelId='teacher-select-label'
                  onChange={e => {
                    onChange(e)
                    onChangeTeacher(e)
                  }}
                  sx={{
                    '&:before': {
                      borderBottom: '1px solid rgba(0, 0, 0, 0.42)' // Change the border color
                    },
                    '&:hover:not(.Mui-disabled):before': {
                      borderBottom: '1px solid rgba(0, 0, 0, 0.87)' // Change the border color on hover
                    }
                  }}
                >
                  <MenuItem value='' disabled>
                    <em>حدد المعلم</em>
                  </MenuItem>
                  {teachers?.map(t => (
                    <MenuItem value={t.id} key={t.id}>
                      {t.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.teacher && <FormHelperText sx={{ color: 'error.main' }}>{errors.teacher.message}</FormHelperText>}
          </FormControl>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {teacherId && (
              <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }} onClick={onSubmit}>
                تأكيد
              </Button>
            )}

            <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
              إلغاء
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default AssignTeacher
