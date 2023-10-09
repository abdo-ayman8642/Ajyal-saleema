import React, { useState, Fragment, useEffect } from 'react'
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
import { useRouter } from 'next/router'
import { useAuth } from 'src/hooks/useAuth'

function deepEqual(obj1, obj2) {
  const keys1 = Object.keys(obj1).sort()
  const keys2 = Object.keys(obj2).sort()

  if (!arraysEqual(keys1, keys2)) {
    return false
  }

  for (const key of keys1) {
    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      if (!deepEqual(obj1[key], obj2[key])) {
        return false
      }
    } else if (obj1[key] !== obj2[key]) {
      return false
    }
  }

  return true
}

function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false
    }
  }

  return true
}

function PermissionsV2({ user }) {
  const currUser = useAuth()
  const currUserId = currUser?.user?.id
  const dispatch = useDispatch()
  const { permissions: selectedUser, id, name } = user
  const [view, setView] = useState(false)
  const router = useRouter()

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    function handleResize() {
      // Check if the window width is less than a certain threshold (e.g., 768 pixels for mobile)
      const isMobile = window.innerWidth < 768
      setIsMobile(isMobile)
    }

    // Attach the event listener when the component mounts
    window.addEventListener('resize', handleResize)

    // Call it initially to set the initial value
    handleResize()

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // State to track permissions

  const [permissions, setPermissions] = useState({
    year: {
      read: selectedUser?.year?.read || false,
      add: selectedUser?.year?.add || false,
      edit: selectedUser?.year?.edit || false,
      delete: selectedUser?.year?.delete || false
    },
    sessions: {
      read: selectedUser?.sessions?.read || false,
      add: selectedUser?.sessions?.add || false,
      edit: selectedUser?.sessions?.edit || false,
      delete: selectedUser?.sessions?.delete || false
    },
    events: {
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
    nav: {
      academic: selectedUser?.nav?.academic || false,
      exams: selectedUser?.nav?.exams || false,
      sessions: selectedUser?.nav?.sessions || false,
      teachers: selectedUser?.nav?.teachers || false,
      events: selectedUser?.nav?.events || false,
      attendance: selectedUser?.nav?.attendance || false,
      home: selectedUser?.nav?.home || false
    }
  })

  const [open, setOpen] = useState({
    year: false,
    session: false,
    event: false,
    exams: false,
    teachers: false,
    students: false,
    nav: false
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
    setView(true)
  }

  // State to track 'nav' permissions
  const [navPermissions, setNavPermissions] = useState({
    academic: false,
    attendance: false,
    events: false,
    exams: false,
    home: false,
    sessions: false,
    teachers: false

    // Add more 'nav' permissions here as needed...
  })

  // Function to handle 'nav' permission checkbox changes
  const handleNavPermissionChange = permissionType => event => {
    setPermissions(prev => ({
      ...prev,
      nav: {
        ...prev.nav,
        [permissionType]: event.target.checked
      }
    }))
    setView(true)
  }

  const handleUpdatePermissions = body => {
    dispatch(updateUser({ data: body }))
    body?.user_id === currUserId && router.push('/') // Navigates to the root path '/' if its same user
  }

  return (
    <Fragment>
      <h3 style={{ textAlign: 'center' }}>{'Permissions for:    ' + name}</h3>
      <List component='nav' aria-label='main mailbox'>
        {['year', 'sessions', 'events', 'exams', 'teachers'].map(section => (
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
          <div
            style={
              isMobile
                ? {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 2fr))',
                    Gap: '1rem',
                    justifyContent: 'center',
                    margin: '0 1rem'
                  }
                : { display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }
            }
          >
            {Object.keys(navPermissions)?.map((section, index) => (
              <FormControlLabel
                key={section}
                label={section}
                sx={{
                  gridColumn: `${index === Object.keys(navPermissions).length - 1 ? 'span 2' : ''}`,
                  justifySelf: `${index === Object.keys(navPermissions).length - 1 ? 'center' : ''}`
                }}
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
      {JSON.stringify(permissions) !== JSON.stringify(selectedUser) && (
        <Button
          variant='contained'
          sx={{ width: '100%' }}
          onClick={() => {
            handleUpdatePermissions({ user_id: id, permissions })
          }}
        >
          Submit
        </Button>
      )}
    </Fragment>
  )
}

export default PermissionsV2
