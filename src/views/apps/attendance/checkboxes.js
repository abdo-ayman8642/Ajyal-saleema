import React, { useState, useEffect } from 'react'

// ** MUI Imports
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import { useSelector, useDispatch } from 'react-redux'
import { handleCheckBoxes } from 'src/store/apps/attendance'
import { deleteMultiSessions, deleteSession, fetchData } from 'src/store/apps/sessions/actions'
import { Tooltip } from '@mui/material'

function Checkboxes() {
  const dispatch = useDispatch()
  const sessions = useSelector(state => state.sessions?.data.data)
  const list = useSelector(state => state?.attendance?.sessionsList)
  const checkBoxesState = useSelector(state => state?.attendance?.checkBoxesState)
  const handleCheckboxChange = (id, session_id, e) => {
    dispatch(handleCheckBoxes({ id, value: e.target.checked, session_id }))
  }
  useEffect(() => {
    dispatch(fetchData())
  }, [dispatch])
  console.log(sessions)
  console.log(checkBoxesState)
  console.log(list)
  return (
    <FormGroup row sx={{ display: 'flex', justifyContent: 'center' }}>
      {sessions?.map((session, index) => (
        <FormControlLabel
          value='top'
          label={index + 1}
          key={index + 1}
          labelPlacement='top'
          control={
            <Tooltip title={session.name}>
              <Checkbox onChange={e => handleCheckboxChange(index + 1, session.id, e)} />
            </Tooltip>
          }
        />
      ))}
    </FormGroup>
  )
}

export default Checkboxes
