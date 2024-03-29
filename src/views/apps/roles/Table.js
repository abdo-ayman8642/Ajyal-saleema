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

// ** Icons Imports
import Laptop from 'mdi-material-ui/Laptop'
import ChartDonut from 'mdi-material-ui/ChartDonut'
import CogOutline from 'mdi-material-ui/CogOutline'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import PencilOutline from 'mdi-material-ui/PencilOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports
import { fetchData } from 'src/store/apps/user'

// ** Custom Components Imports
import TableHeader from 'src/views/apps/user/list/TableHeader'

// ** Vars
const userRoleObj = {
  volunteer: <Laptop sx={{ mr: 2, color: 'error.main' }} />,
  admin: <CogOutline sx={{ mr: 2, color: 'warning.main' }} />,
  editor: <PencilOutline sx={{ mr: 2, color: 'info.main' }} />,
  maintainer: <ChartDonut sx={{ mr: 2, color: 'success.main' }} />,
  subscriber: <AccountOutline sx={{ mr: 2, color: 'primary.main' }} />
}

const userStatusObj = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}

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
    return (
      <AvatarWithImageLink href={`/apps/user/view/${row.id}`}>
        <CustomAvatar src={row.avatar} sx={{ mr: 3, width: 34, height: 34 }} />
      </AvatarWithImageLink>
    )
  } else {
    return (
      <AvatarWithoutImageLink href={`/apps/user/view/${row.id}`}>
        <CustomAvatar skin='light' color={row.avatarColor} sx={{ mr: 3, width: 34, height: 34, fontSize: '1rem' }}>
          {getInitials(row.fullName ? row.fullName : 'John Doe')}
        </CustomAvatar>
      </AvatarWithoutImageLink>
    )
  }
}

const customColumns = (tr) => {
  const defaultColumns = [
    {
      flex: 0.25,
      minWidth: 230,
      field: 'fullName',
      headerName: 'الإسم',
      renderCell: ({ row }) => {
        const { id, fullName, username } = row
  
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderClient(row)}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Link href={`/apps/user/view/${id}`} passHref>
                <Typography
                  noWrap
                  component='a'
                  variant='subtitle2'
                  sx={{ color: 'text.primary', textDecoration: 'none' }}
                >
                  {fullName}
                </Typography>
              </Link>
              <Link href={`/apps/user/view/${id}`} passHref>
                <Typography noWrap component='a' variant='caption' sx={{ textDecoration: 'none' }}>
                  @{username}
                </Typography>
              </Link>
            </Box>
          </Box>
        )
      }
    },
    // {
    //   flex: 0.25,
    //   field: 'email',
    //   minWidth: 250,
    //   headerName: 'البريد الإلكتروني',
    //   renderCell: ({ row }) => {
    //     return (
    //       <Typography variant='body2' noWrap>
    //         {row.email}
    //       </Typography>
    //     )
    //   }
    // },
    // {
    //   flex: 0,
    //   field: 'role',
    //   minWidth: 175,
    //   headerName: 'الوظيفة',
    //   renderCell: ({ row }) => {
    //     return (
    //       <Box sx={{ display: 'flex', alignItems: 'center' }}>
    //         {userRoleObj.volunteer}
    //         <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
    //           {row.role}
    //         </Typography>
    //       </Box>
    //     )
    //   }
    // },
    // {
    //   flex: 0.3,
    //   minWidth: 150,
    //   headerName: 'رقم الهاتف',
    //   field: 'phone',
    //   renderCell: ({ row }) => {
    //     return (
    //       <Typography noWrap variant='subtitle1' sx={{ textTransform: 'capitalize' }}>
    //         {row.phone}
    //       </Typography>
    //     )
    //   }
    // },
    // {
    //   flex: 0,
    //   minWidth: 140,
    //   field: 'status',
    //   headerName: 'الحالة',
    //   renderCell: ({ row }) => {
    //     return (
    //       <CustomChip
    //         skin='light'
    //         size='small'
    //         label= 'active'
    //         color={userStatusObj.active}
    //         sx={{ textTransform: 'capitalize' }}
    //       />
    //     )
    //   }
    // },
    // {
    //   flex: 0.15,
    //   minWidth: 120,
    //   sortable: false,
    //   field: 'actions',
    //   headerName: 'Actions',
    //   renderCell: ({ row }) => (
    //     <Link href={`/apps/user/view/${row.id}`} passHref>
    //       <IconButton>
    //         <EyeOutline />
    //       </IconButton>
    //     </Link>
    //   )
    // }
  ]

  return defaultColumns
}

const UserList = () => {
  // ** State
  const [plan, setPlan] = useState('')
  const [value, setValue] = useState('')
  const [pageSize, setPageSize] = useState(10)

  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => state.user)

  // useEffect(() => {
  //   dispatch(
  //     fetchData({
  //       role: '',
  //       q: value,
  //       status: '',
  //       currentPlan: plan
  //     })
  //   )
  // }, [dispatch, plan, value])

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])

  const handlePlanChange = useCallback(e => {
    setPlan(e.target.value)
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          
          <DataGrid
            autoHeight
            rows={store.data}
            checkboxSelection
            pageSize={pageSize}
            disableSelectionOnClick
            columns={customColumns()}
            rowsPerPageOptions={[10, 25, 50]}
            onPageSizeChange={newPageSize => setPageSize(newPageSize)}
            sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
          />
        </Card>
      </Grid>
    </Grid>
  )
}

export default UserList
