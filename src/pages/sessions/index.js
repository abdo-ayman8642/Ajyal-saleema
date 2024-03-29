import React, { useEffect, useState } from 'react'

/** Mui imports  */

import Grid from '@mui/material/Grid'
import SessionsList from 'src/views/apps/sessions/Table'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { deleteMultiSessions, deleteSession, fetchData } from 'src/store/apps/sessions/actions'
import TableHeader from 'src/views/sharedComponents/TableHeader'
import ConfirmDialog from 'src/views/sharedComponents/ConfirmDialog'
import SidebarAddUSession from 'src/views/apps/sessions/AddDrawer'
import { CircularProgress } from '@mui/material'
import { useAuth } from 'src/hooks/useAuth'
import NoPermissionComponent from 'src/views/apps/permissions/noAccess'

function Sessions() {
  /** states and variables */
  const dispatch = useDispatch()
  const loading = useSelector(state => state.sessions?.dataLoading)
  const [showAddForm, setShowAddForm] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const selectedSession = useSelector(state => state.sessions?.selectedSession)

  const user = useAuth()
  const { read, add } = user?.user?.permissions?.sessions || {}
  const { sessions: view } = user?.user?.permissions?.nav || {}

  const formInputs = [
    {
      name: 'name',
      label: 'إسم المحاضرة',
      type: 'text'
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
      {read && view ? (
        <>
          {add && (
            <TableHeader
              toggleAdd={toggleAddForm}
              toggleConfirm={toggleConfirm}
              placeholder={'الحصص'}
              dataType={'sessions'}
              selected={selectedSession}
            />
          )}

          <SessionsList formInputs={formInputs} toggleConfirm={toggleConfirm} />
        </>
      ) : (
        <NoPermissionComponent featureName='Sessions' />
      )}

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
    </Grid>
  )
}

export default Sessions
