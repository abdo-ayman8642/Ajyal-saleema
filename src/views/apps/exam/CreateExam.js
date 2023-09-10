// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrations from 'src/views/pages/misc/FooterIllustrations'
import { IconButton } from '@mui/material'
import { useState } from 'react'
import AddExam from './AddExam'
import { addExam } from 'src/store/apps/exams/actions'
import { useDispatch } from 'react-redux'
import * as yup from 'yup'

// ** Styled Components
const BoxWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '90vw'
  }
}))

const Img = styled('img')(({ theme }) => ({
  marginTop: theme.spacing(15),
  marginBottom: theme.spacing(15),
  [theme.breakpoints.down('lg')]: {
    height: 450,
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(10)
  },
  [theme.breakpoints.down('md')]: {
    height: 400
  }
}))

const CreateExam = () => {
  /** stats and variables */
  const [showAdd, setShowAdd] = useState(false)
  const dispatch = useDispatch()

  /** Functions */
  const toggleShowAdd = () => {
    setShowAdd(!showAdd)
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

  const schemaObj = showErrors => {
    return {
      name: yup
        .string()
        .min(3, obj => showErrors('Exam Name', obj.value.length, obj.min))
        .required(),
      date: yup.date().required()
    }
  }

  const customizeSubmit = data => {
    let formData = {
      name: data.name,
      date: data.date
    }
    dispatch(addExam({ data: formData }))
    handleClose()
  }

  const handleClose = () => {
    toggleShowAdd()
  }

  return (
    <Box className='content-center'>
      <Box sx={{ p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <BoxWrapper>
          <Typography variant='h5' sx={{ mb: 2.5, fontSize: '1.5rem !important' }}>
            لا يوحد امتحانات بعد ...
          </Typography>
          <Typography variant='body2'>تستطيع إضافة امتحان من الزر في الأسفل</Typography>
        </BoxWrapper>
        <Img alt='error-illustration' src='/images/pages/misc-under-maintenance.png' />

        <IconButton sx={{ width: '25%' }} onClick={() => toggleShowAdd()}>
          <Button component='a' variant='contained' sx={{ mb: 2, fontSize: '1rem', fontWeight: 'bold', width: '100%' }}>
            إضافة امتحان
          </Button>
        </IconButton>
      </Box>
      <FooterIllustrations image='/images/pages/misc-401-object.png' />
      {showAdd && (
        <AddExam
          open={showAdd}
          formInputs={formInputs}
          title={'إضافة امتحان'}
          customizeSubmit={customizeSubmit}
          handleClose={handleClose}
          schemaObj={schemaObj}
        />
      )}
    </Box>
  )
}

export default CreateExam
