import React, { useState, Fragment } from 'react'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import Collapse from '@mui/material/Collapse'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Button from '@mui/material/Button'

function PermissionsV2({ user: selectedUser }) {
  console.log(selectedUser)
  // State to track permissions
  const [permissions, setPermissions] = useState({
    academic: {
      read: selectedUser.year.read,
      add: selectedUser.year.add,
      edit: selectedUser.year.edit,
      delete: selectedUser.year.delete
    },
    session: {
      read: selectedUser.sessions.read,
      add: selectedUser.sessions.add,
      edit: selectedUser.sessions.edit,
      delete: selectedUser.sessions.delete
    },
    event: {
      read: selectedUser.events.read,
      add: selectedUser.events.add,
      edit: selectedUser.events.edit,
      delete: selectedUser.events.delete
    },
    exams: {
      read: selectedUser.exams.read,
      add: selectedUser.exams.add,
      edit: selectedUser.exams.edit,
      delete: selectedUser.exams.delete
    },
    teachers: {
      read: selectedUser.teachers.read,
      add: selectedUser.teachers.add,
      edit: selectedUser.teachers.edit,
      delete: selectedUser.teachers.delete
    },
    students: {
      read: selectedUser.students.read,
      add: selectedUser.students.add,
      edit: selectedUser.students.edit,
      delete: selectedUser.students.delete
    },
    nav: {
      academic: selectedUser.nav.academic,
      attendance: selectedUser.nav.attendance,
      events: selectedUser.nav.events,
      exams: selectedUser.nav.exams,
      home: selectedUser.nav.home,
      sessions: selectedUser.nav.sessions,
      students: selectedUser.nav.students,
      teachers: selectedUser.nav.teachers
    }
    // Add more permissions here as needed...
  })

  // State to track open/close state of the accordions
  const [open, setOpen] = useState({
    academic: false,
    session: false,
    event: false,
    exams: false,
    teachers: false,
    students: false
    // Add more permissions here as needed...
  })

  // Function to handle accordion open/close
  const handleAccordionToggle = permissionType => {
    setOpen(prevOpen => ({
      ...prevOpen,
      [permissionType]: !prevOpen[permissionType]
    }))
  }

  // Function to handle checkbox changes and update the permission state
  const handlePermissionChange = (permissionType, action) => event => {
    const updatedPermissions = { ...permissions }
    updatedPermissions[permissionType][action] = event.target.checked
    setPermissions(updatedPermissions)
  }

  // State to track 'nav' permissions
  const [navPermissions, setNavPermissions] = useState({
    academic: false,
    attendance: false,
    events: false,
    exams: false,
    home: false,
    sessions: false,
    students: false,
    teachers: false
    // Add more 'nav' permissions here as needed...
  })

  // Function to handle 'nav' permission checkbox changes
  const handleNavPermissionChange = permissionType => event => {
    setNavPermissions(prevNavPermissions => ({
      ...prevNavPermissions,
      [permissionType]: event.target.checked
    }))
  }

  console.log(permissions)
  return (
    <Fragment>
      <h3 style={{ textAlign: 'center' }}>Permissions</h3>
      <List component='nav' aria-label='main mailbox'>
        {['academic', 'session', 'event', 'exams', 'teachers', 'students'].map(section => (
          <>
            <ListItem key={section} disablePadding>
              <ListItemButton onClick={() => handleAccordionToggle(section)}>
                <ListItemText primary={section.charAt(0).toUpperCase() + section.slice(1)} />
              </ListItemButton>
            </ListItem>
            <Collapse key={section} in={open[section]} timeout='auto' unmountOnExit>
              {/* Permission Checkbox Content */}
              <FormGroup row style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
                <FormControlLabel
                  label='Read'
                  control={
                    <Checkbox
                      checked={permissions[section].read}
                      onChange={handlePermissionChange(section, 'read')}
                      name={`${section}-read`}
                    />
                  }
                />
                <FormControlLabel
                  label='Add'
                  control={
                    <Checkbox
                      checked={permissions[section].add}
                      onChange={handlePermissionChange(section, 'add')}
                      name={`${section}-add`}
                    />
                  }
                />
                <FormControlLabel
                  label='Edit'
                  control={
                    <Checkbox
                      checked={permissions[section].edit}
                      onChange={handlePermissionChange(section, 'edit')}
                      name={`${section}-edit`}
                    />
                  }
                />
                <FormControlLabel
                  label='Delete'
                  control={
                    <Checkbox
                      checked={permissions[section].delete}
                      onChange={handlePermissionChange(section, 'delete')}
                      name={`${section}-delete`}
                    />
                  }
                />
              </FormGroup>
            </Collapse>
          </>
        ))}
      </List>
      <Button variant='contained' sx={{ width: '100%' }}>
        Submit
      </Button>
    </Fragment>
  )
}

export default PermissionsV2
