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
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'

// ** Icons Imports
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'
import { handleSelectedUser } from 'src/store/apps/user'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import { CircularProgress, Tooltip } from '@mui/material'
import Permissions from './Permissions'

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
        {row.role === 'volunteer' ? (
          <VolunteerActivismIcon />
        ) : row.role === 'superadmin' ? (
          <AdminPanelSettingsIcon />
        ) : (
          <SupervisorAccountIcon />
        )}
      </CustomAvatar>
    )
  }
}

const UserList = ({ handlePageChange, toggleDialog, toggleEditForm, toggleAcl, dataType, role }) => {
  // stats and variables
  const dispatch = useDispatch()
  const [pageSize, setPageSize] = useState(10)
  const currPage = useSelector(state => state.user?.data?.data.current_page)
  const users = useSelector(state => state.user?.data?.data?.data)
  const searchedUsers = useSelector(state => state.user?.searchedUsers?.data?.data)
  const loading = useSelector(state => state.user?.searchedUsersLoading)

  const renderAge = type => {
    if (type !== 'user')
      return {
        flex: 0,
        minWidth: 140,
        field: 'age',
        headerName: 'السن',
        renderCell: ({ row }) => {
          return <Typography>{row.age}</Typography>
        }
      }

    return {}
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
              <Typography
                noWrap
                component='a'
                variant='subtitle2'
                sx={{ color: 'text.primary', textDecoration: 'none' }}
              >
                {name}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.25,
      field: 'email',
      minWidth: 250,
      headerName: 'البريد الإلكتروني',
      renderCell: ({ row }) => {
        return (
          <Typography variant='body2' noWrap>
            {row.email}
          </Typography>
        )
      }
    },
    {
      flex: 0.3,
      minWidth: 150,
      headerName: 'رقم الهاتف',
      field: 'phone',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap variant='subtitle1' sx={{ textTransform: 'capitalize' }}>
            <a href={`tel: ${row.phone}`}>{row.phone}</a>
          </Typography>
        )
      }
    },
    {
      flex: 0,
      field: 'role',
      minWidth: 175,
      headerName: 'الوظيفة',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {row.role === '0' ? 'مسئول مميز' : row.role === '1' ? 'مسئول' : 'متطوع'}
            </Typography>
          </Box>
        )
      }
    },
    renderAge(dataType)
  ]

  // ** add actions to default row
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
          {!role && (
            <Tooltip title='Icon A'>
              <IconButton
                onClick={() => {
                  toggleAcl()
                }}
              >
                <ManageAccountsIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      )
    }
  ]

  // ** Functions

  const onClickEdit = row => {
    toggleEditForm()
    dispatch(handleSelectedUser(row))
  }

  const onClickDelete = row => {
    dispatch(handleSelectedUser(row.id))
    toggleDialog()
  }

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])

  const handleDelete = selected => {
    dispatch(handleSelectedUser([...selected]))
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <DataGrid
            page={currPage - 1}
            autoHeight
            rows={searchedUsers || users}
            checkboxSelection={dataType !== 'user'}
            pageSize={pageSize}
            disableSelectionOnClick
            columns={columns}
            onSelectionModelChange={selected => handleDelete(selected)}
            loading={loading}
            // rowsPerPageOptions={[10, 25, 50]}

            onPageSizeChange={newPageSize => handlePageChange(newPageSize + 1)}
            sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
          />
        </Card>
      </Grid>
    </Grid>
  )
}

export default UserList
