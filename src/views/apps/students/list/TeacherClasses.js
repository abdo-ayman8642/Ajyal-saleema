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

function TeacherClasses({ toggle, open, data }) {
  const {
    classes = null,
    name = null,
    camps = null,
    total_camp_students = null,
    total_class_students = null,
    total_departs = null
  } = data || {}
  const total_classes = classes?.length
  const total_camps = camps?.length
  const user = useAuth()
  const { delete: deletee } = user?.user?.permissions?.teachers

  const dispatch = useDispatch()

  const handleUnassign = type => {
    // const ret = type == 'classes' ? {}

    dispatch(unAssignTeacher({ data: type }))
  }

  const cardStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    height: '100%'
  }

  return (
    <Dialog fullWidth open={open} maxWidth='xs' onClose={toggle}>
      <DialogContent>
        <List component='nav' aria-label='main mailbox'>
          <Header sx={{ marginBottom: '1rem' }}>
            <Typography variant='h5'>{name}</Typography>
            <Close fontSize='small' onClick={toggle} sx={{ cursor: 'pointer' }} />
          </Header>
          <div style={{ textAlign: 'center', margin: '0.5rem 0' }}>Students in</div>
          <Grid container spacing={2}>
            {/* First Row */}
            {!!total_class_students && (
              <Grid item xs={4}>
                <Card>
                  <CardContent style={cardStyles}>
                    <div>Classes</div>
                    <Typography variant='h5' style={{ fontWeight: 'bold' }}>
                      {total_class_students}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            )}
            {!!total_camp_students && (
              <Grid item xs={4}>
                <Card>
                  <CardContent style={cardStyles}>
                    <div>Camps</div>
                    <Typography variant='h5' style={{ fontWeight: 'bold' }}>
                      {total_camp_students}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            )}
            {!!total_departs && (
              <Grid item xs={4}>
                <Card>
                  <CardContent style={cardStyles}>
                    <div>Departs</div>
                    <Typography variant='h5' style={{ fontWeight: 'bold' }}>
                      {total_departs}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            )}

            {/* Second Row */}

            {!!total_classes && (
              <Grid item xs={6} sx={{ mt: '1rem' }}>
                <Card>
                  <CardContent style={cardStyles}>
                    <div>Total Classes</div>
                    <Typography variant='h5' style={{ fontWeight: 'bold' }}>
                      {total_classes}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            )}
            {!!total_camps && (
              <Grid item xs={6} sx={{ mt: '1rem' }}>
                <Card>
                  <CardContent style={cardStyles}>
                    <div>Total Camps</div>
                    <Typography variant='h5' style={{ fontWeight: 'bold' }}>
                      {total_camps}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            )}
          </Grid>

          {!!classes?.length && <h4 style={{ textAlign: 'center' }}>فصل</h4>}

          {classes?.map(clas => (
            <>
              <ListItem disablePadding key={clas?.id}>
                <ListItemButton>
                  <ListItemIcon>{/* <Icon icon='mdi:email-outline' fontSize={20} /> */}</ListItemIcon>
                  <ListItemText primary={`اسم الفصل: ` + clas?.['class name']} />
                  {deletee && (
                    <Button
                      variant='text'
                      startIcon={<DeleteIcon />}
                      sx={{ color: 'red' }}
                      onClick={() => handleUnassign({ classes: clas?.['class id'] })}
                    >
                      Unassign
                    </Button>
                  )}
                </ListItemButton>
              </ListItem>
              <Divider sx={{ m: '0 !important' }} />
            </>
          ))}
          {!!camps?.length && (
            <h4 h4 style={{ textAlign: 'center' }}>
              معسكر
            </h4>
          )}

          {camps?.map(clas => (
            <>
              <ListItem disablePadding key={clas?.id}>
                <ListItemButton>
                  <ListItemIcon>{/* <Icon icon='mdi:email-outline' fontSize={20} /> */}</ListItemIcon>
                  <ListItemText primary={`اسم المعسكر: ` + clas?.['camp name']} />
                  {deletee && (
                    <Button
                      variant='text'
                      startIcon={<DeleteIcon />}
                      sx={{ color: 'red' }}
                      onClick={() => handleUnassign({ schools: clas?.['camp id'] })}
                    >
                      Unassign
                    </Button>
                  )}
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
