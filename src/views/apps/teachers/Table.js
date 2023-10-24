// ** React Imports
import { useEffect, useCallback, useState, useRef } from 'react'

// ** Next Images
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
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
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl'

// ** teachers Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import { SchoolOutline } from 'mdi-material-ui'
import { handleSelectedTeacher } from 'src/store/apps/teachers'
import TeacherClasses from '../students/list/TeacherClasses'
import { useAuth } from 'src/hooks/useAuth'
import { TextField } from '@mui/material'

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

const TeachersList = ({ toggleAddForm, toggleDialog, toggleEditForm, toggleAssign, permissions }) => {
  // stats and variables
  const dispatch = useDispatch()
  const [pageSize, setPageSize] = useState(10)
  const [searchQuery, setSearchQuery] = useState('')
  const selectedTeacher = useSelector(state => state.selectedTeacher)
  const teachers = useSelector(state => state.teachers?.data?.data)
  const [showAttendance, setShowAttendance] = useState(false)
  const [teacherData, setTeacherData] = useState(null)
  const { add, edit } = permissions
  const deletee = permissions?.['delete']
  const user = useAuth()

  // add actions column => edit / delete

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
  const renderFlex = ismobile => (ismobile ? 'auto' : 1)

  const defaultColumns = [
    {
      flex: renderFlex(isMobile),
      minWidth: 120,
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
    }
  ]

  const renderGender = () => {
    if (!isMobile) {
      return {
        flex: 1,
        field: 'gender',
        minWidth: 100,
        headerName: 'الجنس',
        renderCell: ({ row }) => {
          return (
            <Typography variant='body2' noWrap>
              {row.gender === 'male' ? 'ذكر' : 'أنثى'}
            </Typography>
          )
        }
      }
    }

    return {}
  }

  const renderControls = () => {
    if (add || edit || deletee) {
      return {
        flex: renderFlex(isMobile),
        minWidth: 80,
        sortable: false,
        field: 'actions',
        headerName: 'التحكم',
        renderCell: ({ row }) => (
          <Box sx={{ display: 'flex', ml: '-25px' }}>
            {edit && (
              <IconButton sx={{ cursor: 'pointer', color: '#ddbb24' }} onClick={() => onClickEdit(row)}>
                <ModeEditOutlineIcon />
              </IconButton>
            )}
            {deletee && (
              <IconButton
                sx={{ cursor: 'pointer', color: 'red' }}
                onClick={() => {
                  onClickDelete(row)
                }}
              >
                <DeleteIcon />
              </IconButton>
            )}
            {add && (
              <IconButton
                sx={{ cursor: 'pointer', color: 'green' }}
                onClick={() => {
                  onClickAdd(row)
                }}
              >
                <AddBoxIcon />
              </IconButton>
            )}
          </Box>
        )
      }
    }

    return {}
  }

  const columns = [
    ...defaultColumns,
    renderGender(),
    {
      flex: renderFlex(isMobile),
      minWidth: 100,
      sortable: false,
      field: 'teachers',
      headerName: 'الفصول',
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            variant='contained'
            color='secondary'
            startIcon={<ChecklistRtlIcon />}
            onClick={() => toggleAttendance(row)}
          >
            {isMobile ? null : (
              <div style={{ padding: '0 0.5rem', fontSize: '1rem', fontWeight: 500, cursor: 'default' }}>
                {(row?.classes?.length || 0) + (row?.camps?.length || 0)}
              </div>
            )}
            {isMobile ? null : 'الفصول'}
          </Button>
        </Box>
      )
    },
    renderControls()
  ]

  // ** Functions

  // handle edit clicked
  const onClickEdit = row => {
    toggleEditForm()
    dispatch(handleSelectedTeacher(row))
  }

  const onClickAdd = row => {
    const { id, name } = row
    toggleAssign(id, name)
  }

  // handle Delete user & multi delete
  const onClickDelete = row => {
    dispatch(handleSelectedTeacher(row.id))
    toggleDialog()
  }

  const handleDelete = selected => {
    dispatch(handleSelectedTeacher([...selected]))
  }

  const toggleAttendance = row => {
    //dispatch(getAttendance(row.id))
    setTeacherData(row)
    setShowAttendance(!showAttendance)

    //dispatch(handleSelectedStudent(row))
  }

  function isObjectEmpty(obj) {
    return Object.keys(obj).length === 0
  }

  columns = columns.filter(obj => !isObjectEmpty(obj))

  const filteredTeachers = teachers?.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <TextField
          label='بحث عن مدرس'
          variant='outlined'
          fullWidth
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          sx={{ width: '30%', mb: '1rem', mt: '1rem' }}
        />
        <Card>
          <DataGrid
            autoHeight
            rows={filteredTeachers || []}
            checkboxSelection={false}
            pageSize={pageSize}
            disableSelectionOnClick
            rowsPerPageOptions={[10, 25, 50, 100]}
            columns={columns}
            onSelectionModelChange={selected => handleDelete(selected)}
            onPageSizeChange={newPageSize => setPageSize(newPageSize)}
            sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
          />
        </Card>
      </Grid>
      <TeacherClasses toggle={toggleAttendance} open={showAttendance} data={teacherData} />
    </Grid>
  )
}

export default TeachersList
