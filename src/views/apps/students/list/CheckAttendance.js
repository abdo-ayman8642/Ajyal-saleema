import { Dialog, DialogContent } from '@mui/material'
import { Transition } from 'mdi-material-ui'
import React from 'react'
import ListWithSwitch from './ListWithSwitch'

function CheckAttendance({ toggle, open }) {
  return (
    <Dialog fullWidth open={open} maxWidth='xs' onClose={toggle}>
      <DialogContent>
        <ListWithSwitch />
      </DialogContent>
    </Dialog>
  )
}

export default CheckAttendance
