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
import { handleSelectedSession } from 'src/store/apps/sessions'
import DialogEditSessionInfo from './DialogEditSession'
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

const defaultColumns = [
  {
    flex: 0.3,
    minWidth: 50,
    field: 'id',
    headerName: 'رقم',
    renderCell: ({ row }) => {
      const { id } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Typography noWrap component='a' variant='subtitle2' sx={{ color: 'text.primary', textDecoration: 'none' }}>
              {id}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 1,
    minWidth: 100,
    field: 'name',
    headerName: 'المحاضرة',
    renderCell: ({ row }) => {
      const { id, name } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
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

const SessionsList = ({ formInputs, toggleConfirm }) => {
  // ********* States & variables *******************/
  const [pageSize, setPageSize] = useState(12)
  const dispatch = useDispatch()
  const sessions = useSelector(state => state.sessions?.data?.data)
  const selectedSession = useSelector(state => state.sessions?.selectedSession)
  const [showEdit, setShowEdit] = useState(false)

  const user = useAuth()
  const { sessions: sessionsPer } = user?.user?.permissions
  const { read, add, edit } = sessionsPer

  // console.log(
  //   sessions.map((session, index) => {
  //     return { ...session, name: `${index + 1}: ${session.name}` }
  //   })
  // )

  /****************** columns Actions *****************/
  const columns = [
    ...defaultColumns,
    {
      flex: 0.3,
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

          {/* <IconButton onClick={() => onClickDelete(row)}>
            <DeleteIcon sx={{ cursor: 'pointer', color: 'red' }} />
          </IconButton> */}
        </Box>
      )
    }
  ]

  /****************** Functions *****************/

  const onClickEdit = row => {
    toggleShowEdit()
    dispatch(handleSelectedSession(row))
  }

  const onClickDelete = row => {
    dispatch(handleSelectedSession(row))
    toggleConfirm()
  }

  const handleDelete = selected => {
    dispatch(handleSelectedSession([...selected]))
  }

  const toggleShowEdit = () => {
    setShowEdit(!showEdit)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <DataGrid
            autoHeight
            rows={sessions || []}
            checkboxSelection
            pageSize={pageSize}
            disableSelectionOnClick
            checkboxSelection={false}
            columns={columns}
            onSelectionModelChange={selected => handleDelete(selected)}
            hideFooterPagination={true}
            sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
          />
        </Card>
      </Grid>
      {showEdit && <DialogEditSessionInfo formInputs={formInputs} toggle={toggleShowEdit} showEdit={showEdit} />}
    </Grid>
  )
}

export default SessionsList
