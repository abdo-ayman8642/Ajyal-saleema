import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { InputAdornment } from '@mui/material'
import { ExportVariant, Magnify } from 'mdi-material-ui'
import { useDispatch } from 'react-redux'
import { useDebounce } from 'src/hooks/useDepounce'
import { searchData } from 'src/store/apps/academicData/actions'
import { handleSearched, handleSearchedQuery, resetSearchedData } from 'src/store/apps/academicData'
import { fetchData } from 'src/store/apps/events/actions'
import { useAuth } from 'src/hooks/useAuth'

function TableHeader({
  toggleAdd,
  toggleConfirm,
  placeholder,
  dataType,
  toggleImpExp,
  selected,
  searchdata,
  impExp,
  permissions
}) {
  const data = useSelector(state => state[dataType]?.data)
  const session_limit = data?.data?.length
  const dispatch = useDispatch()
  const [searchVal, setSearchVal] = useState('')
  const { page, query, searched } = searchdata || {}
  const { add } = permissions || { add: true }
  const user = useAuth()
  const role = user?.user?.role

  const handleSearch = value => {
    if (!value) {
      dispatch(resetSearchedData())
      dispatch(fetchData(1))
    } else {
      dispatch(searchData({ page, query: value, searched }))
    }
  }

  const debouncedSearch = useDebounce(handleSearch, 500)

  const handleInputChange = e => {
    const value = e.target.value
    dispatch(handleSearchedQuery(value))
    setSearchVal(value)
    debouncedSearch(value)
  }

  return (
    <Box
      sx={{
        pb: 3,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Box sx={{ display: 'flex' }}>
        {impExp && (
          <>
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
          </>
        )}

        {/* {dataType !== 'user' && selected?.length > 1 && (
          <Button sx={{ mb: 2, fontSize: '1rem', fontWeight: 'bold' }} onClick={toggleConfirm} variant='contained'>
            مسح الكل
          </Button>
        )} */}
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        {/* {dataType !== 'sessions' && dataType !== 'user' && (
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
        )} */}

        {!!add && (
          <Button
            sx={{ mb: 2, fontSize: '1rem', fontWeight: 'bold' }}
            onClick={toggleAdd}
            variant='contained'
            disabled={session_limit >= 12}
          >
            إضافة
          </Button>
        )}
      </Box>
    </Box>
  )
}

export default TableHeader
