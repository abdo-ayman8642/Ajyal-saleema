import React, { useMemo, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

// ** MUI Imports

import Box from '@mui/material/Box'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import { useSelector, useDispatch } from 'react-redux'
import { resetFromIndexToLast, setField, setCurrentInput } from 'src/store/apps/attendance'

function Selectors() {
  const dispatch = useDispatch()
  const data = useSelector(state => state.attendance.formData)
  useEffect(() => {
    fetchOptionItem()
  }, [])
  const tagKeys = data.map(_ => useMemo(() => uuidv4(), []))

  const handleSelected = async (e, index, item) => {
    if (index === data.length - 1) return

    const value = e.target.value
    dispatch(setCurrentInput({ value: [value[0], item.endpoint] }))
    const valueRet = await openNextAndResetBelow(index, value)
    await fetchOptionItem(index + 1, true, valueRet)
  }

  const fetchOptionItem = async (index = 0, openNext = false, val) => {
    const identifier = { 0: 'years', 1: 'cities', 2: 'departs', 4: 'grades', 3: 'schools', 5: 'classes' }
    let path
    switch (index) {
      case 0: //year =>  api/years
        path = `https://edu.kyanlabs.com/edu/api/${identifier[index]}`
        break

      case 1: //city => api/cities
        path = `https://edu.kyanlabs.com/edu/api/${identifier[index]}`
        break

      case 2: // department => api/departs/{year id}/city/{city_id}
        path = `https://edu.kyanlabs.com/edu/api/${identifier[index]}/year/${data[0].currValue[0]}/city/${val[0]}`
        break

      case 4: //grade => api/grades
        path = `https://edu.kyanlabs.com/edu/api/${identifier[index]}`
        break

      case 3: //schools => api/schools/{department id}
        path = `https://edu.kyanlabs.com/edu/api/${identifier[index]}/depart/${val[0]}?type=school`
        break

      case 5: //classes => api/classes/school/{school_id}/grade/{grade_id}
        path = `https://edu.kyanlabs.com/edu/api/${identifier[index]}/school/${val[0]}/grade/${data[3].currValue[0]}?type=school`

      default:
        console.log('notfound')
        break
    }
    try {
      console.log('path: ' + path)
      const response = await fetch(path)
      const jsonData = await response.json()
      console.log(jsonData)
      const itemArray = jsonData.data ? jsonData.data.map(data => [data.id, data.name]) : []

      dispatch(setField({ index: index, field: 'items', value: itemArray }))
    } catch (error) {
      console.error('Error fetching data', error)
    }
  }

  const openNextAndResetBelow = async (currIndex, valuePassed) => {
    dispatch(setField({ index: currIndex, field: 'currValue', value: valuePassed }))
    dispatch(resetFromIndexToLast({ index: currIndex + 1 }))
    dispatch(setField({ index: currIndex + 1, field: 'disabledAtt', value: false }))
    return valuePassed
  }
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {data.map((item, index) => (
        <FormControl disabled={item.disabledAtt} sx={{ padding: '10px 0' }} key={tagKeys[index]}>
          <InputLabel id='demo-simple-select-helper-label'>{item.fieldName}</InputLabel>
          <Select
            label={item.fieldName}
            defaultValue=''
            id='demo-simple-select-helper'
            labelId='demo-simple-select-helper-label'
            onChange={e => handleSelected(e, index, item)}
          >
            {/* <MenuItem value=''>
              <em>None</em>
            </MenuItem> */}
            {item.items.map(i => (
              <MenuItem key={uuidv4()} value={i} id={index}>
                {i[1]}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{item.helperText}</FormHelperText>
        </FormControl>
      ))}
    </Box>
  )
}

export default Selectors
