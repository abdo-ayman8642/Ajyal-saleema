import { useState, forwardRef, useEffect } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Fade from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import Select from '@mui/material/Select'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

/** import libraries */
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { FormHelperText } from '@mui/material'
import FormDate from './FormDate'

const EditForm = ({ formInputs, schema, customizeSubmit, handleClose, selected }) => {
  /** stats & variables */
  const defaultValues = formInputs
    ? formInputs.reduce((acc, cur) => {
        return { ...acc, [cur.name]: '' }
      }, {})
    : {}

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

  useEffect(() => {
    if (formInputs) {
      for (const key in defaultValues) {
        setValue(key, selected[key])
      }
    }
  }, [formInputs])

  const onClose = () => {
    handleClose()
    reset()
  }

  return (
    <form onSubmit={handleSubmit(customizeSubmit)}>
      <Grid container spacing={6}>
        {formInputs.map((fi, index) => {
          if (fi.type === 'select') {
            return (
              <Grid item sm={12} xs={12} key={fi.id || index}>
                <FormControl fullWidth sx={{ mb: 6 }}>
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
                          inputProps={{ placeholder: `Select ${fi.label}` }}
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
              </Grid>
            )
          } else if (fi.type === 'date') {
            return (
              <Grid item sm={12} xs={12} key={fi.id || index}>
                <FormControl fullWidth sx={{ mb: 6 }}>
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
              </Grid>
            )
          } else {
            return (
              <Grid item sm={12} xs={12} key={fi.id || index}>
                <FormControl fullWidth sx={{ mb: 6 }}>
                  <Controller
                    name={fi.name}
                    type={fi.type}
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        fullWidth
                        value={value}
                        label={fi.label}
                        onChange={onChange}
                        placeholder={`Enter your ${fi.name}`}
                        error={Boolean(errors[fi.name])}
                      />
                    )}
                  />
                  {errors[fi.name] && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors[fi.name].message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
            )
          }
        })}
        <Grid item sm={12} xs={12} sx={{ pb: { xs: 8, sm: 12.5 }, justifyContent: 'space-between' }}>
          <Button variant='contained' sx={{ mr: 2 }} type='submit'>
            تأكيد
          </Button>
          <Button variant='outlined' color='secondary' onClick={() => onClose()}>
            إلغاء
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default EditForm
