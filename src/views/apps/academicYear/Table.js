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
import SidebarAddTeachers from 'src/views/apps/teachers/DrawerAdd'
import AssignTeacher from '../teachers/AssignDataTable'

// ** Icons Imports
import DeleteIcon from '@mui/icons-material/Delete'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'

// ** redux Imports
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from 'src/hooks/useAuth'
import { unAssignTeacher } from 'src/store/apps/teachers/actions'

// ** Custom Components Imports

import CustomAvatar from 'src/@core/components/mui/avatar'
import { handleSelectedData } from 'src/store/apps/academicData'
import { handleActions } from 'src/helperFunctions/academicDataActions'
import DialogEditForm from './DialogEditForm'
import ConfirmDialog from 'src/views/sharedComponents/ConfirmDialog'
import ConfirmDelete from './ConfirmDelete'
import { getAttendance } from 'src/store/apps/student/actions'
import { handleSelectedStudent } from 'src/store/apps/student'
import CheckAttendance from '../students/list/CheckAttendance'
import attendance from 'src/store/apps/attendance'
import Tooltip from '@mui/material/Tooltip'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import AddBoxIcon from '@mui/icons-material/AddBox'

// ** Utils Import
import CardStatsCharacter from 'src/@core/components/card-statistics/card-stats-with-image'

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

