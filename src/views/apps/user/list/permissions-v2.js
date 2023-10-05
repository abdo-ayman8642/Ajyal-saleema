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
import { useDispatch } from 'react-redux'
import { updateUser } from 'src/store/apps/user/actions'

function PermissionsV2({ user }) {
  const dispatch = useDispatch()
  const { permissions: selectedUser, id, name } = user
  console.log(user)

  // State to track permissions

  const [permissions, setPermissions] = useState({
    year: {
      read: selectedUser?.year?.read || false,
      add: selectedUser?.year?.add || false,
      edit: selectedUser?.year?.edit || false,
      delete: selectedUser?.year?.delete || false
    },
    session: {
      read: selectedUser?.sessions?.read || false,
      add: selectedUser?.sessions?.add || false,
      edit: selectedUser?.sessions?.edit || false,
      delete: selectedUser?.sessions?.delete || false
    },
    event: {
      read: selectedUser?.events?.read || false,
      add: selectedUser?.events?.add || false,
      edit: selectedUser?.events?.edit || false,
      delete: selectedUser?.events?.delete || false
    },
    exams: {
      read: selectedUser?.exams?.read || false,
      add: selectedUser?.exams?.add || false,
      edit: selectedUser?.exams?.edit || false,
      delete: selectedUser?.exams?.delete || false
    },
    teachers: {
      read: selectedUser?.teachers?.read || false,
      add: selectedUser?.teachers.add || false,
      edit: selectedUser?.teachers?.edit || false,
      delete: selectedUser?.teachers?.delete || false
    },
    students: {
      read: selectedUser?.students?.read || false,
      add: selectedUser?.students?.add || false,
      edit: selectedUser?.students?.edit || false,
      delete: selectedUser?.students?.delete || false
    },
    nav: {
      academic: selectedUser?.nav?.academic || false,
      attendance: selectedUser?.nav?.attendance || false,
      events: selectedUser?.nav?.events || false,
      exams: selectedUser?.nav?.exams || false,
      home: selectedUser?.nav?.home || false,
      sessions: selectedUser?.nav?.sessions || false,
      students: selectedUser?.nav?.students || false,
      teachers: selectedUser?.nav?.teachers || false
    }

    // Add more permissions here as needed...
  })

  // State to track open/close state of the accordions
  const [open, setOpen] = useState({
    year: false,
    session: false,
    event: false,
    exams: false,
    teachers: false,
    students: false,
    nav: false

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
    console.log(permissionType)
    console.log(permissions)
    setPermissions(prev => ({
      ...prev,
      nav: {
        ...prev.nav,
        [permissionType]: event.target.checked
      }
    }))
  }

  const handleUpdatePermissions = body => {
    dispatch(updateUser({ data: body }))
  }
  console.log(permissions)

  return (
    <Fragment>
      <h3 style={{ textAlign: 'center' }}>{'Permissions for:    ' + name}</h3>
      <List component='nav' aria-label='main mailbox'>
        {['year', 'session', 'event', 'exams', 'teachers', 'students'].map(section => (
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
      <List component='nav' aria-label='secondary mailbox'>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleAccordionToggle('nav')}>
            <ListItemText primary={'Show Tabs'} />
          </ListItemButton>
        </ListItem>
        <Collapse in={open['nav']} timeout='auto' unmountOnExit>
          <div style={{ display: 'flex', flexWrap: 'nowrap', margin: '0 2rem', gap: '1rem' }}>
            {Object.keys(navPermissions).map(section => (
              <FormControlLabel
                key={section}
                label={section}
                control={
                  <Checkbox
                    checked={permissions['nav'][section]}
                    onChange={handleNavPermissionChange(section)}
                    name={`${section}-permission`}
                  />
                }
              />
            ))}
          </div>
        </Collapse>
      </List>
      <Button
        variant='contained'
        sx={{ width: '100%' }}
        onClick={() => {
          handleUpdatePermissions({ user_id: id, permissions })
        }}
      >
        Submit
      </Button>
    </Fragment>
  )
}

export default PermissionsV2
