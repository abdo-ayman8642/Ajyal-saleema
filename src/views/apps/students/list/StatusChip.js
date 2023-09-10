import React from 'react'

// mui imports
import { Box } from '@mui/material'
import CustomChip from 'src/@core/components/mui/chip'


function StatusChip({ status }) {
  return (
    <Box>
        <CustomChip label = {status? 'متاح': 'غير متاح'} skin='light' color={status? 'success': 'error'} />
    </Box>
  )
}

export default StatusChip