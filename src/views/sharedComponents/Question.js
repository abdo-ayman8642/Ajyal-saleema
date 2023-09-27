import { useEffect, useState } from 'react'
import Radio from '@mui/material/Radio'
import Button from '@mui/material/Button'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import FormControlLabel from '@mui/material/FormControlLabel'
import { Box, Checkbox, FormGroup, TextField, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { deleteQuestion, fetchExamAnalysis, fetchQuestions, submitAnswers } from 'src/store/apps/exams/actions'
import ConfirmDialog from '../apps/exam/ConfirmDialog'
import { examSlice } from 'src/store/apps/exams'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'

const StyledFormGroup = styled(FormGroup)`
  margin-top: 20px;
`

const Question = ({ question, exam, setAnswers, answers, studView, id }) => {
  //** stats & variables */
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const [helperText, setHelperText] = useState('')
  const [showDelete, setShowDelete] = useState(false)
  const student = useSelector(state => state.student?.singleStudent)
  const dispatch = useDispatch()
  const router = useRouter()
  const routeId = router.query.id
  useEffect(() => {
    // const trueChoice = question.choices.find(c => c.is_true === 1)
    // if (trueChoice) {
    //   if (!routeId) {
    //     setValue(trueChoice.id)
    //   }
    // }
  }, [exam])

  //** functions */

  const avoidDuplicates = (ans, id) => {
    const uniqueAns = ans.filter(answer => answer.question_id !== id)

    return uniqueAns
  }

  const handleChange = event => {
    if (question.type === 'single') {
      handleRadioChange(event)
    } else if (question.type === 'multi') {
      handleCheckBoxChange(event)
    } else {
      setValue(event.target.value)
    }

    if (routeId) {
      setAnswers(prevState => ({
        ...prevState,
        answers: [...avoidDuplicates(prevState.answers, question.id), { question_id: question.id, choice_id: value }]
      }))
      console.log(answers)
    }
  }

  const handleRadioChange = event => {
    setError(false)
    console.log(event.target.value)
    console.log(answers)
    setValue(event.target.value)
  }

  const handleCheckBoxChange = event => {
    console.log(event.target)
    const { id, checked } = event.target
    console.log(id, checked)
    setValue(prevState => ({ ...prevState, [id]: checked }))
  }

  const toggleDelete = () => {
    setShowDelete(!showDelete)
  }

  const handleDeleteQues = async () => {
    await dispatch(deleteQuestion(question.id))
    dispatch(fetchQuestions({ id: exam?.id || id, page: 1 }))
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant='h6' sx={{ mb: 2 }}>
        {question.content}
      </Typography>
      <FormControl error={error} sx={{ width: '100%' }}>
        {question.type === 'single' && (
          <RadioGroup aria-label='quiz' name='quiz' value={value} onChange={handleRadioChange}>
            {question.choices.map((ans, index) => (
              <FormControlLabel key={index} value={ans.id} control={<Radio />} label={ans.content} />
            ))}
          </RadioGroup>
        )}
        {question.type === 'multi' && (
          <StyledFormGroup column>
            {question.choices?.map(q => (
              <FormControlLabel
                sx={{ marginBottom: '5px' }}
                label={q.content}
                control={<Checkbox checked={value[q.id] || false} onChange={handleChange} id={q.id} />}
                key={q.id}
              />
            ))}
          </StyledFormGroup>
        )}
        {question.type === 'text' && (
          <FormControl sx={{ mb: 6, width: '100%' }} key={question.id}>
            <TextField
              multiline
              minRows={5}
              fullWidth
              type='text'
              value={value}
              label={'الإجابة'}
              onChange={handleChange}
              sx={{ width: '100%' }}
            />
          </FormControl>
        )}
        <FormHelperText>{helperText}</FormHelperText>
        {!studView && (
          <Button
            type='submit'
            variant='outlined'
            sx={{ mt: 3, fontSize: '1rem', fontWeight: 'bold', width: '30%' }}
            onClick={toggleDelete}
          >
            مسح السؤال
          </Button>
        )}
      </FormControl>

      <ConfirmDialog
        open={showDelete}
        toggle={toggleDelete}
        confirmationType={'السؤال'}
        dispatchFunc={handleDeleteQues}
      />
    </Box>
  )
}

export default Question
