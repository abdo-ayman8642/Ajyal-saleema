import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { InputAdornment } from '@mui/material'
import { ExportVariant, Magnify } from 'mdi-material-ui'
import * as XLSX from 'xlsx'
import { useDispatch } from 'react-redux'
import { useDebounce } from 'src/hooks/useDepounce'

function TableHeader({
  toggleAdd,
  toggleConfirm,
  placeholder,
  dataType,
  toggleImpExp,
  selected,
  searchData,
  fetchData,
  resetSearched,
  impExp
}) {
  const data = useSelector(state => state[dataType]?.data)
  const dispatch = useDispatch()
  const [searchVal, setSearchVal] = useState('')

  const exportToExcel = data => {
    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data')
    XLSX.writeFile(workbook, 'data.xlsx')
  }

  const handleSearch = value => {
    if (!value) {
      dispatch(resetSearched())
      dispatch(fetchData(1))
    } else {
      dispatch(searchData(value))
    }
  }

  const debouncedSearch = useDebounce(handleSearch, 500)

  const handleInputChange = e => {
    const value = e.target.value
    setSearchVal(value)
    debouncedSearch(value)
  }

  return (
    <Box
      sx={{
        pb: 3,
        mt: 25,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Box sx={{ display: 'flex' }}>
        {impExp && <>
          <Button
          sx={{ mr: 4, mb: 2 }}
          color='secondary'
          variant='outlined'
          startIcon={<ExportVariant fontSize='small' />}
          onClick={toggleImpExp}
        >
          import
        </Button>

       
          <Button
            sx={{ mr: 4, mb: 2 }}
            color='secondary'
            variant='outlined'
            startIcon={<ExportVariant fontSize='small' />}
          >
            export
          </Button>
        </>}
        
        {selected?.length > 1 && (
          <Button sx={{ mb: 2, fontSize: '1rem', fontWeight: 'bold' }} onClick={toggleConfirm} variant='contained'>
            مسح الكل
          </Button>
        )}
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          size='small'
          value={searchVal}
          sx={{ mr: 6, mb: 2 }}
          placeholder={`ابحث ${placeholder || ''}`}
          onChange={handleInputChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Magnify />
              </InputAdornment>
            )
          }}
        />
        <Button sx={{ mb: 2, fontSize: '1rem', fontWeight: 'bold' }} onClick={toggleAdd} variant='contained'>
          إضافة
        </Button>
      </Box>
    </Box>
  )
}

export default TableHeader
