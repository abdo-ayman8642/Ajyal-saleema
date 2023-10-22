// ** React Imports
import { useEffect, useState } from 'react'

// ** Next Images
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { DataGrid } from '@mui/x-data-grid'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline'
import { Button, TextField } from '@mui/material'
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl'

// ** Icons Imports
import DeleteIcon from '@mui/icons-material/Delete'

// ** redux Imports
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from 'src/hooks/useAuth'
import { handleSelectedData } from 'src/store/apps/academicData'
import { handleActions } from 'src/helperFunctions/academicDataActions'
import DialogEditForm from './DialogEditForm'
import ConfirmDelete from './ConfirmDelete'
import { getAttendance } from 'src/store/apps/student/actions'
import { handleSelectedStudent } from 'src/store/apps/student'
import CheckAttendance from '../students/list/CheckAttendance'

const StudentDatatable = ({ dataName, formType, storeData, pathname, pastRoute, editData }) => {
  // ********* States & variables *******************/
  const [pageSize, setPageSize] = useState(10)
  const [searchQuery, setSearchQuery] = useState('')
  const [showAttendance, setShowAttendance] = useState(false)
  const dispatch = useDispatch()
  const [showEdit, setShowEdit] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const searchedData = useSelector(state => state.academicData?.searchedData)
  const data = useSelector(state => state.academicData[storeData])
  const editAction = handleActions('edit', formType)
  const deleteAction = handleActions('delete', formType)
  const selected = useSelector(state => state.academicData?.selectedData)
  const user = useAuth()
  const { year } = user?.user?.permissions
  const { add, edit, delete: deletee, read } = year?.[formType]

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    function handleResize() {
      const isMobile = window.innerWidth < 768
      setIsMobile(isMobile)
    }

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const renderGender = () => {
    if (!isMobile) {
      return {
        flex: 1,
        field: 'gender',
        minWidth: 100,
        headerName: 'الجنس',
        renderCell: ({ row }) => {
          return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography noWrap variant='subtitle1'>
                {row.gender === 'male' ? 'ذكر' : 'أنثى'}
              </Typography>
            </Box>
          )
        }
      }
    }

    return {}
  }

  const handleDefaultColumns = (name, pathname, pastRoute, handleClick, formType, toggle) => {
    const studentsColumns = add
      ? [
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
                  onClick={() => toggle(row)}
                >
                  {!isMobile && 'تسجيل الحضور'}
                </Button>
              </Box>
            )
          }
        ]
      : [{}]

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
              </Box>
            </Box>
          )
        }
      },
      renderGender()
    ]

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

  const students = searchedData?.data || data?.data
  const filteredStudents = students?.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12} sx={{ maxWidth: '500', minHeight: '400', marginBottom: '3rem' }}>
          <TextField
            label='بحث عن طالب'
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
              rows={filteredStudents}
              checkboxSelection={false}
              pageSize={pageSize}
              columns={columns}
              rowCount={filteredStudents?.length}
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

export default StudentDatatable
