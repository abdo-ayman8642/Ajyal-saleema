import { Dialog, DialogContent } from '@mui/material'
import { Transition } from 'mdi-material-ui'
import React from 'react'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import Typography from '@mui/material/Typography'
import Close from 'mdi-material-ui/Close'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'
import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete'
import { useDispatch } from 'react-redux'
import { unAssignTeacher } from 'src/store/apps/teachers/actions'
import { useAuth } from 'src/hooks/useAuth'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

function InformationView({ toggle, open, data }) {
  const { name, role, email, gender, phone } = data

  const renderRoleName = role => {
    return role === '0' ? 'مسئول مميز' : role === '1' ? 'مسئول' : 'متطوع'
  }
  return (
    <Dialog fullWidth open={open} maxWidth='xs' onClose={toggle}>
      <DialogContent>
        <List component='nav' aria-label='main mailbox'>
          <Header sx={{ marginBottom: '1rem' }}>
            <Typography variant='h5'>{name}</Typography>
            <Close fontSize='small' onClick={toggle} sx={{ cursor: 'pointer' }} />
          </Header>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>{/* <Icon icon='mdi:email-outline' fontSize={20} /> */}</ListItemIcon>
              <ListItemText primary={`الوظيفة :  ` + renderRoleName(role)} />
            </ListItemButton>
          </ListItem>
          <Divider sx={{ m: '0 !important' }} />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>{/* <Icon icon='mdi:email-outline' fontSize={20} /> */}</ListItemIcon>
              <ListItemText primary={`البريد الالكتروني :  ` + email} />
            </ListItemButton>
          </ListItem>
          <Divider sx={{ m: '0 !important' }} />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>{/* <Icon icon='mdi:email-outline' fontSize={20} /> */}</ListItemIcon>
              <ListItemText primary={`الجنس :  ` + gender} />
            </ListItemButton>
          </ListItem>
          <Divider sx={{ m: '0 !important' }} />

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>{/* <Icon icon='mdi:email-outline' fontSize={20} /> */}</ListItemIcon>
              <ListItemText primary={`الهاتف :  ` + phone} />
            </ListItemButton>
          </ListItem>
        </List>
      </DialogContent>
    </Dialog>
  )
}

export default InformationView
