import { Box, FormControlLabel, FormGroup, Grid, Switch, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useAuth } from 'src/hooks/useAuth'
import { setPermission } from 'src/store/apps/permissions/actions'

function AclSwitch({ permissionModule, permissionsTypes }) {
  const [switchValues, setSwitchValues] = useState({})
  const dispatch = useDispatch()
  const userAuth = useAuth()
  const userId = userAuth.user.id 
  

  const handleChange = (event, type ) => {
    const { id, checked } = event.target
    const permission = checked ? `set_${type}` : `unset_${type}`
    setSwitchValues(prevState => ({ ...prevState, [id]: checked }))
    dispatch(setPermission({moduleType: permissionModule, permissionType: permission, id: userId}))
  }

  return (
    <Grid item xs={12} md={2} sx={{ px: 2, mb: 3 }}>
      <Box sx={{ py: 3, px: 4, border: '1px solid rgba(0, 0, 0, 0.1)', borderRadius: 2 }}>
        <Typography variant='subtitle1' sx={{ fontWeight: 'bold', mb: 1 }}>
          {permissionModule}
        </Typography>
        <FormGroup column>
          {permissionsTypes?.map((s, index) => (
            <FormControlLabel
              key={s}
              sx={{ mb: 1, justifyContent: 'space-between', p: 0 }}
              control={<Switch size='small' checked={switchValues[s] || false} onChange={(e) => handleChange(e, s)} id={s} />}
              label={s}
              labelPlacement='end'// Align label with switch
            />
          ))}
        </FormGroup>
      </Box>
    </Grid>
  )
}

export default AclSwitch