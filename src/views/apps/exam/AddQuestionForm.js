// ** React Imports
import { useState, forwardRef, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import Fade from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

/** import libraries */
import * as yup from 'yup'
import AddIcon from '@mui/icons-material/Add'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import {
  Button,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material'
import { addQuestion } from 'src/store/apps/exams/actions'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const defaultValues = {
  questionType: ''
}

const AddQuestionForm = ({ open, setOpen, examId }) => {
  const schema = yup.object().shape({
    questionType: yup.string()
  })

  const {
    watch,
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  // states
  const [typeClicked, setTypeClicked] = useState(false)
  const selectedType = watch('questionType')
  const selectedAnswersNum = watch('answersNumbers')
  const dispatch = useDispatch()

  const [formInputs, setFormInputs] = useState([
    {
      name: 'question',
      label: 'السؤال',
      type: 'text',
      multiline: true,
      id: 'ques'
    }
  ])

  /** Functions */
  const showErrors = (field, valueLen, min) => {
    if (valueLen === 0) {
      return `${field} field is required`
    } else if (valueLen > 0 && valueLen < min) {
      return `${field} must be at least ${min} characters`
    } else {
      return ''
    }
  }

  const createFormInputs = quesNum => {
    const formInputs = []

    for (let i = 1; i <= quesNum; i++) {
      const input = {
        name: `answer${i}`,
        id: i,
        label: `الإجابة رقم ${i}`,
        type: `text`
      }
      formInputs.push(input)
    }

    return formInputs
  }

  // handle set formInput state
  const onTypeClick = () => {
    setTypeClicked(true)
    setFormInputs(prevState => [...prevState, ...createFormInputs(selectedAnswersNum)])
  }

  const handleClose = () => {
    setOpen(!open)
    reset()
  }

  const onSubmit = data => {
    let formData

    if (selectedType === 'multi' || selectedType === 'single') {
      formData = {
        type: data.questionType,
        exam_id: examId,
        content: data.question,
        choices: createFormInputs(selectedAnswersNum).map((ans, index) => ({
          content: data[`answer${index + 1}`]
        }))
      }
    } else {
      formData = {
        type: data.questionType,
        exam_id: examId,
        content: data.question
      }
    }

    dispatch(addQuestion({ data: formData }))
    reset()
    handleClose()
  }

  return (
    <Dialog fullWidth open={open} maxWidth='sm' scroll='body' onClose={handleClose} TransitionComponent={Transition}>
      <DialogContent sx={{ pb: 6, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
        <IconButton
          size='small'
          onClick={() => handleClose()}
          sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
        >
          <Close />
        </IconButton>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem', mb: 10 }}>
            إضافة سؤال
          </Typography>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name={'questionType'}
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Box>
                  <InputLabel id={`questionType-select-label`}>{'نوع السؤال'}</InputLabel>
                  <Select
                    fullWidth
                    value={value}
                    id={`questionType-select`}
                    label={'نوع السؤال'}
                    labelId={`questionType-select-label`}
                    onChange={onChange}
                    inputProps={{ placeholder: `Select QuestionType` }}
                    disabled={typeClicked}
                  >
                    <MenuItem value={'multi'}>{'أكثر من إجابة'}</MenuItem>
                    <MenuItem value={'single'}>{'إجابة واحدة'}</MenuItem>
                    <MenuItem value={'text'}>{'مقالي'}</MenuItem>
                  </Select>
                </Box>
              )}
            />
            {errors['questionType'] && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors['questionType'].message}</FormHelperText>
            )}
          </FormControl>
          {(selectedType === 'multi' || selectedType === 'single') && (
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name={'answersNumbers'}
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    type='number'
                    value={value}
                    label={'عدد الإجابات'}
                    onChange={onChange}
                    error={Boolean(errors.email)}
                    disabled={typeClicked}
                  />
                )}
              />
              {errors['answersNumbers'] && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors['answersNumbers'].message}</FormHelperText>
              )}
            </FormControl>
          )}

          {typeClicked &&
            formInputs.map(fi => (
              <FormControl fullWidth sx={{ mb: 6 }} key={fi.id}>
                <Controller
                  name={fi.name}
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      multiline={fi.multiline}
                      minRows={fi.multiline && 3}
                      type={fi.type}
                      value={value}
                      label={fi.label}
                      onChange={onChange}
                      error={Boolean(errors.email)}
                    />
                  )}
                />
                {errors[fi.name] && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors[fi.name].message}</FormHelperText>
                )}
              </FormControl>
            ))}
          <Box sx={{ display: 'flex', gap: '20px' }}>
            {!typeClicked && (
              <Button variant='outlined' color='primary' startIcon={<AddIcon />} onClick={() => onTypeClick()}>
                إضافة الإجابات
              </Button>
            )}
            <Button
              type='submit'
              size='large'
              variant='contained'
              sx={{ fontSize: '1rem', letterSpacing: '2px', flex: '1' }}
            >
              إضافة السؤال
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddQuestionForm
