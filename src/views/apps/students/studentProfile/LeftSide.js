// ** React Imports
import { useEffect, useState } from 'react'

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
import { fetchById } from 'src/store/apps/student/actions'

// ** Utils Import
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import * as yup from 'yup'
import { IconButton } from '@mui/material'
import { useRouter } from 'next/router'

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

const LeftSide = ({}) => {
  // ** States

  const school = useSelector(state => state.academicData.singleSchool?.data) || {}
  const administration = useSelector(state => state.academicData.singleAdministration?.data) || {}
  const student = useSelector(state => state.student.singleStudent?.data) || {}
  const [showAdd, setShowAdd] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()
  const { id } = router.query
  console.log(id)
  console.log(student)

  useEffect(() => {
    console.log('id: ' + id)
    dispatch(fetchById(id))
  }, [dispatch])
  // const dispatch = useDispatch()

  // // const handleEditSubmit = data => {
  // //   let formData = {
  // //     name: data.name,
  // //     date: data.date
  // //   }
  // //   dispatch(editstudent({ id: student.id, data: formData }))
  // // }

  // // const toggleShowAdd = () => {
  // //   setShowAdd(!showAdd)
  // // }

  const schemaObj = showErrors => {
    return {
      question: yup
        .string()
        .min(3, obj => showErrors('student Name', obj.value.length, obj.min))
        .required(),
      true: yup.string().required(),
      false1: yup.string().required(),
      false2: yup.string().required(),
      false3: yup.string().required()
    }
  }
  // const schemastudentObj = showErrors => {
  //   return {
  //     name: yup
  //       .string()
  //       .min(3, obj => showErrors('student Name', obj.value.length, obj.min))
  //       .required(),
  //     date: yup.date().required()
  //   }
  // }

  if (student) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ pt: 10, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              <CustomAvatar
                alt='User Image'
                src='/images/singleStudent.jpg'
                variant='rounded'
                sx={{ width: '80%', height: 250, mb: 4 }}
              />
              <Typography variant='h6' sx={{ mb: 4 }}>
                {student.name}
              </Typography>
              <CustomChip
                skin='light'
                size='small'
                label={'الطالب'}
                color='primary'
                sx={{
                  borderRadius: '5px',
                  fontSize: '1rem',
                  textTransform: 'capitalize',
                  p: 3,
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
                    اسم الطالب :
                  </Typography>
                  <Typography variant='body2'>{student.name}</Typography>
                </Box>
                {/* <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>السن :</Typography>
                  <Typography variant='body2'>{student.age}</Typography>
                </Box> */}
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}> المحافظة :</Typography>
                  <Typography variant='body2'>{student.city}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>المدرسة: </Typography>
                  <Typography variant='body2'>{student.school}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>نوع التعلم: </Typography>
                  <Typography variant='body2'>{student.type == 'school' ? 'مدارس' : 'معسكر'}</Typography>
                </Box>
                {student.type === 'school' && (
                  <>
                    <Box sx={{ display: 'flex', mb: 2.7 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>المرحلة الدراسية : </Typography>
                      <Typography variant='body2'>{student.grade}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 2.7 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}> الفصل : </Typography>
                      <Typography variant='body2'>{student.class}</Typography>
                    </Box>
                  </>
                )}
              </Box>
            </CardContent>

            <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  '& button': {
                    width: '120px',
                    height: '40px'
                  }
                }}
              ></Box>
            </CardActions>
          </Card>
          <Grid item></Grid>
        </Grid>
        {showAdd && (
          <Addstudent
            toggle={toggleAdd}
            open={showAdd}
            formInputs={formInputs}
            title={'إضافة سؤال جديد'}
            handleClose={handleClose}
            customizeSubmit={customizeSubmit}
            schemaObj={schemaObj}
          />
        )}
        {/* {showEdit && (
          <Addstudent
            toggle={toggleShowEdit}
            open={showEdit}
            formInputs={studentFormInputs}
            handleClose={handleCloseEdit}
            edit={true}
            schemaObj={schemastudentObj}
            customizeSubmit={handleEditSubmit}
            selected={student}
          />
        )}

        {showDelete && (
          <ConfirmDialog
            open={showDelete}
            toggle={toggleShowDelete}
            confirmationType={'مسح الإمتحان'}
            dispatchFunc={handleDeletestudent}
          />
        )} */}
      </Grid>
    )
  } else {
    return null
  }
}

export default LeftSide
