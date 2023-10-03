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

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

function TeacherClasses({ toggle, open, data }) {
  console.log(data)
  const classes = data?.classes
  const name = data?.name
  const camps = data?.camps
  return (
    <Dialog fullWidth open={open} maxWidth='xs' onClose={toggle}>
      <DialogContent>
        <List component='nav' aria-label='main mailbox'>
          <Header sx={{ marginBottom: '1rem' }}>
            <Typography variant='h5'>{name}</Typography>
            <Close fontSize='small' onClick={toggle} sx={{ cursor: 'pointer' }} />
          </Header>
          {!!classes?.length && <h4 style={{ textAlign: 'center' }}>Classes</h4>}

          {classes?.map(clas => (
            <>
              <ListItem disablePadding key={clas?.id}>
                <ListItemButton>
                  <ListItemIcon>{/* <Icon icon='mdi:email-outline' fontSize={20} /> */}</ListItemIcon>
                  <ListItemText primary={`Name of class: ` + clas?.['class name']} />
                </ListItemButton>
              </ListItem>
              <Divider sx={{ m: '0 !important' }} />
            </>
          ))}
          {!!camps?.length && (
            <h4 h4 style={{ textAlign: 'center' }}>
              Camps
            </h4>
          )}

          {camps?.map(clas => (
            <>
              <ListItem disablePadding key={clas?.id}>
                <ListItemButton>
                  <ListItemIcon>{/* <Icon icon='mdi:email-outline' fontSize={20} /> */}</ListItemIcon>
                  <ListItemText primary={`Name of camp: ` + clas?.['camp name']} />
                </ListItemButton>
              </ListItem>
              <Divider sx={{ m: '0 !important' }} />
            </>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  )
}

export default TeacherClasses
