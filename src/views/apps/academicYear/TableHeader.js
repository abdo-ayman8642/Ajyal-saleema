import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { InputAdornment, TextField, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import SimpleAddDrawer from './SimpleAddDrawer'
import { handleActions } from 'src/helperFunctions/academicDataActions'
import { academicDataInputs } from 'src/helperFunctions/AcademicDataInputs'
import { Magnify } from 'mdi-material-ui'
import { useDebounce } from 'src/hooks/useDepounce'
import { resetSearchedStudents } from 'src/store/apps/student'
import { handleSearched, handleSearchedQuery, resetSearchedData } from 'src/store/apps/academicData'
import { searchData } from 'src/store/apps/academicData/actions'

function TableHeader({ title, formType, showDrawer, setDrawer, addData, placeholder, fetchData, fetchParams }) {
  const dispatch = useDispatch()
  const formInputs = academicDataInputs(formType)
  const action = handleActions('add', formType)
  const [searchVal, setSearchVal] = useState('')

  const toggle = () => {
    setDrawer(!showDrawer)
  }

  const handleSearch = value => {
    if (!value || value === '') {
      dispatch(resetSearchedData())
      dispatch(fetchData(fetchParams))
    } else {
      dispatch(
        searchData({
          page: 1,
          searched: formType === 'govs' ? 'cities' : formType === 'administrations' ? 'departs' : formType,
          query: value
        })
      )
    }
  }

  const debouncedSearch = useDebounce(handleSearch, 500)

  const handleInputChange = e => {
    const value = e.target.value
    console.log(value)
    dispatch(handleSearchedQuery(value))
    setSearchVal(value)
    debouncedSearch(value)
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bg: '#fff',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
        borderRadius: '10px',
        padding: '1rem',
        mb: 5
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <Typography variant='h4' sx={{ fontWeight: 'bold', color: '#3F51B5' }}>
          {title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <TextField
            size='small'
            value={searchVal}
            sx={{ mr: 6, mb: 2 }}
            placeholder={`ابحث عن ${placeholder || ''}`}
            onChange={handleInputChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Magnify />
                </InputAdornment>
              )
            }}
          />

          <Button sx={{ mb: 2, fontSize: '1rem', fontWeight: 'bold' }} onClick={toggle} variant='contained'>
            إضافة
          </Button>
        </Box>
      </Box>
      {showDrawer && (
        <SimpleAddDrawer
          open={showDrawer}
          toggle={toggle}
          formInputs={formInputs}
          action={action}
          addData={addData}
          formType={formType}
        />
      )}
    </Box>
  )
}

export default TableHeader
