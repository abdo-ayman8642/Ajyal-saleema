// ** React Imports
import { forwardRef } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Fade from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

/** import libraries */
import * as yup from 'yup'
import { editUser } from 'src/store/apps/user/actions'
import EditForm from 'src/views/sharedComponents/EditForm'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const DialogEditUserInfo = ({ toggle, formInputs, showEditForm }) => {
  // ** States */
  const dispatch = useDispatch()
  const selectedUser = useSelector(state => state.user.selectedUser)

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    phone: yup
      .string()
      .typeError('phone Number field is required')
      .min(10, obj => showErrors('phone Number', obj.value.length, obj.min))
      .required(),
    password: yup.string().min(8, obj => showErrors('passord', obj.value.length, obj.min)),
    name: yup
      .string()
      .min(3, obj => showErrors('First Name', obj.value.length, obj.min))
      .required(),
    role: yup.string().required()
  })

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

  const customizeSubmit = data => {
    const passwordField = data.password ? { password: data.password } : {}
    let formData = {
      name: data.name,
      gender: data.gender,
      ...passwordField,
      email: data.email,
      role: data.role,
      phone: data.phone
    }
    dispatch(editUser({ data: formData, id: selectedUser.id }))
    handleClose()
  }

  const handleClose = () => {
    toggle()
  }

  return (
    <Dialog
      fullWidth
      open={showEditForm}
      maxWidth='xs'
      scroll='body'
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <DialogContent sx={{ pb: 6, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
        <IconButton
          size='small'
          onClick={() => handleClose()}
          sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
        >
          <Close />
        </IconButton>
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
            تحرير معلومات المستخدم
          </Typography>
        </Box>
        <EditForm
          customizeSubmit={customizeSubmit}
          handleClose={handleClose}
          schema={schema}
          formInputs={formInputs}
          selected={selectedUser}
        />
      </DialogContent>
    </Dialog>
  )
}

export default DialogEditUserInfo
