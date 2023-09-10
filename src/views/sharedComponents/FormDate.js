import React from 'react'

// import Mui
import Box from '@mui/material/Box'
import DatePicker from '@mui/lab/DatePicker'
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import MobileDatePicker from '@mui/lab/MobileDatePicker'
import LocalizationProvider from '@mui/lab/LocalizationProvider'

// import hooks
import { useState } from 'react'

function FormDate({ onChange, value, label, disabled }) {
  return (
    <Box>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label={label}
          value={value}
          onChange={onChange}
          renderInput={params => <TextField fullWidth {...params} />}
          disabled={disabled}
        />
      </LocalizationProvider>
    </Box>
  )
}

export default FormDate
