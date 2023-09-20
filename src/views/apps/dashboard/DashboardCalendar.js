import React from 'react'
import CalendarWrapper from 'src/@core/styles/libs/fullcalendar'
import Calendar from '../calendar/Calendar'
import { useSettings } from 'src/@core/hooks/useSettings'
import { Box, useMediaQuery } from '@mui/material'

function DashboardCalendar({ data }) {
  const { skin } = useSettings
  const mdAbove = useMediaQuery(theme => theme.breakpoints.up('md'))

  const calendarsColor = {
    Available: 'success',
    Unavailable: 'error'
  }

  const events = data?.map(ev => {
    return {
      title: ev.name,
      date: ev.date,
      className: 'styles'
    }
  })
  console.log(events)

  return (
    <CalendarWrapper>
      <Box
        sx={{
          pb: 5,
          px: 5,
          pt: 2.25,
          flexGrow: 1,
          borderRadius: 1,
          boxShadow: 'none',
          backgroundColor: 'background.paper',
          ...(mdAbove ? { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 } : {})
        }}
      >
        <Calendar store={{ events }} calendarsColor={calendarsColor} direction={'rtl'} />
      </Box>
    </CalendarWrapper>
  )
}

export default DashboardCalendar
