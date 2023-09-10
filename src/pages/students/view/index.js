import { CircularProgress, Grid } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getAdministrationById, getSchoolById } from 'src/store/apps/academicData/actions'
import { fetchById } from 'src/store/apps/student/actions'
import StudentLayout from 'src/views/apps/students/studentProfile/Layout'

function StudentProfile() {
  const router = useRouter()
  const id = router.query.id
  const dispatch = useDispatch()
  const student = useSelector(state => state.student?.singleStudent)

  const loading = useSelector(state => state.student?.singleStudentLoading)

  console.log(student)

  useEffect(() => {
    if (id) {
      dispatch(fetchById(id))
    }
  }, [id, dispatch])

  useEffect(() => {
    if (student) {
      dispatch(getSchoolById(student.data.school_id))
      dispatch(getAdministrationById(student.data.degree))
    }
  }, [student, dispatch])

  if (loading) {
    return (
      <Grid container sx={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Grid item>
          <CircularProgress />
        </Grid>
      </Grid>
    )
  }

  return (
    <>
      <StudentLayout />
    </>
  )
}

export default StudentProfile
