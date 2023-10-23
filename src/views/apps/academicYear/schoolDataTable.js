// ** React Imports
import { useEffect, useState } from 'react'

// ** Next Images
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { TextField } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline'

// ** Icons Imports
import DeleteIcon from '@mui/icons-material/Delete'

// ** redux Imports
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from 'src/hooks/useAuth'

import { handleSelectedData } from 'src/store/apps/academicData'
import { handleActions } from 'src/helperFunctions/academicDataActions'
import DialogEditForm from './DialogEditForm'
import ConfirmDelete from './ConfirmDelete'

const SchoolDataTable = ({ dataName, formType, storeData, pathname, pastRoute, editData }) => {
  // ********* States & variables *******************/
  const [pageSize, setPageSize] = useState(10)
  const [searchQuery, setSearchQuery] = useState('')
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
  const { edit, delete: deletee } = year?.[formType]

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

  const handleDefaultColumns = (name, pathname, pastRoute, handleClick) => {
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
      }
    ]

    defaultColumns.push(codeColumn)

    return defaultColumns
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
    ...handleDefaultColumns(dataName, pathname, pastRoute, handleClickStudent, formType),
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

  const schools = searchedData?.data || data?.data || data

  const filteredSchools = schools?.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12} sx={{ maxWidth: '500', minHeight: '400', marginBottom: '3rem' }}>
          <TextField
            label='بحث عن مدرسة'
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
              rows={filteredSchools}
              pageSize={pageSize}
              columns={columns}
              rowsPerPageOptions={[10, 25, 50, schools?.length]}
              onPageSizeChange={newPageSize => setPageSize(newPageSize)}
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
      </Grid>
    </>
  )
}

export default SchoolDataTable
