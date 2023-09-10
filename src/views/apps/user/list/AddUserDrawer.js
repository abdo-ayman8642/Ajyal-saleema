// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'

// ** Third Party Imports
import * as yup from 'yup'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** redux imports
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from 'src/store/apps/user/actions'
import AddForm from 'src/views/sharedComponents/AddForm'

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

/** control form validation rules */

const schema = yup.object().shape({
  email: yup.string().email().required(),
  phone: yup
    .string()
    .matches(/^[0-9]*$/, 'Only numbers are allowed')
    .typeError('phone field is required')
    .min(10, obj => showErrors('phone Number', obj.value.length, obj.min))
    .required(),
  password: yup
    .string()
    .min(8, obj => showErrors('passord', obj.value.length, obj.min))
    .required('passord field is required'),
  name: yup
    .string()
    .min(3, obj => showErrors('Name', obj.value.length, obj.min))
    .required('Name field is required'),
  gender: yup.string().required(),
  role: yup.string().required()
})

const SidebarAddUser = props => {
  // ** Props
  const { open, toggle, formInputs } = props

  // ** State
  const dispatch = useDispatch()

  const onSubmit = data => {
    let formData = {
      name: data.name,
      gender: data.gender,
      email: data.email,
      password: data.password,
      role: data.role,
      phone: data.phone
    }

    dispatch(addUser({ data: formData }))
    handleClose()
  }

  const handleClose = () => {
    toggle()
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
        <Typography variant='h6'>إضافة عضو</Typography>
        <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
      </Header>
      <AddForm onSubmit={onSubmit} onCancel={handleClose} schema={schema} formInputs={formInputs} />
    </Drawer>
  )
}

export default SidebarAddUser
