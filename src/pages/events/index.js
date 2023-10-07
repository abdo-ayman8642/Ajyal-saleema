import React, { useEffect, useState } from 'react'

/** Mui imports  */

import Grid from '@mui/material/Grid'
import EventList from 'src/views/apps/events/Table'
import { useDispatch, useSelector } from 'react-redux'
import { deleteMultiEvents, deleteEvent, fetchData } from 'src/store/apps/events/actions'
import TableHeader from 'src/views/sharedComponents/TableHeader'
import ConfirmDialog from 'src/views/sharedComponents/ConfirmDialog'
import SidebarAddEvent from 'src/views/apps/events/AddDrawer'
import { CircularProgress } from '@mui/material'
import { useAuth } from 'src/hooks/useAuth'
import PageHeader from 'src/views/apps/academicYear/PageHeader'

function Events() {
  /** states and variables */
  const dispatch = useDispatch()
  const events = useSelector(state => state.events?.data.data)
  const loading = useSelector(state => state.events?.dataLoading)
  const [showAddForm, setShowAddForm] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const selectedEvents = useSelector(state => state.events?.selectedEvents)

  const user = useAuth()

  const { year } = user?.user?.permissions
  const { add, edit, delete: deletee, read } = year

  const formInputs = [
    {
      name: 'name',
      label: 'إسم الحدث',
      type: 'text'
    },

    {
      name: 'date_from',
      label: 'Date From',
      type: 'date'
    },
    {
      name: 'date_to',
      label: 'Date To',
      type: 'date'
    }
  ]

  useEffect(() => {
    dispatch(fetchData())
  }, [dispatch])

  /** Functions */
  const toggleAddForm = () => {
    setShowAddForm(!showAddForm)
  }

  const toggleConfirm = () => {
    setShowConfirm(!showConfirm)
  }

  if (loading) {
    return (
      <Grid container sx={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Grid item>
          <CircularProgress />
        </Grid>
      </Grid>
    )
  }

  return (
    <Grid container direction='column'>
      <Grid item xs={12} md={12}>
        <PageHeader src={'/images/govs.jpg'} />
      </Grid>
      {add ?? (
        <TableHeader
          toggleAdd={toggleAddForm}
          toggleConfirm={toggleConfirm}
          placeholder={'حدث'}
          dataType={'events'}
          selected={selectedEvents || events}
          searchdata={{ page: 1, query: '', searched: 'events' }}
        />
      )}

      {read ? (
        <EventList formInputs={formInputs} toggleConfirm={toggleConfirm} />
      ) : (
        <h1 style={{ textAlign: 'center' }}>Don't Have Permission</h1>
      )}
      {showAddForm && <SidebarAddEvent open={showAddForm} toggle={toggleAddForm} formInputs={formInputs} />}
      {showConfirm && (
        <ConfirmDialog
          open={showConfirm}
          toggle={toggleConfirm}
          loading={loading}
          confirmationType={'المحاضرة'}
          selected={selectedEvents || events}
          deleteMulti={deleteMultiEvents}
          deleteSingle={deleteEvent}
        />
      )}
    </Grid>
  )
}

export default Events
