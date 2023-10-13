import { useState, forwardRef, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
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

import EditForm from 'src/views/sharedComponents/EditForm'
import { editSession } from 'src/store/apps/sessions/actions'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const DialogAddEventInfo = ({ toggle, formInputs, showEdit }) => {
  // ** States */
  const dispatch = useDispatch()
  const events = useSelector(state => state.events?.data.data?.data)

  const schema = yup.object().shape({
    name: yup
      .string()
      .min(3, obj => showErrors('Session Name', obj.value.length, obj.min))
      .required()
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
    console.log(data)

    let formData = {
      name: data.name,
      date: data.date,
      type: data.type
    }
    //dispatch(editSession({ data: formData, id: selectedSession.id }))
    handleClose()
  }

  const handleClose = () => {
    toggle()
  }

  return (
    <Dialog
      fullWidth
      open={showEdit}
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
            تعديل الحدث
          </Typography>
        </Box>
        <EditForm
          customizeSubmit={customizeSubmit}
          handleClose={handleClose}
          schema={schema}
          formInputs={formInputs}
          selected={events}
        />
      </DialogContent>
    </Dialog>
  )
}

export default DialogAddEventInfo
