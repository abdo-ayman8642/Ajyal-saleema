import { CircularProgress, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { addExam, fetchData } from 'src/store/apps/exams/actions'
import AddExam from 'src/views/apps/exam/AddExam'
import CreateExam from 'src/views/apps/exam/CreateExam'
import TabsCentered from 'src/views/apps/exam/TabsCentered'
import * as yup from 'yup'
import { useAuth } from 'src/hooks/useAuth'
import NoPermissionComponent from 'src/views/apps/permissions/noAccess'
import PageHeader from 'src/views/apps/exam/PageHeader'

function Exams() {
  //** stats && variables */
  const dispatch = useDispatch()
  const loading = useSelector(state => state.exams?.dataLoading)
  const exams = useSelector(state => state?.exams?.data?.data)
  const [showAdd, setShowAdd] = useState(false)
  const user = useAuth()
  const { read, add } = user?.user?.permissions?.exams || {}
  const { exams: view } = user?.user?.permissions?.nav || {}

  useEffect(() => {
    dispatch(fetchData())
  }, [dispatch])

  const toggleAdd = () => {
    setShowAdd(!showAdd)
  }

  const handleClose = () => {
    setShowAdd(false)
  }

  const formInputs = [
    {
      name: 'name',
      label: 'Name',
      type: 'text'
    },
    {
      name: 'date',
      label: 'Date',
      type: 'date'
    }
  ]

  const customizeSubmit = data => {
    let formData = {
      name: data.name,
      date: data.date
    }
    dispatch(addExam({ data: formData }))
    handleClose()
  }

  const schemaObj = showErrors => {
    return {
      name: yup
        .string()
        .min(3, obj => showErrors('Exam Name', obj.value.length, obj.min))
        .required(),
      date: yup.date().required()
    }
  }

  if (loading) {
    return (
      <Grid container sx={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Grid item>
          <CircularProgress />
        </Grid>
      </Grid>
    )
  }

  if (!exams || exams.length === 0) {
    if (add) return <CreateExam />

    return (
      <div style={{ textAlign: 'center', padding: '5rem' }}>
        <div style={{ paddingBottom: '2rem', fontSize: '1.5rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
          لم تتم إضافة أي سؤال حتى الآن
        </div>
        <img
          src='/undraw_no_data_re_kwbl.svg'
          alt='Description of the quiz had no questions'
          style={{ width: '60%' }}
        />
      </div>
    )
  }

  return (
    <>
      {read && view ? (
        <Grid container>
          {add && (
            <Grid item xs={12} md={12}>
              <PageHeader toggleAdd={toggleAdd} />
            </Grid>
          )}

          <Grid item xs={12} md={12}>
            <TabsCentered exams={exams} />
          </Grid>
          {showAdd && (
            <AddExam
              toggle={toggleAdd}
              open={showAdd}
              formInputs={formInputs}
              handleClose={handleClose}
              customizeSubmit={customizeSubmit}
              schemaObj={schemaObj}
              title={'إضافة امتحان'}
            />
          )}
        </Grid>
      ) : (
        <NoPermissionComponent featureName='Exams' />
      )}
    </>
  )
}

export default Exams
