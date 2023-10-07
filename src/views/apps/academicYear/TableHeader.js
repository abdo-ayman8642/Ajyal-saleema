import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { InputAdornment, TextField, Typography, Tooltip } from '@mui/material'
import Modal from '@mui/material/Modal'
import { useDispatch } from 'react-redux'
import SimpleAddDrawer from './SimpleAddDrawer'
import { handleActions } from 'src/helperFunctions/academicDataActions'
import { academicDataInputs } from 'src/helperFunctions/AcademicDataInputs'
import { Magnify } from 'mdi-material-ui'
import { useDebounce } from 'src/hooks/useDepounce'
import { handleSearchedQuery, resetSearchedData } from 'src/store/apps/academicData'
import { searchData } from 'src/store/apps/academicData/actions'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import UploadIcon from '@mui/icons-material/Upload'
import axios from 'axios'
import ExcelUploaderRestrictions from './importExcel'
import { filterBy } from 'src/store/apps/academicData/actions'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: '15px',
  boxShadow: 24,
  p: 4,
  '&:hover': {
    cursor: 'pointer'
  }
}

function TableHeader({ title, formType, showDrawer, setDrawer, addData, placeholder, fetchData, fetchParams }) {
  const dispatch = useDispatch()
  const formInputs = academicDataInputs(formType)
  const action = handleActions('add', formType)
  const [searchVal, setSearchVal] = useState('')
  const { clase_id: classId } = (formType === 'students' && addData) || {}
  const { school_id } = addData || {}
  const { query } = addData || {}
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleUpload = async file => {
    if (file) {
      const baseUrl = 'https://edu.kyanlabs.com/edu/api/'

      const formData = new FormData()
      formData.append('file', file)
      query === 'school_camp' ? formData.append('school_id', school_id) : formData.append('class_id', classId)

      const pathUrl = query === 'school_camp' ? `${baseUrl}student/camp/import` : `${baseUrl}student/import`
      try {
        const response = await axios.post(pathUrl, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
      } catch (error) {
        console.error('Error uploading file:', error)
      } finally {
        handleClose()
        query === 'school_camp'
          ? dispatch(filterBy({ page: 1, query: 'school_camp', value: school_id }))
          : dispatch(filterBy({ page: 1, query: 'class', value: classId }))
      }
    } else {
      console.error('No file selected.')
    }
  }

  const handleDownload = async () => {
    const baseUrl = 'https://edu.kyanlabs.com/edu/api/'

    const excelUrl =
      query === 'school_camp'
        ? `${baseUrl}student/camp/export?school_id=${school_id}`
        : `${baseUrl}student/export?class_id=${classId}`

    try {
      const response = await fetch(excelUrl, {
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'

          // 'Content-Type': 'application/x-www-form-urlencoded',
        }
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch Excel sheet. Status code: ${response.status}`)
      }

      const blob = await response.blob()

      // Create a blob URL and use it to download the file
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'Students.xlsx'
      a.click()

      // Clean up the blob URL
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error(error)
    }
  }

  const toggle = () => {
    setDrawer(!showDrawer)
  }

  const handleSearch = value => {
    if (!value || value === '') {
      dispatch(resetSearchedData())
      dispatch(fetchData(fetchParams))
    } else {
      dispatch(
        searchData({
          page: 1,
          searched: formType === 'govs' ? 'cities' : formType === 'administrations' ? 'departs' : formType,
          query: value
        })
      )
    }
  }

  const debouncedSearch = useDebounce(handleSearch, 500)

  const handleInputChange = e => {
    const value = e.target.value
    dispatch(handleSearchedQuery(value))
    setSearchVal(value)
    debouncedSearch(value)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bg: '#fff',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
        borderRadius: '10px',
        padding: '1rem',
        mb: 5
      }}
    >
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <Typography
              id='modal-modal-title'
              variant='h5'
              component='h2'
              sx={{
                textAlign: 'center',
                padding: '10px 10px 20px 10px',
                '&:hover': {
                  cursor: 'default'
                }
              }}
            >
              رفع ملف الطلاب
            </Typography>

            <ExcelUploaderRestrictions handleUpload={handleUpload} />
          </Box>
        </Modal>
      </div>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <Typography variant='h4' sx={{ fontWeight: 'bold', color: '#3F51B5' }}>
          {title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* {formType !== 'govs' && formType !== 'grades' && (
            <TextField
              size='small'
              value={searchVal}
              sx={{ mr: 6, mb: 2 }}
              placeholder={`ابحث عن ${placeholder || ''}`}
              onChange={handleInputChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Magnify />
                  </InputAdornment>
                )
              }}
            />
          )} */}
          {
            <Button sx={{ mb: 2, fontSize: '1rem', fontWeight: 'bold' }} onClick={toggle} variant='contained'>
              إضافة
            </Button>
          }

          {formType === 'students' && (
            <>
              <Tooltip title='اضافة طلاب' placement='top'>
                <Button
                  sx={{ fontSize: '0.6rem', fontWeight: 'normal', color: '#757575' }}
                  variant='text'
                  hover
                  onClick={handleOpen}
                >
                  <UploadIcon />
                </Button>
              </Tooltip>
              <Tooltip title='تنزيل' placement='top'>
                <Button
                  sx={{ fontSize: '0.6rem', fontWeight: 'normal', color: '#388e3c' }}
                  variant='text'
                  hover
                  onClick={handleDownload}
                >
                  <FileDownloadIcon />
                </Button>
              </Tooltip>
            </>
          )}
        </Box>
      </Box>
      {showDrawer && (
        <SimpleAddDrawer
          open={showDrawer}
          toggle={toggle}
          formInputs={formInputs}
          action={action}
          addData={addData}
          formType={formType}
        />
      )}
    </Box>
  )
}

export default TableHeader
