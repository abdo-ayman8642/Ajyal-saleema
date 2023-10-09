// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

const LeftSide = ({ student }) => {
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
      </Grid>
    )
  } else {
    return null
  }
}

export default LeftSide
