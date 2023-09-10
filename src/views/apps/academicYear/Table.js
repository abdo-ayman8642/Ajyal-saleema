// ** React Imports
import { useEffect, useCallback, useState, useRef, useMemo } from 'react'

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
import { Button, CircularProgress } from '@mui/material'
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl'

// ** Icons Imports
import DeleteIcon from '@mui/icons-material/Delete'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'

// ** redux Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports

import CustomAvatar from 'src/@core/components/mui/avatar'
import { handleSelectedData } from 'src/store/apps/academicData'
import { handleActions } from 'src/helperFunctions/academicDataActions'
import DialogEditForm from './DialogEditForm'
import ConfirmDialog from 'src/views/sharedComponents/ConfirmDialog'
import ConfirmDelete from './ConfirmDelete'
import { fetchData } from 'src/store/apps/sessions/actions'
import { getAttendance } from 'src/store/apps/student/actions'
import { handleSelectedStudent } from 'src/store/apps/student'
import CheckAttendance from '../students/list/CheckAttendance'

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
    <CustomAvatar skin='light' color={row.avatarColor} sx={{ mr: 3, width: 34, height: 34, fontSize: '1rem' }}>
      <CalendarMonthIcon />
    </CustomAvatar>

    // </AvatarWithoutImageLink>
  )
}

const handleDefaultColumns = (name, pathname, pastRoute, handleClick, formType, toggle) => {
  const attendanceColumn = {
    flex: 0.7,
    minWidth: 50,
    field: 'attendance',
    headerName: 'الحضور',
    renderCell: ({ row }) => {
      const { id, name } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Typography noWrap component='a' variant='subtitle2' sx={{ color: 'text.primary', textDecoration: 'none' }}>
              {row.total_attendance}
            </Typography>
          </Box>
        </Box>
      )
    }
  }

  const codeColumn = {
    flex: 0.7,
    minWidth: 50,
    field: 'code',
    headerName: 'الكود',
    renderCell: ({ row }) => {
      const { code } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Typography noWrap component='a' variant='subtitle2' sx={{ color: 'text.primary', textDecoration: 'none' }}>
              {code || '__'}
            </Typography>
          </Box>
        </Box>
      )
    }
  }

  const administrationColumns = [
    {
      flex: 0.2,
      minWidth: 50,
      field: 'schools',
      headerName: 'المدارس',
      renderCell: ({ row }) => {
        const { id, name } = row

        return (
          <Box
            sx={{
              marginLeft: -3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f2f2f2',
              padding: '6px 12px',
              borderRadius: '24px',
              cursor: 'pointer',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
              transition: 'background-color 0.3s ease',
              '&:hover': {
                backgroundColor: '#dcdcdc'
              }
            }}
          >
            <Link href={{ pathname: 'administration/school', query: { pastRoute: pastRoute, id: id } }} passHref>
              <Typography
                noWrap
                component='a'
                variant='subtitle2'
                sx={{ color: 'text.primary', textDecoration: 'none' }}
              >
                المدارس التابعة للإدارة
              </Typography>
            </Link>
          </Box>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 50,
      field: 'camp',
      headerName: 'الكامب',
      renderCell: ({ row }) => {
        const { id, name } = row

        return (
          <Box
            sx={{
              marginLeft: -3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f2f2f2',
              padding: '6px 12px',
              borderRadius: '24px',
              cursor: 'pointer',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
              transition: 'background-color 0.3s ease',
              '&:hover': {
                backgroundColor: '#dcdcdc'
              }
            }}
          >
            <Link href={{ pathname: 'administration/camp', query: { pastRoute: pastRoute, id: id } }} passHref>
              <Typography
                noWrap
                component='a'
                variant='subtitle2'
                sx={{ color: 'text.primary', textDecoration: 'none' }}
              >
                الكامب
              </Typography>
            </Link>
          </Box>
        )
      }
    }
  ]

  const studentsColumns = [
    {
      flex: 0.1,
      field: 'gender',
      minWidth: 100,
      headerName: 'الجنس',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography noWrap variant='subtitle1'>
              {row.gender}
            </Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.15,
      minWidth: 100,
      sortable: false,
      field: 'attendance',
      headerName: 'الحضور',
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex' }}>
          <Button variant='contained' color='secondary' startIcon={<ChecklistRtlIcon />} onClick={() => toggle(row)}>
            تسجيل الحضور
          </Button>
        </Box>
      )
    }
  ]

  const defaultColumns = [
    {
      flex: 0.5,
      minWidth: 50,
      field: 'name',
      headerName: name,
      renderCell: ({ row }) => {
        const { id, name } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderClient(row)}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }} onClick={handleClick}>
              {formType === 'administrations' ? (
                <Typography
                  noWrap
                  component='a'
                  variant='subtitle2'
                  sx={{ color: 'text.primary', textDecoration: 'none' }}
                >
                  {name}
                </Typography>
              ) : (
                <Link href={{ pathname: pathname, query: { pastRoute: pastRoute, id: id } }} passHref>
                  <Typography
                    noWrap
                    component='a'
                    variant='subtitle2'
                    sx={{ color: 'text.primary', textDecoration: 'none' }}
                  >
                    {name}
                  </Typography>
                </Link>
              )}
            </Box>
          </Box>
        )
      }
    }
  ]

  if (formType === 'classes') {
    defaultColumns.push(attendanceColumn)
    return defaultColumns
  }
  if (formType === 'schools' || formType === 'govs') {
    defaultColumns.push(codeColumn)
    return defaultColumns
  }

  if (formType === 'administrations') {
    const administrColumns = [...defaultColumns, ...administrationColumns]
    administrColumns.push(codeColumn)
    return administrColumns
  }

  if (formType === 'students') {
    const studColumns = [...defaultColumns, ...studentsColumns]
    return studColumns
  }

  return defaultColumns
}

