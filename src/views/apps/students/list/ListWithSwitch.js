import { useEffect, useState } from 'react'
import { Checkbox, CircularProgress, FormControlLabel, FormGroup, Typography, styled } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { fetchData } from 'src/store/apps/sessions/actions'
import { getAttendance, setAbsence, setAttendance } from 'src/store/apps/student/actions'

const StyledFormGroup = styled(FormGroup)`
  margin-top: 20px;
`

const ListWithCheckBox = () => {
  const [checkboxValues, setCheckboxValues] = useState({})

  const sessions = useSelector(state => state.sessions?.data.data)
  const selectedStudent = useSelector(state => state.student?.selectedStudent)
  const attendance = useSelector(state => state.student?.attendance)
  const dispatch = useDispatch()
  const [reload, setReload] = useState(false)

  useEffect(() => {
    handleLoading()
    dispatch(fetchData())
  }, [selectedStudent])

  useEffect(() => {
    if (attendance) {
      attendance?.forEach(s => {
        if (s.attendance) {
          setCheckboxValues(prevState => ({ ...prevState, [s.session_id]: true }))
        }
      })
    }
  }, [selectedStudent, attendance])

  const handleChange = event => {
    const { id, checked } = event.target
    setCheckboxValues(prevState => ({ ...prevState, [id]: checked }))
    if (checked) {
      dispatch(setAttendance({ sessionId: id, studentId: selectedStudent.id }))
    } else {
      dispatch(setAbsence({ sessionId: id, studentId: selectedStudent.id }))
    }
  }

  const handleLoading = () => {
    setReload(true)
    setTimeout(() => {
      setReload(false)
    }, 1000)
  }

  if (reload) {
    return <CircularProgress color='inherit' />
  }

  return (
    <StyledFormGroup column>
      {sessions?.map(s => (
        <FormControlLabel
          sx={{ justifyContent: 'space-between', marginBottom: '10px' }}
          label={s.name}
          control={<Checkbox checked={checkboxValues[s.id] || false} onChange={handleChange} id={s.id} />}
          key={s.id}
        />
      ))}
    </StyledFormGroup>
  )
}

export default ListWithCheckBox
