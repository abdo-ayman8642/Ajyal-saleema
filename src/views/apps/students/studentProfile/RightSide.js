import React, { useEffect, useState } from 'react'
import { Stepper, Step, StepLabel, Button, Box } from '@mui/material'
import ExamPaper from 'src/views/sharedComponents/ExamPaper'
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'
import { submitAnswers } from 'src/store/apps/exams/actions'

function RightSide({ id, studentId, taken, total_num }) {
  //** stats && variables */
  const [activeStep, setActiveStep] = useState(0)
  const [counter, setCounter] = useState(1)
  const [answers, setAnswers] = useState({ exam_id: id, student_id: studentId, answers: [] })
  const dispatch = useDispatch()

  //** Functions */
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const steps = Array.from({ length: Math.ceil(total_num / 10) }, () => '')

  const CustomStepper = styled(Stepper)(({ theme }) => ({
    '& .MuiStepLabel-label': {
      fontSize: theme.breakpoints.down('sm') ? '0.6rem' : undefined
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1)
    }
  }))

  function getStepContent(step) {
    return (
      <ExamPaper
        page={step + 1}
        id={id}
        setCounter={setCounter}
        setAnswers={setAnswers}
        counter={counter}
        answers={answers}
        studView={true}
      />
    )
  }

  return (
    <div style={{ marginTop: '4rem' }}>
      {!taken ? (
        <>
          <CustomStepper activeStep={activeStep}>
            {steps?.map((label, index) => {
              const stepProps = {}
              const labelProps = {}

              return (
                <Step key={Math.random()} {...stepProps}>
                  <StepLabel {...labelProps}></StepLabel>
                </Step>
              )
            })}
          </CustomStepper>
          <div>
            {activeStep === steps.length ? (
              <div>
                <p>All pages completed</p>
              </div>
            ) : (
              <div>
                <>{getStepContent(activeStep)}</>
                <Box sx={{ mt: 3, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Box>
                    <Button disabled={activeStep === 0} onClick={handleBack}>
                      Back
                    </Button>
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={handleNext}
                      disabled={activeStep === steps.length - 1 ? true : false}
                      sx={{ ml: 4 }}
                    >
                      {activeStep === steps.length - 1 ? 'Finish' : 'التالي'}
                    </Button>
                  </Box>
                  <Button
                    variant='contained'
                    color='primary'
                    disabled={answers?.answers?.length !== total_num && true}
                    onClick={() => dispatch(submitAnswers({ data: answers }))}
                  >
                    إنتهاء الإختبار
                  </Button>
                </Box>
              </div>
            )}
          </div>
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: '5rem' }}>
          <div style={{ paddingBottom: '2rem', fontSize: '1.5rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
            Already Took This Exam
          </div>
          <img src='/undraw_done_re_oak4.svg' alt='Description of the illustration' style={{ width: '100%' }} />
        </div>
      )}
    </div>
  )
}

export default RightSide
