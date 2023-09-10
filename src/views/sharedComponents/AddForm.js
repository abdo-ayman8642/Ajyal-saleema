import React, { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material'
import FormDate from './FormDate'

const showErrors = (field, valueLen, min) => {
  if (valueLen === 0) {
    return `${field} field is required`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else {
    return ''
  }
}

const AddForm = ({ onSubmit, onCancel, schema, formInputs }) => {
  /** Create default values for the form */

  const defaultValues = formInputs.reduce((acc, cur) => {
    return { ...acc, [cur.name]: '' }
  }, {})

  const {
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

  const handleCancel = () => {
    onCancel()
    reset()
  }

  useEffect(() => {
    if (defaultValues.date === '') {
      setValue('date', new Date())
    }
  })

  return (
    <Box sx={{ p: 5, maxWidth: { xs: 300, sm: 400 } }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {formInputs.map((fi, index) => {
          if (fi.type === 'select') {
            return (
              <FormControl fullWidth sx={{ mb: 6 }} key={fi.id || index}>
                <Controller
                  name={fi.name}
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <Box>
                      <InputLabel id={`${fi.name}-select-label`}>{fi.label}</InputLabel>
                      <Select
                        fullWidth
                        value={value}
                        id={`${fi.name}-select`}
                        label={fi.label}
                        labelId={`${fi.name}-select-label`}
                        onChange={onChange}
                        inputProps={{ placeholder: `Select ${fi.name}` }}
                      >
                        {fi.options.map(opt => (
                          <MenuItem value={opt.value} key={opt.value}>
                            {opt.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </Box>
                  )}
                />
                {errors[fi.name] && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors[fi.name].message}</FormHelperText>
                )}
              </FormControl>
            )
          } else if (fi.type === 'date') {
            return (
              <FormControl fullWidth sx={{ mb: 6 }} key={fi.id || index}>
                <Controller
                  name={fi.name}
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <FormDate onChange={onChange} value={value} label={fi.label} />
                  )}
                />
                {errors[fi.name] && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors[fi.name].message}</FormHelperText>
                )}
              </FormControl>
            )
          } else {
            return (
              <FormControl fullWidth sx={{ mb: 6 }} key={fi.id || index}>
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
            )
          }
        })}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }}>
            Submit
          </Button>
          <Button size='large' variant='outlined' color='secondary' onClick={handleCancel}>
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
  )
}

export default AddForm
