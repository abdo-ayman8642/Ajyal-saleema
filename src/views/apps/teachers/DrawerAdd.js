// ** React Imports
import { useState, useEffect, useRef } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'
import { handleSelectedTeacher } from 'src/store/apps/teachers'
import FormDate from 'src/views/sharedComponents/FormDate'
import { addTeacher, assignTeacher } from 'src/store/apps/teachers/actions'
import {
  fetchAdministrations,
  fetchClasses,
  fetchGovs,
  fetchGrades,
  fetchSchools,
  fetchYears
} from 'src/store/apps/academicData/actions'

//** handle errors in form Validations

const showErrors = (field, valueLen, min) => {
  if (valueLen === 0) {
    return `${field} field is required`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else {
    return ''
  }
}

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

//**  Form Validation
const schema = yup.object().shape({
  name: yup
    .string()
    .min(3, obj => showErrors('First Name', obj.value.length, obj.min))
    .required('Please enter a valid name'),
  year: yup.string().required(),
  gov: yup.string().required(),
  administr: yup.string().required(),
  type: yup.string().required(),
  school: yup.string().required(),
  grade: yup.string().required(),
  class: yup.string().required()
})

const defaultValues = {
  name: '',
  birthDate: new Date(), // * how do the back-end wants the date ? */
  year: '',
  gov: '',
  administr: '',
  type: '',
  school: '',
  grade: '',
  class: '',
  gender: ''
}

const SidebarAddTeacher = props => {
  // ** Props
  const { open, toggle, teacherId = null } = props
  console.log(teacherId)

  // ** Hooks
  const dispatch = useDispatch()

  const {
    reset,
    control,
    setValue,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  // ** State & variables
  const selectedYear = watch('year')
  const selectedGov = watch('gov')
  const selectedAdminstr = watch('administr')
  const selectedSchool = watch('school')
  const selectedGrade = watch('grade')
  const selectedType = watch('type')
  const years = useSelector(state => state.academicData?.years?.data)
  const govs = useSelector(state => state.academicData?.govs?.data)
  const administration = useSelector(state => state.academicData?.administrations?.data)
  const schools = useSelector(state => state.academicData?.schools)
  const grades = useSelector(state => state.academicData?.grades?.data)
  const classes = useSelector(state => state.academicData?.classes?.data)
  const selectedClass = watch('class')
  const genderref = useRef(0)
  const [text, setText] = useState('')
  const [formData, setFormData] = useState({ type: '', classes: null, schools: null })

  useEffect(() => {
    dispatch(fetchYears())
  }, [selectedYear])

  useEffect(() => {
    if (selectedYear) {
      dispatch(fetchGovs(1))
    }
    if (selectedGov) {
      dispatch(fetchAdministrations({ page: 1, cityId: selectedGov, yearId: selectedYear }))
    }
    if (selectedAdminstr) {
      if (selectedType === 'camp') {
        dispatch(fetchSchools({ id: selectedAdminstr, type: selectedType }))
      } else if (selectedType === 'school') {
        dispatch(fetchSchools({ id: selectedAdminstr, type: selectedType }))
        if (selectedSchool) {
          dispatch(fetchGrades())
        }
        if (selectedGrade) {
          dispatch(fetchClasses({ gradeId: selectedGrade, schoolId: selectedSchool, page: 1 }))
        }
      }
    }
  }, [selectedYear, selectedGov, selectedAdminstr, selectedGrade, selectedSchool, selectedType])

  //** Functions */
  const onSubmit = e => {
    console.log(formData)

    const schoolType = formData.type === 'camp' ? 'schools' : 'classes'
    let formDataInputs = {
      name: text,
      teacher_id: teacherId?.[0],
      gender: genderref?.current?.value,
      [schoolType]: formData[schoolType]

      // [schoolType]: [{ id: data.class }]
    }
    console.log(formDataInputs)
    teacherId ? dispatch(assignTeacher({ data: formDataInputs })) : dispatch(addTeacher({ data: formDataInputs }))
    handleClose()
  }

  const handleClose = () => {
    dispatch(handleSelectedTeacher(null))
    toggle()
    reset()
  }

  const updateType = type => {
    setFormData(prev => {
      return {
        ...prev,
        type
      }
    })
  }

  const updateSchool = schools => {
    setFormData(prev => {
      return {
        ...prev,
        schools
      }
    })
  }

  const updateClasses = classes => {
    setFormData(prev => {
      return {
        ...prev,
        classes
      }
    })
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h5'>{teacherId ? 'Assign New Class' : 'Add Teacher'}</Typography>
        <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
      </Header>
      {teacherId && (
        <Typography variant='h7' sx={{ textAlign: 'center' }}>
          {`Teacher:  `}
          <span style={{ textDecoration: 'underline' }}>{teacherId && `${teacherId?.[1]}`}</span>
        </Typography>
      )}

      <Box sx={{ p: 5 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {!teacherId && (
            <>
              <FormControl fullWidth sx={{ mb: 6 }}>
                <Controller
                  name='name'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      label='Full Name'
                      onChange={e => {
                        e.preventDefault()
                        setText(e.target.value)
                      }}
                      placeholder='Enter your name'
                      value={text}
                      error={Boolean(errors.fullName)}
                    />
                  )}
                />
                {errors.name && <FormHelperText sx={{ color: 'error.main' }}>{errors.name.message}</FormHelperText>}
              </FormControl>

              <FormControl fullWidth sx={{ mb: 6 }}>
                <Controller
                  name='gender'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <Box>
                      <InputLabel id='gender-select-label'>Gender</InputLabel>
                      <Select
                        fullWidth
                        value={value}
                        id='gender-select'
                        label='Gender'
                        labelId='gender-select-label'
                        inputRef={genderref}
                        onChange={onChange}
                        inputProps={{ placeholder: 'Select Gender' }}
                      >
                        <MenuItem value='male'>Male</MenuItem>
                        <MenuItem value='female'>Female</MenuItem>
                      </Select>
                    </Box>
                  )}
                />
                {errors.gender && <FormHelperText sx={{ color: 'error.main' }}>{errors.gender.message}</FormHelperText>}
              </FormControl>
            </>
          )}
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='year'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Box>
                  <InputLabel id='year-select-label'>Academic year</InputLabel>
                  <Select
                    fullWidth
                    value={value}
                    id='year-select'
                    label='Academic year'
                    labelId='year-select-label'
                    onChange={onChange}
                    inputProps={{ placeholder: 'Select year' }}
                  >
                    {years?.map(y => (
                      <MenuItem value={y.id} key={y.id}>
                        {y.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              )}
            />
            {errors.year && <FormHelperText sx={{ color: 'error.main' }}>{errors.year.message}</FormHelperText>}
          </FormControl>
          {selectedYear && (
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='gov'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <Box>
                    <InputLabel id='gov-select-label'>Select governorate</InputLabel>
                    <Select
                      fullWidth
                      value={value}
                      id='gov-select'
                      label='Select governorate'
                      labelId='gov-select-label'
                      onChange={onChange}
                      inputProps={{ placeholder: 'Select governorate' }}
                    >
                      {govs?.map(g => (
                        <MenuItem value={g.id} key={g.id}>
                          {g.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                )}
              />
              {errors.gov && <FormHelperText sx={{ color: 'error.main' }}>{errors.gov.message}</FormHelperText>}
            </FormControl>
          )}

          {selectedGov && (
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='administr'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <Box>
                    <InputLabel id='adminstr-select-label'>Select administration</InputLabel>
                    <Select
                      fullWidth
                      value={value}
                      id='adminstr-select'
                      label='Select administration'
                      labelId='adminstr-select-label'
                      onChange={onChange}
                      inputProps={{ placeholder: 'Select administration' }}
                    >
                      {administration?.map(ad => (
                        <MenuItem value={ad.id} key={ad.id}>
                          {ad.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                )}
              />

              {errors.administr && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.administr.message}</FormHelperText>
              )}
            </FormControl>
          )}

          {selectedAdminstr && (
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='type'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <Box>
                    <InputLabel id='type-select-label'>إختيار النوع</InputLabel>
                    <Select
                      fullWidth
                      value={value}
                      id='type-select'
                      label='إختيار النوع'
                      labelId='school-select-label'
                      onChange={onChange}
                      inputProps={{ placeholder: 'إختيار النوع' }}
                    >
                      <MenuItem
                        value={'camp'}
                        onClick={() => {
                          updateType('camp')
                        }}
                      >
                        كامب
                      </MenuItem>
                      <MenuItem
                        value={'school'}
                        onClick={() => {
                          updateType('school')
                        }}
                      >
                        مدرسة
                      </MenuItem>
                    </Select>
                  </Box>
                )}
              />
              {errors.school && <FormHelperText sx={{ color: 'error.main' }}>{errors.school.message}</FormHelperText>}
            </FormControl>
          )}

          {selectedType && (
            <>
              {selectedType === 'camp' ? (
                <FormControl fullWidth sx={{ mb: 6 }}>
                  <Controller
                    name='school'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Box>
                        <InputLabel id='school-select-label'>Select school</InputLabel>
                        <Select
                          fullWidth
                          value={value}
                          id='school-select'
                          label='Select school'
                          labelId='school-select-label'
                          onChange={onChange}
                          inputProps={{ placeholder: 'Select school' }}
                        >
                          {schools?.map(s => (
                            <MenuItem value={s.id} key={s.id} onClick={() => updateSchool(s.id)}>
                              {s.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </Box>
                    )}
                  />
                  {errors.school && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.school.message}</FormHelperText>
                  )}
                </FormControl>
              ) : (
                <>
                  <FormControl fullWidth sx={{ mb: 6 }}>
                    <Controller
                      name='school'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <Box>
                          <InputLabel id='school-select-label'>Select school</InputLabel>
                          <Select
                            fullWidth
                            value={value}
                            id='school-select'
                            label='Select school'
                            labelId='school-select-label'
                            onChange={onChange}
                            inputProps={{ placeholder: 'Select school' }}
                          >
                            {schools?.map(s => (
                              <MenuItem value={s.id} key={s.id} onClick={() => updateSchool(s.id)}>
                                {s.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </Box>
                      )}
                    />
                    {errors.school && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.school.message}</FormHelperText>
                    )}
                  </FormControl>
                  {selectedSchool && (
                    <FormControl fullWidth sx={{ mb: 6 }}>
                      <Controller
                        name='grade'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <Box>
                            <InputLabel id='grade-select-label'>Select grade</InputLabel>
                            <Select
                              fullWidth
                              value={value}
                              id='grade-select'
                              label='Select grade'
                              labelId='grade-select-label'
                              onChange={onChange}
                              inputProps={{ placeholder: 'Select grade' }}
                            >
                              {grades?.map(g => (
                                <MenuItem value={g.id} key={g.id}>
                                  {g.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </Box>
                        )}
                      />
                      {errors.grade && (
                        <FormHelperText sx={{ color: 'error.main' }}>{errors.grade.message}</FormHelperText>
                      )}
                    </FormControl>
                  )}
                  {selectedGrade && (
                    <FormControl fullWidth sx={{ mb: 6 }}>
                      <Controller
                        name='class'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <Box>
                            <InputLabel id='class-select-label'>Select class</InputLabel>
                            <Select
                              fullWidth
                              value={value}
                              id='class-select'
                              label='Select class'
                              labelId='class-select-label'
                              onChange={onChange}
                              inputProps={{ placeholder: 'Select class' }}
                            >
                              {classes?.map(c => (
                                <MenuItem
                                  value={c.id}
                                  key={c.id}
                                  onClick={() => {
                                    updateClasses(c.id)
                                  }}
                                >
                                  {c.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </Box>
                        )}
                      />
                      {errors.class && (
                        <FormHelperText sx={{ color: 'error.main' }}>{errors.class.message}</FormHelperText>
                      )}
                    </FormControl>
                  )}
                </>
              )}
            </>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }} onClick={onSubmit}>
              Submit
            </Button>
            <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default SidebarAddTeacher
