import React, { useEffect, useState } from 'react'
import { Stepper, Step, StepLabel, Button, Box } from '@mui/material'
import ExamPaper from 'src/views/sharedComponents/ExamPaper'
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'
import { submitAnswers } from 'src/store/apps/exams/actions'

function RightSide({ id, studentId, taken }) {
  console.log('taken', taken)
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

  const steps = ['Page 1', 'Page 2', 'Page 3', 'Page 4', 'Page 5']

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
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
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
                    >
                      {activeStep === steps.length - 1 ? 'Finish' : 'التالي'}
                    </Button>
                  </Box>
                  <Button
                    variant='contained'
                    color='primary'
                    disabled={activeStep !== steps.length - 1 ? true : false}
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
        <div style={{ textAlign: 'center' }}>Already Took This Exam</div>
      )}
    </div>
  )
}

export default RightSide
