// ** React Imports
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
import AddForm from 'src/views/sharedComponents/AddForm'
import EditForm from 'src/views/sharedComponents/EditForm'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const AddExam = ({ formInputs, open, handleClose, customizeSubmit, schemaObj, edit, selected, title }) => {
  // ** States */

  const showErrors = (field, valueLen, min) => {
    if (valueLen === 0) {
      return `${field} field is required`
    } else if (valueLen > 0 && valueLen < min) {
      return `${field} must be at least ${min} characters`
    } else {
      return ''
    }
  }
  const schema = yup.object().shape(schemaObj(showErrors))

  /** Functions */

  return (
    <Dialog fullWidth open={open} maxWidth='xs' scroll='body' onClose={handleClose} TransitionComponent={Transition}>
      <DialogContent sx={{ pb: 6, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
        <IconButton
          size='small'
          onClick={() => handleClose()}
          sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
        >
          <Close />
        </IconButton>
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
            {title}
          </Typography>
        </Box>
        {edit ? (
          <EditForm
            formInputs={formInputs}
            handleClose={handleClose}
            schema={schema}
            customizeSubmit={customizeSubmit}
            selected={selected}
          />
        ) : (
          <AddForm formInputs={formInputs} onCancel={handleClose} schema={schema} onSubmit={customizeSubmit} />
        )}
      </DialogContent>
    </Dialog>
  )
}

export default AddExam
