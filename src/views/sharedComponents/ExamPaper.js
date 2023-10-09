// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports

import Question from './Question'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchQuestions } from 'src/store/apps/exams/actions'
import { CircularProgress } from '@mui/material'
import { useRouter } from 'next/router'

// Styled Box component

const ExamPaper = ({ exam, page, setAnswers, answers, id, studView }) => {
  const dispatch = useDispatch()
  const selectedExam = useSelector(state => state?.exams?.questions?.data)
  const loading = useSelector(state => state?.exams?.questionsLoading)
  const router = useRouter()
  const routeId = router.query.id

  const examId = exam?.id || id
  useEffect(() => {
    dispatch(fetchQuestions({ id: examId, page: page }))
  }, [exam, page])

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
    <Card sx={{ mt: 10 }}>
      {selectedExam &&
        selectedExam?.exam?.questions?.map((ques, index) => (
          <Box>
            <CardContent sx={{ p: theme => `${theme.spacing(3.25, 5.75, 6.25)} !important`, width: '100%' }}>
              <Box sx={{ width: '100%', mt: 5 }}>
                <Question
                  question={ques}
                  exam={selectedExam}
                  id={examId}
                  setAnswers={setAnswers}
                  answers={answers}
                  sx={{ width: '100%' }}
                  studView={studView}
                />
              </Box>
            </CardContent>

            <Divider sx={{ mx: 5, mt: 0, pt: 0 }} />
          </Box>
        ))}
    </Card>
  )
}

export default ExamPaper
