// ** React Imports
import { useEffect, useCallback, useState, useRef } from 'react'

// ** Next Images
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { DataGrid } from '@mui/x-data-grid'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline'
import { Button } from '@mui/material'

// ** Icons Imports
import DeleteIcon from '@mui/icons-material/Delete'
import SchoolIcon from '@mui/icons-material/School'
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl'

// ** redux Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports

import CustomAvatar from 'src/@core/components/mui/avatar'
import EditForm from 'src/views/sharedComponents/EditForm'
import { handleSelectedEvents } from 'src/store/apps/events'
import { useAuth } from 'src/hooks/useAuth'

// ** Utils Import

// ** Styled component for the link for the avatar with image
const AvatarWithImageLink = styled(Link)(({ theme }) => ({
  marginRight: theme.spacing(3)
}))

// ** Styled component for the link for the avatar without image
const AvatarWithoutImageLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  marginRight: theme.spacing(3)
}))

// ** renders client column
const renderClient = row => {
  return (
    // <AvatarWithoutImageLink href={`/apps/user/view/${row.id}`}>

    <CustomAvatar skin='light' color={row.avatarColor} sx={{ mr: 3, width: 34, height: 34, fontSize: '1rem' }}>
      <ChecklistRtlIcon />
    </CustomAvatar>

    // </AvatarWithoutImageLink>
  )
}

const defaultColumns = [
  {
    flex: 1,
    minWidth: 100,
    field: 'name',
    headerName: 'الأحداث',
    renderCell: ({ row }) => {
      const { id, name } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(row)}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Typography noWrap component='a' variant='subtitle2' sx={{ color: 'text.primary', textDecoration: 'none' }}>
              {name}
            </Typography>
          </Box>
        </Box>
      )
    }
  }
]

const EventList = ({ formInputs, toggleConfirm }) => {
  // ********* States & variables *******************/
  const [pageSize, setPageSize] = useState(10)
  const dispatch = useDispatch()
  const events = useSelector(state => state.events?.data.data)
  const selectedEvents = useSelector(state => state.events?.selectedEvents)
  const [showEdit, setShowEdit] = useState(false)
  const user = useAuth()

  const { events: event } = user?.user?.permissions
  const { add, edit, delete: deletee, read } = event

  const renderColumns = () => {
    if (edit || deletee) {
      return {
        flex: 0.8,
        minWidth: 100,
        sortable: false,
        field: 'actions',
        headerName: 'التحكم',
        renderCell: ({ row }) => (
          <Box sx={{ display: 'flex' }}>
            {edit && (
              <IconButton onClick={() => onClickEdit(row)} sx={{ ml: '-10px' }}>
                <ModeEditOutlineIcon sx={{ cursor: 'pointer', color: '#ddbb24' }} />
              </IconButton>
            )}
            {deletee && (
              <IconButton onClick={() => onClickDelete(row)}>
                <DeleteIcon sx={{ cursor: 'pointer', color: 'red' }} />
              </IconButton>
            )}
          </Box>
        )
      }
    }
    return {}
  }
  /****************** columns Actions *****************/

  const columns = [...defaultColumns, renderColumns()]

  /****************** Functions *****************/

  const onClickEdit = row => {
    toggleShowEdit()
    dispatch(handleSelectedEvents(row))
  }

  const onClickDelete = row => {
    dispatch(handleSelectedEvents(row))
    toggleConfirm()
  }

  const handleDelete = selected => {
    dispatch(handleSelectedEvents([...selected]))
  }

  const toggleShowEdit = () => {
    setShowEdit(!showEdit)
  }

  function isObjectEmpty(obj) {
    return Object.keys(obj).length === 0
  }

  columns = columns.filter(obj => !isObjectEmpty(obj))

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <DataGrid
            autoHeight
            rows={events?.data || selectedEvents?.data || []}
            checkboxSelection={false}
            pageSize={pageSize}
            disableSelectionOnClick
            columns={columns}
            onSelectionModelChange={selected => handleDelete(selected)}
            rowsPerPageOptions={[10, 25, 50]}
            onPageSizeChange={newPageSize => setPageSize(newPageSize)}
            sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
          />
        </Card>
      </Grid>
      {/* {showEdit && <DialogEditSessionInfo formInputs={formInputs} toggle={toggleShowEdit} showEdit={showEdit} />} */}
    </Grid>
  )
}

export default EventList
