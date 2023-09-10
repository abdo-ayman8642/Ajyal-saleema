import React, { useState } from 'react'

// ** MUI Imports
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import { useSelector, useDispatch } from 'react-redux'
import { handleCheckBoxes } from 'src/store/apps/attendance'

function Checkboxes() {
  const dispatch = useDispatch()
  const checkBoxesNums = useSelector(state => state.attendance.checkBoxesNumber)
  const checkBoxesState = useSelector(state => state.attendance.checkBoxesState)
  const handleCheckboxChange = (id, e) => {
    dispatch(handleCheckBoxes({ id: id, value: e.target.checked }))
  }
  return (
    <FormGroup row sx={{ display: 'flex', justifyContent: 'center' }}>
      {[...Array(checkBoxesNums).keys()].map(i => (
        <FormControlLabel
          value='top'
          label={i + 1}
          key={i + 1}
          labelPlacement='top'
          control={<Checkbox onChange={e => handleCheckboxChange(i + 1, e)} />}
        />
      ))}
    </FormGroup>
  )
}

export default Checkboxes
