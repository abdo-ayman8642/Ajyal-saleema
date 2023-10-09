// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'

// ** Icons Imports

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'

// ** Utils Import
import { useSelector } from 'react-redux'
import { addQuestion, deleteExam, editExam, fetchQuestions } from 'src/store/apps/exams/actions'
import { useDispatch } from 'react-redux'
import AddExam from '../AddExam'
import * as yup from 'yup'
import { IconButton } from '@mui/material'
import ConfirmDialog from '../ConfirmDialog'
import AddQuestionForm from '../AddQuestionForm'
import { useAuth } from 'src/hooks/useAuth'

// ** Styled <sup> component
const Sup = styled('sup')(({ theme }) => ({
  top: '0.2rem',
  left: '-0.6rem',
  position: 'absolute',
  color: theme.palette.primary.main
}))

// ** Styled <sub> component
const Sub = styled('sub')({
  fontWeight: 400,
  fontSize: '.875rem',
  lineHeight: '1.25rem',
  alignSelf: 'flex-end'
})

const roleColors = {
  admin: 'error',
  editor: 'info',
  author: 'warning',
  maintainer: 'success',
  subscriber: 'primary'
}

const is_trueColors = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}

const LeftSide = ({ exam }) => {
  // ** States
  const exams = useSelector(state => state?.exams?.data?.data)
  const [showAdd, setShowAdd] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const dispatch = useDispatch()
  const [questionType, setQuestionType] = useState(null)
  const user = useAuth()
  const role = user?.user?.role
  const { exams: examPer } = user?.user?.permissions || {}
  const { read, add, edit, delete: deletee } = examPer

  //** Functions */
  const toggleShowDelete = () => {
    setShowDelete(!showDelete)
  }

  const toggleAdd = () => {
    setShowAdd(!showAdd)
  }

  // handle delete exam
  const handleDeleteExam = () => {
    dispatch(deleteExam(exam.id))
  }

  const handleClose = () => {
    toggleShowAdd()
  }

  const handleCloseEdit = () => {
    setShowEdit(false)
  }

  const toggleShowEdit = () => {
    setShowEdit(!showEdit)
  }

  const customizeSubmit = async data => {
    let formData = {
      content: data.question,
      exam_id: exam.id,
      choices: [
        {
          content: data.true,
          is_true: true
        },
        {
          content: data.false2,
          is_true: false
        },
        {
          content: data.false1,
          is_true: false
        },
        {
          content: data.false3,
          is_true: false
        }
      ]
    }
    await dispatch(addQuestion({ data: formData }))
    dispatch(fetchQuestions({ id: exam.id, page: 1 }))
    handleClose()
  }

  const handleEditSubmit = data => {
    let formData = {
      name: data.name,
      date: data.date
    }
    dispatch(editExam({ id: exam.id, data: formData }))
  }

  const toggleShowAdd = () => {
    setShowAdd(!showAdd)
  }

  const schemaObj = showErrors => {
    return {
      questionType: yup
        .string()
        .min(3, obj => showErrors('Exam Name', obj.value.length, obj.min))
        .required(),
      true: yup.string(),
      false1: yup.string(),
      false2: yup.string(),
      false3: yup.string()
    }
  }
  const schemaExamObj = showErrors => {
    return {
      name: yup
        .string()
        .min(3, obj => showErrors('Exam Name', obj.value.length, obj.min))
        .required(),
      date: yup.date().required()
    }
  }

  if (exam) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ pt: 10, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              <CustomAvatar
                alt='User Image'
                src='/images/exam.jpg'
                variant='rounded'
                sx={{ width: '100%', height: 120, mb: 4 }}
              />
              <Typography variant='h6' sx={{ mb: 4 }}>
                {exam.name}
              </Typography>
              <CustomChip
                skin='light'
                size='small'
                label={'لم يبدأ بعد'}
                color={roleColors[exams.role]}
                sx={{
                  borderRadius: '4px',
                  fontSize: '0.875rem',
                  textTransform: 'capitalize',
                  '& .MuiChip-label': { mt: -0.25 }
                }}
              />
            </CardContent>
            <CardContent>
              <Typography variant='h6'>التفاصيل</Typography>
              <Divider sx={{ mt: 2 }} />
              <Box sx={{ pt: 2, pb: 1 }}>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='body2' sx={{ mr: 2, color: 'text.primary' }}>
                    اسم الإمتحان :
                  </Typography>
                  <Typography variant='body2'>{exam.name}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>عدد الأسئلة :</Typography>
                  <Typography variant='body2'>{exam.TotlaNumberOfQuestions}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>عدد الطلية المشاركة :</Typography>
                  <Typography variant='body2'>{exam.TotalNumberOfStudents}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>تاريخ بدأ الإمتحان :</Typography>
                  <Typography variant='body2'>{exam.date}</Typography>
                </Box>
              </Box>
            </CardContent>

            <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-around',
                  '& button': {
                    width: '120px',
                    height: '40px'
                  }
                }}
              >
                {/* <Button variant='outlined' color='warning' startIcon={<EditIcon />} onClick={toggleShowEdit}>
                  تعديل
                </Button> */}
                {add && (
                  <Button variant='outlined' color='primary' startIcon={<AddIcon />} onClick={toggleShowAdd}>
                    إضافة
                  </Button>
                )}
                {deletee && (
                  <Button variant='outlined' color='error' startIcon={<DeleteIcon />} onClick={toggleShowDelete}>
                    مسح
                  </Button>
                )}
              </Box>
            </CardActions>
          </Card>
          <Grid item></Grid>
        </Grid>
        {showAdd && <AddQuestionForm open={showAdd} setOpen={setShowAdd} examId={exam.id} />}
        {showEdit && (
          <AddExam
            toggle={toggleShowEdit}
            open={showEdit}
            formInputs={examFormInputs}
            handleClose={handleCloseEdit}
            edit={true}
            schemaObj={schemaExamObj}
            customizeSubmit={handleEditSubmit}
            selected={exam}
          />
        )}

        {showDelete && (
          <ConfirmDialog
            open={showDelete}
            toggle={toggleShowDelete}
            confirmationType={'مسح الإمتحان'}
            dispatchFunc={handleDeleteExam}
          />
        )}
      </Grid>
    )
  } else {
    return null
  }
}

export default LeftSide
