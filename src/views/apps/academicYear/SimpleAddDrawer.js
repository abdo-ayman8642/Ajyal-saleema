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
import AddForm from 'src/views/sharedComponents/AddForm'
import { handleActions } from 'src/helperFunctions/academicDataActions'

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
  name: yup
    .string()
    .min(3, obj => showErrors('Name', obj.value.length, obj.min))
    .required('Name field is required')
})

const SimpleAddDrawer = props => {
  // ** Props
  const { open, toggle, formInputs, action, addData, formType } = props

  // ** State
  const dispatch = useDispatch()

  // ** functions
  const onSubmit = data => {
    let formData =
      formType === 'students'
        ? {
            name: data.name,
            gender: data.gender,
            birthdate: data.date,
            ...addData
          }
        : formType === 'schools' || formType === 'govs' || formType === 'administrations' || formType === 'camps'
        ? {
            name: data.name,
            code: data.code,

            ...addData
          }
        : {
            name: data.name,
            ...addData
          }
    dispatch(action({ data: formData }))
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
        <Typography variant='h6'>{formInputs.title}</Typography>
        <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
      </Header>
      <AddForm onSubmit={onSubmit} onCancel={handleClose} schema={schema} formInputs={formInputs.formInputs} />
    </Drawer>
  )
}

export default SimpleAddDrawer
