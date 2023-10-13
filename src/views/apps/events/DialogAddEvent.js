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
import { editEvent } from 'src/store/apps/events/actions'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const DialogAddEventInfo = ({ toggle, formInputs, showEdit, edited }) => {
  // ** States */
  const dispatch = useDispatch()
  const events = useSelector(state => state.events?.data.data?.data)

  const schema = yup.object().shape({
    name: yup
      .string()
      .min(3, obj => showErrors('Event Name', obj.value.length, obj.min))
      .required(),
    date_from: yup.date().required(),
    date_to: yup.date().required()
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
      from: data.date_from,
      to: data.date_to
    }
    dispatch(editEvent({ data: formData, id: edited.id }))
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
          selected={edited}
        />
      </DialogContent>
    </Dialog>
  )
}

export default DialogAddEventInfo
