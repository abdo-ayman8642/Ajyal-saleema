import styled from '@emotion/styled'
import { Drawer, Typography, Box, Grid, Switch, FormControlLabel, FormGroup } from '@mui/material'
import { Close } from 'mdi-material-ui'
import React, { useState } from 'react'
import AclSwitch from './AclSwitch'
import { useAuth } from 'src/hooks/useAuth'

function Permissions({ open, toggle }) {
  const Header = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(3, 4),
    justifyContent: 'space-between',
    backgroundColor: theme.palette.background.default
  }))

  /** states & variables */
  const userAuth = useAuth()
  console.log(userAuth)
  const permissionsList = userAuth.user.permissions
  //const permissionsKeys = Object.keys(permissionsList)
  const permissionsTypes = ['read', 'add', 'delete', 'edit']

  return (
    <Drawer
      open={open}
      anchor='top'
      variant='temporary'
      onClose={toggle}
      ModalProps={{ keepMounted: true }}
      sx={{
        '& .MuiDrawer-paper': {
          width: '100%',
          borderTop: 'none',
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
        }
      }}
    >
      <Header>
        <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
          إدارة المستخدمين
        </Typography>
        <Close fontSize='small' onClick={toggle} sx={{ cursor: 'pointer' }} />
      </Header>
      <Grid container spacing={3} sx={{ mt: 5, mb: 5, pl: 5 }}>
        {permissionsKeys?.map((pk, index) => (
          <AclSwitch key={index} permissionsTypes={permissionsTypes} permissionModule={pk} />
        ))}
      </Grid>
    </Drawer>
  )
}

export default Permissions
