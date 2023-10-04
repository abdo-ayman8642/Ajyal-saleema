import React, { useEffect, useState } from 'react'

/** Mui imports  */

import Grid from '@mui/material/Grid'
import SessionsList from 'src/views/apps/sessions/Table'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import Loading from 'src/views/sharedComponents/Loading'
import { deleteMultiSessions, deleteSession, fetchData } from 'src/store/apps/sessions/actions'
import TableHeader from 'src/views/sharedComponents/TableHeader'
import ConfirmDialog from 'src/views/sharedComponents/ConfirmDialog'
import SidebarAddUSession from 'src/views/apps/sessions/AddDrawer'
import { CircularProgress } from '@mui/material'
import { useAuth } from 'src/hooks/useAuth'

function Sessions() {
  /** states and variables */
  const dispatch = useDispatch()
  const sessions = useSelector(state => state.sessions?.data.data)
  const loading = useSelector(state => state.sessions?.dataLoading)
  const [showAddForm, setShowAddForm] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const selectedSession = useSelector(state => state.sessions?.selectedSession)

  const user = useAuth()
  const role = user?.user?.role
  const { sessions: sessionsPer } = user?.user?.permissions || {}
  const { read, add, edit } = sessionsPer
  const deletee = sessionsPer?.['delete']
  console.log(read)

  const formInputs = [
    {
      name: 'name',
      label: 'إسم المحاضرة',
      type: 'text'
    }

    // {
    //   name: 'type',
    //   label: 'النوع',
    //   type: 'select',
    //   options: [
    //     {
    //       value: 'camp',
    //       label: 'كامب'
    //     },
    //     {
    //       value: 'school',
    //       label: 'مدرسة'
    //     }
    //   ]
    // },
    // {
    //   name: 'date',
    //   label: 'Date',
    //   type: 'date'
    // }
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
      {role != 2 ? (
        <>
          <TableHeader
            toggleAdd={toggleAddForm}
            toggleConfirm={toggleConfirm}
            placeholder={'الحصص'}
            dataType={'sessions'}
            selected={selectedSession}
          />
          {read ?? <SessionsList formInputs={formInputs} toggleConfirm={toggleConfirm} />}
          {!read && <h1 style={{ textAlign: 'center' }}>Don't Have Permission</h1>}

          {showAddForm && <SidebarAddUSession open={showAddForm} toggle={toggleAddForm} formInputs={formInputs} />}
          {showConfirm && (
            <ConfirmDialog
              open={showConfirm}
              toggle={toggleConfirm}
              loading={loading}
              confirmationType={'المحاضرة'}
              selected={selectedSession}
              deleteMulti={deleteMultiSessions}
              deleteSingle={deleteSession}
            />
          )}
        </>
      ) : (
        <h1 style={{ textAlign: 'center' }}>Don't Have Permission</h1>
      )}
    </Grid>
  )
}

export default Sessions
