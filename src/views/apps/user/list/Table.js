// ** React Imports
import React, { useEffect, useCallback, useState } from 'react'

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
import { useAuth } from 'src/hooks/useAuth'
// ** Icons Imports
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import Modal from '@mui/material/Modal'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'
import { handleSelectedUser } from 'src/store/apps/user'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import { CircularProgress, Tooltip } from '@mui/material'
import Permissions from './Permissions'
import PermissionsV2 from './permissions-v2'

// ** Styled component for the link for the avatar with image
const AvatarWithImageLink = styled(Link)(({ theme }) => ({
  marginRight: theme.spacing(3)
}))

// ** Styled component for the link for the avatar without image
const AvatarWithoutImageLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  marginRight: theme.spacing(3)
}))

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '50%',
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: '15px',
  boxShadow: 24,
  p: 4,
  '&:hover': {
    cursor: 'pointer'
  }
}

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

const UserList = ({ handlePageChange, toggleDialog, toggleEditForm, toggleAcl, dataType }) => {
  // stats and variables
  const dispatch = useDispatch()
  const [pageSize, setPageSize] = useState(10)
  const currPage = useSelector(state => state.user?.data?.data.current_page)
  const users = useSelector(state => state.user?.data?.data?.data)
  const searchedUsers = useSelector(state => state.user?.searchedUsers?.data?.data)
  const loading = useSelector(state => state.user?.searchedUsersLoading)
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [currentUser, setCurrentUser] = useState(null)

  const user = useAuth()
  const role = user?.user?.role

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    function handleResize() {
      // Check if the window width is less than a certain threshold (e.g., 768 pixels for mobile)
      const isMobile = window.innerWidth < 768
      setIsMobile(isMobile)
    }

    // Attach the event listener when the component mounts
    window.addEventListener('resize', handleResize)

    // Call it initially to set the initial value
    handleResize()

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  console.log('Is mobile ? ', isMobile)

  const renderAge = type => {
    if (type !== 'user')
      return {
        flex: 1,
        minWidth: 100,
        field: 'age',
        headerName: 'السن',
        renderCell: ({ row }) => {
          return <Typography>{row.age}</Typography>
        }
      }

    return {}
  }

  const renderEmail = () => {
    if (!isMobile) {
      return {
        flex: 1,
        field: 'email',
        minWidth: 100,
        headerName: 'البريد الإلكتروني',
        renderCell: ({ row }) => {
          return (
            <Typography variant='body2' noWrap>
              {row.email}
            </Typography>
          )
        }
      }
    }

    return {}
  }

  const renderPhone = () => {
    if (!isMobile) {
      return {
        flex: 1,
        minWidth: 100,
        headerName: 'رقم الهاتف',
        field: 'phone',
        renderCell: ({ row }) => {
          return (
            <Typography noWrap variant='subtitle1' sx={{ textTransform: 'capitalize' }}>
              <a href={`tel: ${row.phone}`}>{row.phone}</a>
            </Typography>
          )
        }
      }
    }

    return {}
  }

  const defaultColumns = [
    {
      flex: 1,
      minWidth: 100,
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

    renderEmail(),
    renderPhone(),
    {
      flex: 1,
      field: 'role',
      minWidth: 100,
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
      flex: 1,
      minWidth: 100,
      sortable: false,
      field: 'actions',
      headerName: 'التحكم',
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', gap: '10px', ml: '-15px' }}>
          {role === '1' ||
            (role === '0' && (
              <>
                <IconButton sx={{ cursor: 'pointer', color: '#ddbb24' }} onClick={() => onClickEdit(row)}>
                  <ModeEditOutlineIcon />
                </IconButton>
                {role === '0' && (
                  <>
                    <IconButton
                      sx={{ cursor: 'pointer', color: 'red' }}
                      onClick={() => {
                        onClickDelete(row)
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>

                    <Tooltip title='Modify Permissions'>
                      <IconButton
                        onClick={() => {
                          handleOpen()
                          setCurrentUser(row)
                        }}
                      >
                        <ManageAccountsIcon />
                      </IconButton>
                    </Tooltip>
                  </>
                )}
              </>
            ))}
        </Box>
      )
    }
  ]

  function isObjectEmpty(obj) {
    return Object.keys(obj).length === 0
  }

  columns = columns.filter(obj => !isObjectEmpty(obj))

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
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <PermissionsV2 user={currentUser} />
          </Box>
        </Modal>
      </div>
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
