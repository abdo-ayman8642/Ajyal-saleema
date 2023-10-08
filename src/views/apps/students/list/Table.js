// ** React Imports
import { useEffect, useCallback, useState, useRef } from 'react'

// ** Next Images
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { DataGrid, GridOverlay } from '@mui/x-data-grid'
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
import { deleteMultiStudents, fetchData, getAttendance } from 'src/store/apps/student/actions'

// ** Custom Components Imports

import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import MenuMaxHeight from './MenuMaxHeight'
import StatusChip from './StatusChip'
import CheckAttendance from './CheckAttendance'

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
          <SchoolIcon />
        </CustomAvatar>
      </AvatarWithoutImageLink>
    )
  }
}

const handleDefaultColumns = () => {
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
              <Link href={{ pathname: '/students/view', query: { id: row.id } }} passHref>
                <Typography
                  noWrap
                  component='a'
                  variant='subtitle2'
                  sx={{ color: 'text.primary', textDecoration: 'none' }}
                >
                  {name}
                </Typography>
              </Link>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 1,
      minWidth: 100,
      field: 'age',
      headerName: 'السن',
      renderCell: ({ row }) => {
        return <Typography>{row.age}</Typography>
      }
    },
    {
      flex: 1,
      field: 'gender',
      minWidth: 100,
      headerName: 'الجنس',
      renderCell: ({ row }) => {
        return (
          <Typography variant='subtitle1' noWrap>
            {row.gender}
          </Typography>
        )
      }
    },
    {
      flex: 1,
      minWidth: 100,
      headerName: 'السنة الدراسية',
      field: 'phone',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap variant='subtitle1' sx={{ textTransform: 'capitalize' }}>
            2019 {/* waiting for the year from data base */}
          </Typography>
        )
      }
    },
    {
      flex: 1,
      field: 'gov',
      minWidth: 100,
      headerName: 'المحافظة',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography noWrap variant='subtitle1'>
              القاهرة
            </Typography>
          </Box>
        )
      }
    }
  ]

  return defaultColumns
}

const StudentList = ({ handleSelectedStudent, toggleDialog, toggleEditForm, handlePageChange }) => {
  // ********* States & variables *******************/
  const [pageSize, setPageSize] = useState(10)
  const dispatch = useDispatch()
  const students = useSelector(state => state.student?.data?.data)
  const [showAttendance, setShowAttendance] = useState(false)
  const searchedStudents = useSelector(state => state.student?.searchedStudents?.data?.data)
  const loading = useSelector(state => state.student?.searchedUsersLoading)

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

  /****************** columns Actions *****************/
  const columns = [
    ...handleDefaultColumns(),
    {
      flex: 1,
      minWidth: 100,
      sortable: false,
      field: 'exam',
      headerName: 'الإختبار',
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', ml: '-10px' }}>
          <StatusChip status={row.has_exam} />
        </Box>
      )
    },
    {
      flex: 1,
      minWidth: 100,
      sortable: false,
      field: 'camp',
      headerName: 'المعسكر',
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', ml: '-10px' }}>
          <StatusChip status={row.has_camp} />
        </Box>
      )
    },
    {
      flex: 1,
      minWidth: 100,
      sortable: false,
      field: 'attendance',
      headerName: 'الحضور',
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex' }}>
          <Button
            variant='contained'
            color='secondary'
            startIcon={<ChecklistRtlIcon />}
            onClick={() => toggleAttendance(row)}
          >
            تسجيل الحضور
          </Button>
        </Box>
      )
    },
    {
      flex: 1,
      minWidth: 100,
      sortable: false,
      field: 'actions',
      headerName: 'التحكم',
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex' }}>
          <IconButton onClick={() => onClickEdit(row)} sx={{ ml: '-10px' }}>
            <ModeEditOutlineIcon sx={{ cursor: 'pointer', color: '#ddbb24' }} />
          </IconButton>
          <IconButton onClick={() => onClickDelete(row)}>
            <DeleteIcon sx={{ cursor: 'pointer', color: 'red' }} />
          </IconButton>
          <MenuMaxHeight camp={row.has_camp} exam={row.has_exam} id={row.id} />
        </Box>
      )
    }
  ]

  /****************** Functions *****************/

  const onClickEdit = row => {
    toggleEditForm()
    dispatch(handleSelectedStudent(row.id))
  }

  const onClickDelete = row => {
    dispatch(handleSelectedStudent(row.id))
    toggleDialog()
  }

  // const handleFilter = useCallback(val => {
  //   setValue(val)
  // }, [])

  const handleDelete = selected => {
    dispatch(handleSelectedStudent([...selected]))
  }

  const toggleAttendance = row => {
    dispatch(getAttendance(row.id))
    setShowAttendance(!showAttendance)
    dispatch(handleSelectedStudent(row))
  }

  const CustomNoRowsOverlay = () => (
    <GridOverlay>
      <div style={{ marginTop: '20px' }}>There are no students to display</div>
    </GridOverlay>
  )

  const handleClickedStudent = row => {
    dispatch(handleSelectedStudent(row))
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sx={{ minWidth: '1000px' }}>
        <Card>
          <DataGrid
            loading={loading}
            page={students?.current_page - 1}
            pagination
            paginationMode='server'
            autoHeight
            rows={searchedStudents || students?.data}
            checkboxSelection
            pageSize={students?.per_page}
            rowCount={students?.total}
            disableSelectionOnClick
            columns={columns}
            onSelectionModelChange={selected => handleDelete(selected)}
            rowsPerPageOptions={[10, 25, 50]}
            onPageChange={newPage => handlePageChange(newPage + 1)}
            // onPageSizeChange={handlePageChange(students?.current_page + 1)}
            sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
            components={{
              NoRowsOverlay: CustomNoRowsOverlay
            }}
          />
        </Card>
      </Grid>

      <CheckAttendance toggle={toggleAttendance} open={showAttendance} />
    </Grid>
  )
}

export default StudentList
