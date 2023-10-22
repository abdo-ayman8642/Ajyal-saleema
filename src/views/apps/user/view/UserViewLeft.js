// ** React Imports
import React, { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import InputAdornment from '@mui/material/InputAdornment'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import IconButton from '@mui/material/IconButton'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import { FormControl } from '@mui/material'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { editUser } from 'src/store/apps/user/actions'
import { fetchData } from 'src/store/apps/user/actions'

import CustomAvatar from 'src/@core/components/mui/avatar'
import { useDispatch } from 'react-redux'

const renderAvatarPath = ({ role, gender }) => {
  if (role === '0') {
    if (gender === 'male') return '/images/avatars/1.png'

    return '/images/avatars/2.png'
  }
  if (role === '1') {
    if (gender === 'male') return '/images/avatars/3.png'

    return '/images/avatars/4.png'
  }
  if (gender === 'male') return '/images/avatars/5.png'

  return '/images/avatars/6.png'
}

const UserViewLeft = ({ user }) => {
  const dispatch = useDispatch()
  const [openEdit, setOpenEdit] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formValues, setFormValues] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    gender: user?.gender || '',
    checked: false,
    password: ''
  })

  const handleChange = event => {
    setFormValues({ ...formValues, checked: event.target.checked })
  }

  const handleInputChange = event => {
    const { name, value } = event.target
    setFormValues({ ...formValues, [name]: value })
  }

  const handleTogglePasswordVisibility = () => {
    setShowPassword(prev => !prev)
  }

  const handleEditClose = () => {
    setOpenEdit(false)
    setFormValues({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      gender: user?.gender || '',
      checked: false,
      password: ''
    })
  }
  const handleSubmit = async e => {
    e.preventDefault()
    !formValues['checked'] && delete formValues['password']
    delete formValues['checked']
    await dispatch(editUser({ data: formValues, id: user?.id }))
    setOpenEdit(false)
    window.location.reload()
  }

  const renderUserAvatar = () => {
    if (user) {
      return (
        <CustomAvatar
          alt={user?.name}
          src={renderAvatarPath(user)}
          variant='rounded'
          sx={{ width: 120, height: 120, mb: 4 }}
        />
      )
    } else {
      return null
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent sx={{ pt: 15, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            {renderUserAvatar()}
            <Typography variant='h6' sx={{ mb: 4 }}>
              {user?.name || 'user'}
            </Typography>
          </CardContent>

          <CardContent>
            <Typography variant='h6'>تفاصيل</Typography>
            <Divider sx={{ mt: 4 }} />
            <Box sx={{ pt: 2, pb: 1 }}>
              <Box sx={{ display: 'flex', mb: 2.7 }}>
                <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                  اسم المستخدم:
                </Typography>
                <Typography variant='body2'>{user?.name}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 2.7 }}>
                <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                  بريد إلكتروني:
                </Typography>
                <Typography variant='body2'>{user?.email}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 2.7 }}>
                <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                  النوع:
                </Typography>
                <Typography variant='body2'>{user?.gender === 'male' ? 'ذكر' : 'انثى'}</Typography>
              </Box>

              <Box sx={{ display: 'flex', mb: 2.7 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>وظيفة</Typography>
                <Typography variant='body2' sx={{ textTransform: 'capitalize' }}>
                  {user?.role === '0' ? 'مسئول مميز' : user?.role === '1' ? 'مسئول' : 'متطوع'}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', mb: 2.7 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>اتصال:</Typography>
                <Typography variant='body2'> {user?.phone}</Typography>
              </Box>
            </Box>
            <Button variant='contained' color='warning' onClick={() => setOpenEdit(prev => !prev)}>
              تحديث البيانات
            </Button>
          </CardContent>

          <Dialog
            open={openEdit}
            onClose={handleEditClose}
            aria-labelledby='user-view-edit'
            sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650, p: [2, 10] } }}
            aria-describedby='user-view-edit-description'
          >
            <DialogTitle id='user-view-edit' sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
              تحرير معلومات المستخدم
            </DialogTitle>
            <DialogContent>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={6}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label='الاسم الكامل'
                      name='name'
                      value={formValues.name}
                      onChange={handleInputChange}
                      sx={{ mt: '1rem' }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type='email'
                      label='بريد إلكتروني'
                      name='email'
                      value={formValues.email}
                      onChange={handleInputChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label='اتصال'
                      name='phone'
                      value={formValues.phone}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel id='gender-label' style={{ backgroundColor: 'white', padding: '0 8px' }}>
                        نوع
                      </InputLabel>
                      <Select
                        labelId='gender-label'
                        name='gender'
                        value={formValues.gender}
                        onChange={handleInputChange}
                      >
                        <MenuItem value='male'>ذكر</MenuItem>
                        <MenuItem value='female'>أنثى</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormGroup row>
                      <FormControlLabel
                        label='تغيير كلمة المرور'
                        control={<Checkbox checked={formValues.checked} onChange={handleChange} name='checked' />}
                      />
                    </FormGroup>
                  </Grid>

                  {formValues.checked && (
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        type={showPassword ? 'text' : 'password'}
                        required
                        label='كلمة المرور الجديدة'
                        name='password'
                        value={formValues.password}
                        onChange={handleInputChange}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position='end'>
                              <IconButton onClick={handleTogglePasswordVisibility} edge='end'>
                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                      />
                    </Grid>
                  )}
                </Grid>
                <DialogActions sx={{ justifyContent: 'center' }}>
                  <Button variant='contained' sx={{ mr: 1 }} type='submit'>
                    تسجيل
                  </Button>
                  <Button variant='outlined' color='secondary' onClick={handleEditClose}>
                    الغاء
                  </Button>
                </DialogActions>
              </form>
            </DialogContent>
          </Dialog>
        </Card>
      </Grid>
    </Grid>
  )
}

export default UserViewLeft
