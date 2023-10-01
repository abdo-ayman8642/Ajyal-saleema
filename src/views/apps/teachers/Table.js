// ** React Imports
import { useEffect, useCallback, useState } from 'react'

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
import DeleteIcon from '@mui/icons-material/Delete'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline'

// ** Icons Imports
import AddBoxIcon from '@mui/icons-material/AddBox'
// ** teachers Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import { SchoolOutline } from 'mdi-material-ui'
import { handleSelectedTeacher } from 'src/store/apps/teachers'
import SidebarAddTeacher from './DrawerAdd'

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
  if (row.avatar?.length) {
    return <CustomAvatar src={row.avatar} sx={{ mr: 3, width: 34, height: 34 }} />
  } else {
    return (
      <CustomAvatar skin='light' color={row.avatarColor} sx={{ mr: 3, width: 34, height: 34, fontSize: '1rem' }}>
        <SchoolOutline />
      </CustomAvatar>
    )
  }
}

const defaultColumns = [
  {
    flex: 0.25,
    minWidth: 230,
    field: 'fullName',
    headerName: 'الإسم',
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
  },
  {
    flex: 0.25,
    field: 'gender',
    minWidth: 250,
    headerName: 'الجنس',
    renderCell: ({ row }) => {
      return (
        <Typography variant='body2' noWrap>
          {row.gender}
        </Typography>
      )
    }
  }
]

const TeachersList = ({ toggleAddForm, toggleDialog, toggleEditForm, toggleAssign }) => {
  // stats and variables
  const dispatch = useDispatch()
  const [pageSize, setPageSize] = useState(10)
  const selectedTeacher = useSelector(state => state.selectedTeacher)
  const teachers = useSelector(state => state.teachers?.data?.data)

  // add actions column => edit / delete
  const columns = [
    ...defaultColumns,
    {
      flex: 0.15,
      minWidth: 120,
      sortable: false,
      field: 'actions',
      headerName: 'التحكم',
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', gap: '10px', ml: '-15px' }}>
          <IconButton sx={{ cursor: 'pointer', color: '#ddbb24' }} onClick={() => onClickEdit(row)}>
            <ModeEditOutlineIcon />
          </IconButton>
          <IconButton
            sx={{ cursor: 'pointer', color: 'red' }}
            onClick={() => {
              onClickDelete(row)
            }}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            sx={{ cursor: 'pointer', color: 'green' }}
            onClick={() => {
              onClickAdd(row)
            }}
          >
            <AddBoxIcon />
          </IconButton>
        </Box>
      )
    }
  ]

  // ** Functions

  // handle edit clicked
  const onClickEdit = row => {
    toggleEditForm()
    dispatch(handleSelectedTeacher(row))
  }
  const onClickAdd = row => {
    console.log(row)
    const { id, name } = row
    toggleAssign(id, name)
  }

  // handle Delete user & multi delete
  const onClickDelete = row => {
    dispatch(handleSelectedTeacher(row.id))
    toggleDialog()
  }

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])

  const handleDelete = selected => {
    dispatch(handleSelectedTeacher([...selected]))
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <DataGrid
            autoHeight
            rows={teachers || []}
            checkboxSelection
            pageSize={pageSize}
            disableSelectionOnClick
            columns={columns}
            onSelectionModelChange={selected => handleDelete(selected)}
            onPageSizeChange={newPageSize => setPageSize(newPageSize)}
            sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
          />
        </Card>
      </Grid>
    </Grid>
  )
}

export default TeachersList
