// ** React Imports
import { useEffect, useCallback, useState, useRef, useMemo } from 'react'

// ** Next Images
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { TextField } from '@mui/material'
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
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import HomeIcon from '@mui/icons-material/Home'
import ForestIcon from '@mui/icons-material/Forest'

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

const CampDataTable = ({
  dataName,
  formType,
  storeData,
  pathname,
  pastRoute,
  editData,
  handlePageChange,
  renderAgain
}) => {
  // ********* States & variables *******************/
  const [pageSize, setPageSize] = useState(10)
  const [searchQuery, setSearchQuery] = useState('')
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
  const [Current_ID, setCurrent_ID] = useState(null)
  const user = useAuth()
  const role = user?.user?.role
  const { year } = user?.user?.permissions
  const { add, edit, delete: deletee, read } = year?.[formType]

  const schoolData = {
    title: 'المدارس',
    chipColor: 'primary',
    src: '/images/pages/misc-under-maintenance.png',
    cardImg: '/images/school.jpg'
  }

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

  const handleDefaultColumns = (name, pathname, pastRoute, handleClick, formType, toggle) => {
    const attendanceColumn = [
      {
        flex: 0.7,
        minWidth: 70,
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
      }
    ]

    const codeColumn = !isMobile
      ? {
          flex: 'auto',
          minWidth: 100,
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
      : {}

    const defaultColumns = [
      {
        flex: 1.5,
        minWidth: 100,
        field: 'name',
        headerName: name,
        renderCell: ({ row }) => {
          const { id, name } = row

          return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
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

    defaultColumns.push(codeColumn)

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
    if ((type === 'camps' || type === 'classes') && !isMobile)
      return {
        flex: 1,
        minWidth: 100,
        sorDataTable: false,
        field: 'sessionAttendance',
        headerName: 'حضور الحصص',
        renderCell: ({ row }) => (
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: '7px', alignItems: 'center' }}>
            {makeSessionsDots(row.session_ids)?.map((i, index) => {
              const color = i ? 'green' : 'red'

              return (
                <Tooltip key={index} title={'Session: ' + (index + 1)}>
                  <div
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
    if (type === 'camps' || type === 'classes')
      return {
        flex: 1,
        minWidth: 80,
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
                sx={{
                  color: 'text.primary',
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: `${isMobile ? 'column' : 'row'}`,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                {row?.teacher ? (
                  <>
                    {row?.teacher}
                    {deletee && (
                      <Tooltip title='Unassign'>
                        <Button
                          variant='text'
                          startIcon={<ExitToAppIcon />}
                          sx={{ color: 'red' }}
                          onClick={async () => {
                            const place = row?.type ? 'schools' : 'classes'
                            await dispatch(unAssignTeacher({ data: { [place]: row?.id } }))
                            renderAgain()
                          }}
                        />
                      </Tooltip>
                    )}
                  </>
                ) : (
                  <>
                    {add && (
                      <Tooltip title='Assign' placement='left'>
                        <IconButton
                          sx={{ cursor: 'pointer', color: 'green' }}
                          onClick={() => {
                            onClickAdd(row)
                          }}
                        >
                          <AddBoxIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                  </>
                )}
              </Typography>
            </Box>
          </Box>
        )
      }

    return {}
  }

  const renderControls = type => {
    if (deletee || edit) {
      return {
        flex: 1,
        minWidth: 100,
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
    }

    return {}
  }

  let columns = [
    ...handleDefaultColumns(dataName, pathname, pastRoute, handleClickStudent, formType, toggleAttendance),
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
    setCurrent_ID({ id, type: row?.type })
    setShowForm(!showForm)
  }

  const camps = searchedData?.data || data?.data || data
  const filteredCamps = camps?.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12} sx={{ maxWidth: '500', minHeight: '400', marginBottom: '3rem' }}>
          <TextField
            label='بحث عن معسكر'
            variant='outlined'
            fullWidth
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            sx={{ width: '30%', mb: '1rem', mt: '1rem' }}
          />
          <Card>
            <DataGrid
              sortable={false}
              autoHeight
              rows={filteredCamps}
              checkboxSelection={false}
              pageSize={pageSize}
              columns={columns}
              rowCount={searchedData?.total || data?.total || data?.data?.length}
              disableSelectionOnClick
              onCellClick={selected => dispatch(handleSelectedData(selected.row))}
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
        <AssignTeacher open={showForm} toggle={setShowForm} data={Current_ID} renderAgain={renderAgain} />
        <ConfirmDelete
          open={showConfirm}
          toggle={toggleConfirm}
          confirmationType={'المسح '}
          deleteAction={deleteAction}
          selected={selected}
          fetchData={editData}
        />
        <CheckAttendance toggle={toggleAttendance} open={showAttendance} />
      </Grid>
    </>
  )
}

export default CampDataTable
