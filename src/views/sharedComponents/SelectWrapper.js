import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import { Controller } from 'react-hook-form'
import { useSelector } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'

const SelectWrapper = ({ control, name, label, errors, options, disable }) => {
  return (
    <FormControl fullWidth sx={{ mb: 6 }}>
      <InputLabel id={`${name}-select-label`}>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Select
            {...field}
            fullWidth
            value={field.value}
            id={`${name}-select`}
            label={label}
            labelId={`${name}-select-label`}
            onChange={field.onChange}
            inputProps={{ placeholder: `Select ${label}` }}
            disabled={!disable}
            MenuProps={{
              PaperProps: {
                sx: {
                  maxHeight: 400,
                  overflowY: 'auto',
                  '&::-webkit-scrollbar': {
                    width: 10 // decrease scrollbar width
                  },
                  '&::-webkit-scrollbar-track': {
                    background: '#f1f1f1'
                  },
                  '&::-webkit-scrollbar-thumb': {
                    borderRadius: 6,
                    background: '#888'
                  }
                }
              }
            }}
          >
            {options?.map(opt => (
              <MenuItem value={opt.id} key={opt.id}>
                {opt.name}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      {errors[name] && <FormHelperText sx={{ color: 'error.main' }}>{errors[name].message}</FormHelperText>}
    </FormControl>
  )
}

export default SelectWrapper
