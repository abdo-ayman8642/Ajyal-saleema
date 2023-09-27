import React from 'react'

// Mui imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import { Loading } from 'mdi-material-ui'

import { useDispatch } from 'react-redux'

function ConfirmDialog({ open, toggle, loading, confirmationType, selected, deleteMulti, deleteSingle }) {
  /** states and variables */

  const dispatch = useDispatch()

  const handleSubmit = () => {
    if (selected?.length > 1) {
      dispatch(deleteMulti(selected))
    } else {
      dispatch(deleteSingle(selected))
    }
    selected = null
    toggle()
  }

  return (
    <Dialog
      open={open}
      onClose={toggle}
      aria-labelledby='user-view-edit'
      sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650, p: [1, 3] } }}
      aria-describedby='user-view-edit-description'
    >
      <DialogContent sx={{ display: 'flex' }}>
        <AlertCircleOutline color='primary' sx={{ mr: 2 }} />

        <DialogContentText id='alert-dialog-description' sx={{ fontSize: '1.2rem !important', color: 'info' }}>
          {` هل انت متأكد من ${confirmationType}`}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button variant='contained' sx={{ mr: 1 }} onClick={() => handleSubmit()}>
          {loading ? <Loading /> : 'تأكيد'}
        </Button>
        <Button variant='outlined' color='error' onClick={toggle}>
          إلغاء
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog
