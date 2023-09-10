// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { InputAdornment } from '@mui/material'
import { Magnify } from 'mdi-material-ui'

// ** Icons Imports
import ExportVariant from 'mdi-material-ui/ExportVariant'

// hooks imports
import { useSelector } from 'react-redux'

const TableHeader = ({ handleFilter, toggleAddForm, value, palceholder, toggleDialog }) => {
  // ** Props
  
  const selectedUser = useSelector(state => state.user.selectedUser)



  return (
    <Box sx={{ pb: 3, mt: 5, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box>
        <Button sx={{ mr: 4, mb: 2 }} color='secondary' variant='outlined' startIcon={<ExportVariant fontSize='small' />}>
          Export
        </Button>
        <Button sx={{ mr: 4, mb: 2 }} color='secondary' variant='outlined' startIcon={<ExportVariant fontSize='small' />}>
          import
        </Button>
        {selectedUser?.length > 1 && 
          (
            <Button sx={{ mb: 2, fontSize: '1rem', fontWeight: 'bold' }} variant='contained' onClick={toggleDialog}>
              ازالة الكل
            </Button>
          )
        }
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          size='small'
          value={value}
          sx={{ mr: 6, mb: 2 }}
          placeholder={`ابحث ${palceholder || ""}`}
          onChange={e => handleFilter(e)}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Magnify />
              </InputAdornment>
            )
          }}
        />

        <Button sx={{ mb: 2, fontSize: '1rem', fontWeight: 'bold' }} variant='contained' onClick={toggleAddForm} >
          إضافة
        </Button>
      </Box>
    </Box>
  )
}

export default TableHeader