const DataTable = ({ dataName, formType, storeData, pathname, pastRoute, editData, handlePageChange, renderAgain }) => {
  // ********* States & variables *******************/
  const [pageSize, setPageSize] = useState(10)
  const [showForm, setShowForm] = useState(false)
  const [showAttendance, setShowAttendance] = useState(false)
  const dispatch = useDispatch()
  const [showEdit, setShowEdit] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const searchedData = useSelector(state => state.academicData?.searchedData)
  const data = useSelector(state => state.academicData[storeData])
  const editAction = handleActions('edit', formType)
  const deleteAction = handleActions('delete', formType)
  const selected = useSelector(state => state.academicData?.selectedData)
  const [currClass, setCurrClass] = useState(null)
  const user = useAuth()
  const role = user?.user?.role
  const { year } = user?.user?.permissions
  const { add, edit, delete: deletee, read } = year

  const schoolData = {
    title: 'المدارس',
    chipColor: 'primary',
    src: '/images/pages/misc-under-maintenance.png',
    cardImg: '/images/school.jpg'
  }

  const handleDefaultColumns = (name, pathname, pastRoute, handleClick, formType, toggle) => {
    const attendanceColumn = [
      {
        flex: 0.3,
        minWidth: 50,
        field: 'attendance',
        headerName: 'الحضور',
        renderCell: ({ row }) => {
          const { id, name } = row

          return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                <Typography
                  noWrap
                  component='a'
                  variant='subtitle2'
                  sx={{ color: 'text.primary', textDecoration: 'none' }}
                >
                  {row.total_attendance}
                </Typography>
              </Box>
            </Box>
          )
        }
      },
      {
        flex: 0.3,
        minWidth: 50,
        sorDataTable: false,
        field: 'teacher',
        headerName: 'المعلم',
        renderCell: ({ row }) => {
          return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                <Typography
                  noWrap
                  component='a'
                  variant='subtitle2'
                  sx={{ color: 'text.primary', textDecoration: 'none' }}
                >
                  {row?.teacher ? (
                    <>
                      {row?.teacher}
                      {deletee && (
                        <Tooltip title='Unassign'>
                          <Button
                            variant='text'
                            startIcon={<DeleteIcon />}
                            sx={{ color: 'red' }}
                            onClick={async () => {
                              await dispatch(unAssignTeacher({ data: { classes: row?.id } }))
                              renderAgain()
                            }}
                          />
                        </Tooltip>
                      )}
                    </>
                  ) : (
                    <Tooltip title='Assign' placement='left'>
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
                    </Tooltip>
                  )}
                </Typography>
              </Box>
            </Box>
          )
        }
      }
    ]

    const codeColumn = {
      flex: 0.5,
      minWidth: 50,
      field: 'code',
      headerName: 'الكود',
      renderCell: ({ row }) => {
        const { code } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                noWrap
                component='a'
                variant='subtitle2'
                sx={{ color: 'text.primary', textDecoration: 'none' }}
              >
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
        headerName: 'المعسكر',
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
                  المعسكر
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
      const classCol = [...defaultColumns, ...attendanceColumn]

      return classCol
    }
    if (formType === 'schools' || formType === 'govs' || formType === 'camps') {
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

  /****************** columns Actions *****************/

  const toggleAttendance = row => {
    dispatch(getAttendance(row.id))
    setShowAttendance(!showAttendance)
    dispatch(handleSelectedStudent(row))
  }

  const makeSessionsDots = attendance => {
    return Array.from({ length: 12 }, (_, i) => attendance.includes(i + 1))
  }

  const renderSessionsAttendance = type => {
    if (type === 'camps' || type === 'classes')
      return {
        flex: 0.3,
        minWidth: 50,
        sorDataTable: false,
        field: 'sessionAttendance',
        headerName: 'حضور الحصص',
        renderCell: ({ row }) => (
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: '7px', alignItems: 'center' }}>
            {makeSessionsDots(row.session_ids).map((i, index) => {
              const color = i ? 'green' : 'red'

              return (
                <Tooltip title={'Session: ' + (index + 1)}>
                  <div
                    key={index}
                    style={{
                      width: '8px',
                      height: '8px',
                      backgroundColor: `${color}`,
                      borderRadius: '50%'
                    }}
                  ></div>
                </Tooltip>
              )
            })}
          </Box>
        )
      }

    return {}
  }

  const renderTeacher = type => {
    if (type === 'camps')
      return {
        flex: 0.3,
        minWidth: 50,
        sorDataTable: false,
        field: 'teacher',
        headerName: 'المعلم',
        renderCell: ({ row }) => (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                noWrap
                component='a'
                variant='subtitle2'
                sx={{ color: 'text.primary', textDecoration: 'none' }}
              >
                {row?.teacher}
              </Typography>
            </Box>
          </Box>
        )
      }

    return {}
  }

  const renderControls = type => {
    return {
      flex: 0.12,
      minWidth: 50,
      sorDataTable: false,
      field: 'actions',
      headerName: 'التحكم',
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex' }}>
          <>
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
          </>
        </Box>
      )
    }

    return {}
  }

  let columns = [
    ...handleDefaultColumns(dataName, pathname, pastRoute, handleClickStudent, formType, toggleAttendance),
    renderSessionsAttendance(formType),
    renderTeacher(formType),
    renderControls(formType)
  ]
  function isObjectEmpty(obj) {
    return Object.keys(obj).length === 0
  }

  columns = columns.filter(obj => !isObjectEmpty(obj))

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

  const onClickAdd = row => {
    const { id, name } = row
    setCurrClass(id)
    setShowForm(!showForm)
  }

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12} sx={{ maxWidth: '500', minHeight: '400', marginBottom: '3rem' }}>
          <Card>
            <DataGrid
              sortable={false}
              autoHeight
              page={
                formType === 'students'
                  ? searchedData?.data.current_page - 1 || data?.data.current_page - 1 || 0
                  : searchedData?.current_page - 1 || data?.current_page - 1 || 0
              }
              rows={
                formType === 'students'
                  ? searchedData?.data.data || data?.data.data
                  : searchedData?.data || data?.data || data
              }
              checkboxSelection={false}
              pageSize={searchedData?.per_page || data?.per_page || pageSize}
              columns={columns}
              pagination
              paginationMode={formType === 'server'}
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
              hideFooterPagination={
                formType === 'govs' || formType === 'grades' || formType === 'schools' || formType === 'camps'
              }
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

        <AssignTeacher open={showForm} toggle={setShowForm} class_id={currClass} renderAgain={renderAgain} />

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
      {/* <div style={{ display: 'flex' }}>
        <CardStatsCharacter data={schoolData} />
      </div> */}
    </>
  )
}

export default DataTable
