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
import Tooltip from '@mui/material/Tooltip'

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

function AcademicView({ toggle, open, data, formType }) {
  const {
    name,
    role,
    email,
    gender,
    phone,
    total_students,
    total_classes,
    teacher,
    code,
    total_teachers,
    total_attendance,
    session_ids
  } = data || {}
  console.log(formType)

  const makeSessionsDots = (attendance = []) => {
    return Array.from({ length: 12 }, (_, i) => attendance.includes(i + 1))
  }

  return (
    <Dialog fullWidth open={open} maxWidth='xs' onClose={toggle}>
      <DialogContent>
        <List component='nav' aria-label='main mailbox'>
          <Header sx={{ marginBottom: '1rem' }}>
            <Typography variant='h5'>{name}</Typography>
            <Close fontSize='small' onClick={toggle} sx={{ cursor: 'pointer' }} />
          </Header>
          {formType !== 'classes' && formType !== 'grades' ? (
            <>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>{/* <Icon icon='mdi:email-outline' fontSize={20} /> */}</ListItemIcon>
                  <ListItemText primary={`الكود :  ` + code} />
                </ListItemButton>
              </ListItem>
              <Divider sx={{ m: '0 !important' }} />
            </>
          ) : null}

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>{/* <Icon icon='mdi:email-outline' fontSize={20} /> */}</ListItemIcon>
              <ListItemText primary={`عدد الطلاب :  ` + total_students} />
            </ListItemButton>
          </ListItem>
          <Divider sx={{ m: '0 !important' }} />

          {formType !== 'grades' && formType !== 'school' && formType !== 'camp' ? (
            <>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>{/* <Icon icon='mdi:email-outline' fontSize={20} /> */}</ListItemIcon>
                  <ListItemText primary={`المدرس :  ` + (teacher || 'لا يوجد')} />
                </ListItemButton>
              </ListItem>
              <Divider sx={{ m: '0 !important' }} />
            </>
          ) : null}

          {formType !== 'classes' && formType !== 'school' && formType !== 'camp' ? (
            <>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>{/* <Icon icon='mdi:email-outline' fontSize={20} /> */}</ListItemIcon>
                  <ListItemText primary={`عدد الفصول :  ` + total_classes} />
                </ListItemButton>
              </ListItem>
              <Divider sx={{ m: '0 !important' }} />
            </>
          ) : null}

          {formType !== 'grades' && formType !== 'school' && formType !== 'camp' ? (
            <>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>{/* <Icon icon='mdi:email-outline' fontSize={20} /> */}</ListItemIcon>
                  <ListItemText primary={`الحضور :  ` + total_attendance} />
                </ListItemButton>
              </ListItem>
              <Divider sx={{ m: '0 !important' }} />
            </>
          ) : null}

          {formType === 'classes' ? (
            <>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText>
                    <Box sx={{}}>
                      حضور الحصص :
                      <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center', marginTop: '1rem' }}>
                        {makeSessionsDots(session_ids)?.map((i, index) => {
                          const color = i ? 'green' : 'red'

                          return (
                            <Tooltip key={index} title={'Session: ' + (index + 1)}>
                              <div
                                style={{
                                  width: '8px',
                                  height: '8px',
                                  backgroundColor: `${color}`,
                                  borderRadius: '50%'
                                }}
                              ></div>
                            </Tooltip>
                          )
                        })}
                      </div>
                    </Box>
                  </ListItemText>
                </ListItemButton>
              </ListItem>
              <Divider sx={{ m: '0 !important' }} />
            </>
          ) : null}
        </List>
      </DialogContent>
    </Dialog>
  )
}

export default AcademicView