const DataTable = ({ dataName, formType, storeData, pathname, pastRoute, editData, handlePageChange }) => {
  // ********* States & variables *******************/
  const [pageSize, setPageSize] = useState(10)
  const [showAttendance, setShowAttendance] = useState(false)
  const dispatch = useDispatch()
  const [showEdit, setShowEdit] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const searchedData = useSelector(state => state.academicData?.searchedData)
  const data = useSelector(state => state.academicData[storeData])
  const editAction = handleActions('edit', formType)
  const deleteAction = handleActions('delete', formType)
  const selected = useSelector(state => state.academicData?.selectedData)

  // console.log(searchedData)

  /****************** columns Actions *****************/

  const toggleAttendance = row => {
    dispatch(getAttendance(row.id))
    setShowAttendance(!showAttendance)
    dispatch(handleSelectedStudent(row))
  }

  console.log(data)

  const columns = [
    ...handleDefaultColumns(dataName, pathname, pastRoute, handleClickStudent, formType, toggleAttendance),

    {
      flex: 0.12,
      minWidth: 50,
      sorDataTable: false,
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
        </Box>
      )
    }
  ]

  /****************** Functions *****************/

  const onClickEdit = row => {
    toggleShowEdit()
    dispatch(handleSelectedData(row))
  }

  const onClickDelete = row => {
    dispatch(handleSelectedData(row))
    toggleConfirm()
  }

  const toggleShowEdit = () => {
    setShowEdit(!showEdit)
  }

  const toggleConfirm = () => {
    setShowConfirm(!showConfirm)
  }

  const handleClickStudent = row => {
    dispatch(handleSelectedData(row))
  }

  console.log(searchedData)
  console.log(data?.data)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sx={{ maxWidth: '500', minHeight: '400' }}>
        <Card>
          <DataGrid
            autoHeight
            page={
              formType === 'students'
                ? searchedData?.data.current_page - 1 || data?.data.current_page - 1 || 0
                : searchedData?.current_page - 1 || data?.current_page - 1 || 0
            }
            rows={
              formType === 'students' ? searchedData?.data.data || data?.data.data : searchedData?.data || data?.data
            }
            checkboxSelection
            pageSize={searchedData?.per_page || data?.per_page || pageSize}
            columns={columns}
            pagination
            paginationMode={formType === 'years' ? 'client' : 'server'}
            rowCount={
              formType === 'students'
                ? searchedData?.data.total || data?.data.total || data?.data?.data.length
                : searchedData?.total || data?.total || data?.data?.length
            }
            disableSelectionOnClick
            onCellClick={selected => dispatch(handleSelectedData(selected.row))}
            rowsPerPageOptions={[10, 25, 50]}
            onPageChange={newPage => handlePageChange(newPage + 1)}
            sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
          />
        </Card>
      </Grid>
      {showEdit && (
        <DialogEditForm
          formType={formType}
          toggle={toggleShowEdit}
          showEdit={showEdit}
          editAction={editAction}
          title={dataName}
          editData={editData}
        />
      )}

      <ConfirmDelete
        open={showConfirm}
        toggle={toggleConfirm}
        confirmationType={'مسح العام الدراسي'}
        deleteAction={deleteAction}
        selected={selected}
        fetchData={editData}
      />
      <CheckAttendance toggle={toggleAttendance} open={showAttendance} />
    </Grid>
  )
}

export default DataTable
