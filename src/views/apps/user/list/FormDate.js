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

function FormDate({ onChange,value }) {
    const [basicPicker, setBasicPicker] = useState(new Date())

  return (
    <Box >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
            label='Birth date'
            value={value}
            onChange={onChange}
            renderInput={params => <TextField fullWidth {...params} />}
            />
        </LocalizationProvider>
      </Box>
  )
}

export default FormDate