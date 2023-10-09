import { CircularProgress, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { fetchData as fetchExamData } from 'src/store/apps/exams/actions'
import { fetchById as fetchStudentId } from 'src/store/apps/student/actions'
import TabsFullWidth from './TabsCentered'

function StudentLayout() {
  //** stats && variables */
  const dispatch = useDispatch()
  const loading = useSelector(state => state.exams?.dataLoading)
  const exams = useSelector(state => state?.exams?.data?.data)
  const student = useSelector(state => state.student.singleStudent?.data) || {}

  useEffect(() => {
    dispatch(fetchExamData())
    dispatch(fetchStudentId())
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

  return (
    <Grid container>
      <Grid item xs={12} md={12}>
        <TabsFullWidth exams={exams} student={student} />
      </Grid>
    </Grid>
  )
}

export default StudentLayout
