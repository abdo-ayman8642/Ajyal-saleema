import { useEffect, useState } from 'react'
import Radio from '@mui/material/Radio'
import Button from '@mui/material/Button'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import FormControlLabel from '@mui/material/FormControlLabel'
import { Box, Checkbox, FormGroup, TextField, Tooltip, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { deleteQuestion, fetchExamAnalysis, fetchQuestions, submitAnswers } from 'src/store/apps/exams/actions'
import ConfirmDialog from '../apps/exam/ConfirmDialog'
import { examSlice } from 'src/store/apps/exams'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import { useAuth } from 'src/hooks/useAuth'
import DeleteIcon from '@mui/icons-material/Delete'

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

  const user = useAuth()
  const { delete: deletee } = user?.user?.permissions?.exams || {}

  const avoidDuplicates = (ans, id) => {
    const uniqueAns = ans.filter(answer => answer.question_id !== id)

    return uniqueAns
  }

  const toggleDelete = () => {
    setShowDelete(!showDelete)
  }

  const handleDeleteQues = async () => {
    await dispatch(deleteQuestion(question.id))
    dispatch(fetchQuestions({ id: exam?.id || id, page: 1 }))
  }

  const handleChange = event => {
    const newValue = event.target.value

    if (question.type === 'single') {
      handleRadioChange(event)
    } else if (question.type === 'multi') {
      handleCheckBoxChange(event)
    } else {
      // Update the value state with the new value
      setValue(newValue)

      // Update the answers state for text questions
      setAnswers(prevState => ({
        ...prevState,
        answers: [
          ...avoidDuplicates(prevState.answers, question.id),
          { question_id: question.id, text_answer: newValue }
        ]
      }))
    }
  }

  const handleRadioChange = event => {
    setError(false)
    const selectedValue = event.target.value
    setValue(selectedValue)

    // Update the answers state for single-radio button questions
    setAnswers(prevState => ({
      ...prevState,
      answers: [
        ...avoidDuplicates(prevState.answers, question.id),
        { question_id: question.id, choice_id: selectedValue }
      ]
    }))
  }

  const handleCheckBoxChange = event => {
    const { id, checked } = event.target
    setValue(prevState => ({ ...prevState, [id]: checked }))

    // Update the answers state for multi-answer questions
    setAnswers(prevState => {
      const updatedAnswers = [...prevState.answers]
      const existingAnswerIndex = updatedAnswers.findIndex(
        answer => answer.question_id === question.id && answer.choice_id === id
      )

      if (checked && existingAnswerIndex === -1) {
        // Add the new answer
        updatedAnswers.push({ question_id: question.id, choice_id: id })
      } else if (!checked && existingAnswerIndex !== -1) {
        // Remove the answer if it was unchecked
        updatedAnswers.splice(existingAnswerIndex, 1)
      }

      return {
        ...prevState,
        answers: updatedAnswers
      }
    })
  }
  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant='h6' sx={{ mb: 2 }}>
        {question.content}
      </Typography>
      <FormControl error={error} sx={{ width: '100%' }}>
        {question.type === 'single' && (
          <RadioGroup aria-label='quiz' name='quiz' value={value} onChange={handleRadioChange}>
            {question.choices?.map((ans, index) => (
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
        {!studView && deletee && (
          <Tooltip title='مسح السؤال'>
            <Button
              type='submit'
              variant='outlined'
              sx={{
                mt: 3,
                fontSize: '1rem',
                fontWeight: 'bold',
                width: 'fit-content',
                color: 'red',
                borderColor: 'rgba(255,0,0,0.4)',
                display: 'flex',
                padding: '0.5rem 1rem',
                gap: '1rem',
                transition: 'all 0.5s',
                '&:hover': {
                  backgroundColor: 'rgba(255,0,0,0.05) !important',
                  borderColor: 'rgba(255,0,0,0.7) !important'
                }
              }}
              onClick={toggleDelete}
            >
              <DeleteIcon />
            </Button>
          </Tooltip>
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
