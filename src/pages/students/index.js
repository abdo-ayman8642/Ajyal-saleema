import React, { useLayoutEffect } from 'react'

// mui imports
import Grid from '@mui/material/Grid'

// components import
import FilterCard from 'src/views/apps/students/FilterCard'
import StudentList from 'src/views/apps/students/list/Table'
import SidebarAddStudent from 'src/views/apps/students/list/AddUserDrawer'
import { CircularProgress } from '@mui/material'
import ImpExpFile from 'src/views/apps/students/list/ImpExpFile'

// hooks
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

//redux imports
import { deleteMultiStudents, fetchData, fetchGov, fetchYears, searchData } from 'src/store/apps/student/actions'
import { handleSelectedStudent, resetSearchedStudents } from 'src/store/apps/student'
import { deleteStudent } from 'src/store/apps/student/actions'
import DialogEditUserInfo from 'src/views/apps/students/list/DialogEditUserInfo'
import ConfirmDialog from 'src/views/sharedComponents/ConfirmDialog'
import TableHeader from 'src/views/sharedComponents/TableHeader'
import PageHeader from 'src/views/apps/academicYear/PageHeader'

// redux imports

function Students() {
  //** states & variables

  const dispatch = useDispatch()
  const loading = useSelector(state => state.student.dataLoading)
  const selectedStudent = useSelector(state => state.student?.selectedStudent)
  const [showForm, setShowForm] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const [showFileImpExp, setShowFileImpExp] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    dispatch(fetchData(1))
  }, [dispatch])

  if (loading) {
    return (
      <Grid container sx={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Grid item>
          <CircularProgress />
        </Grid>
      </Grid>
    )
  }

  /****************** Functions *****************/

  const toggleForm = () => {
    setShowForm(!showForm)
  }

  const toggleDialog = () => {
    setShowDialog(!showDialog)
  }

  const toggleImpExp = () => {
    setShowFileImpExp(!showFileImpExp)
  }

  const toggleEditForm = () => {
    setShowEditForm(!showEditForm)
  }

  const handlePageChange = nextPage => {
    dispatch(fetchData(nextPage))
  }

  return (
    <>
      <Grid>
        <PageHeader src={'/images/students2.jpg'} />
        <FilterCard />
        <TableHeader
          impExp={true}
          toggleAdd={toggleForm}
          selected={selectedStudent}
          toggleConfirm={toggleDialog}
          toggleImpExp={toggleImpExp}
          dataType={'student'}
          searchData={searchData}
          fetchData={fetchData}
          resetSearched={resetSearchedStudents}
          placeholder={'عن الطالب'}
        />
        <StudentList
          toggleForm={toggleForm}
          handleSelectedStudent={handleSelectedStudent}
          toggleDialog={toggleDialog}
          toggleEditForm={toggleEditForm}
          handlePageChange={handlePageChange}
        />

        {showForm && <SidebarAddStudent open={showForm} toggle={toggleForm} />}
        {showDialog && (
          <ConfirmDialog
            toggle={toggleDialog}
            open={showDialog}
            confirmationType='الإزالة'
            selected={selectedStudent}
            deleteSingle={deleteStudent}
            deleteMulti={deleteMultiStudents}
          />
        )}

        {showEditForm && <DialogEditUserInfo toggle={toggleEditForm} />}
      </Grid>
    </>
  )
}

export default Students
