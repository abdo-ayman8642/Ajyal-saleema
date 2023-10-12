import React, { useState } from 'react'
import { Stepper, Step, StepLabel, Button, Box } from '@mui/material'
import ExamPaper from 'src/views/sharedComponents/ExamPaper'
import styled from '@emotion/styled'

function RightSide({ buttonVisibility, exam }) {
  //** stats && variables */
  const [activeStep, setActiveStep] = useState(0)

  //** Functions */
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const total_num = exam?.TotlaNumberOfQuestions || 0

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
    return <ExamPaper page={step + 1} exam={exam} />
  }

  console.log(exam)

  return (
    <div>
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
          <div style={{ textAlign: 'center', padding: '5rem' }}>
            <div
              style={{ paddingBottom: '2rem', fontSize: '1.5rem', textTransform: 'uppercase', letterSpacing: '2px' }}
            >
              No Question Added Yet
            </div>
            <img
              src='/undraw_no_data_re_kwbl.svg'
              alt='Description of the quiz had no questions'
              style={{ width: '60%' }}
            />
          </div>
        ) : (
          <div>
            <>{getStepContent(activeStep)}</>
            <Box sx={{ mt: 3 }}>
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
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </div>
        )}
      </div>
    </div>
  )
}

export default RightSide
