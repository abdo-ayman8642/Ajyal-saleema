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
import Typography from '@mui/material/Typography'

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
  const [viewAcademic, setViewAcademic] = useState(false)
  const router = useRouter()
  const [isSelected, setIsSelected] = useState(null)

  const handleButtonClick = () => {
    setIsSelected(!isSelected)
  }

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

  const initialYearPermissions = {
    years: {
      read: selectedUser?.year?.years?.read || false,
      edit: selectedUser?.year?.years?.edit || false,
      add: selectedUser?.year?.years?.add || false,
      delete: selectedUser?.year?.years?.delete || false
    },
    govs: {
      read: selectedUser?.year?.govs?.read || false,
      edit: selectedUser?.year?.govs?.edit || false,
      add: selectedUser?.year?.govs?.add || false,
      delete: selectedUser?.year?.govs?.delete || false
    },
    administrations: {
      read: selectedUser?.year?.administrations?.read || false,
      edit: selectedUser?.year?.administrations?.edit || false,
      add: selectedUser?.year?.administrations?.add || false,
      delete: selectedUser?.year?.administrations?.delete || false
    },
    schools: {
      read: selectedUser?.year?.schools?.read || false,
      edit: selectedUser?.year?.schools?.edit || false,
      add: selectedUser?.year?.schools?.add || false,
      delete: selectedUser?.year?.schools?.delete || false
    },
    camps: {
      read: selectedUser?.year?.camps?.read || false,
      edit: selectedUser?.year?.camps?.edit || false,
      add: selectedUser?.year?.camps?.add || false,
      delete: selectedUser?.year?.camps?.delete || false
    },
    grades: {
      read: selectedUser?.year?.grades?.read || false,
      edit: selectedUser?.year?.grades?.edit || false,
      add: selectedUser?.year?.grades?.add || false,
      delete: selectedUser?.year?.grades?.delete || false
    },
    classes: {
      read: selectedUser?.year?.classes?.read || false,
      edit: selectedUser?.year?.classes?.edit || false,
      add: selectedUser?.year?.classes?.add || false,
      delete: selectedUser?.year?.classes?.delete || false
    },
    students: {
      read: selectedUser?.year?.students?.read || false,
      edit: selectedUser?.year?.students?.edit || false,
      add: selectedUser?.year?.students?.add || false,
      delete: selectedUser?.year?.students?.delete || false
    },
    student: {
      read: selectedUser?.year?.students?.read || false
    }
  }

  const [permissions, setPermissions] = useState({
    year: { ...initialYearPermissions },
    sessions: {
      read: selectedUser?.sessions?.read || false,
      edit: selectedUser?.sessions?.edit || false
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
      delete: selectedUser?.exams?.delete || false
    },
    teachers: {
      read: selectedUser?.teachers?.read || false,
      add: selectedUser?.teachers?.add || false,
      edit: selectedUser?.teachers?.edit || false,
      delete: selectedUser?.teachers?.delete || false
    },
    user: {
      read: selectedUser?.user?.read || false
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

  // State to track 'Academic Permissions'
  const [academicPermissions, setAcademicPermissions] = useState({
    years: false,
    govs: false,
    administrations: false,
    schools: false,
    camps: false,
    grades: false,
    classes: false,
    students: false,
    student: false
  })

  const handleacPermissionChange = permissionType => {
    if (isSelected !== permissionType && isSelected) return
    isSelected === permissionType ? setIsSelected(null) : setIsSelected(permissionType)

    setAcademicPermissions(prev => ({
      ...prev,
      [permissionType]: !academicPermissions[permissionType]
    }))

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

  const handleAcademicPermissionChange = (permissionType, action) => event => {
    const isChecked = event.target.checked

    setPermissions(prevPermissions => ({
      ...prevPermissions,
      year: {
        ...prevPermissions.year,
        [permissionType]: {
          ...prevPermissions.year[permissionType],
          [action]: isChecked
        }
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
      <h3 style={{ textAlign: 'center', fontSize: '1rem', fontWeight: '400', fontStyle: 'italic', margin: 0 }}>
        الصلاحيات للمستخدم:
        <span style={{ fontWeight: '600', fontStyle: 'normal', margin: '0 0.5rem' }}>{name}</span>
      </h3>
      <List component='academic' aria-label='secondary mailbox' sx={{ padding: 0 }}>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleAccordionToggle('year')}>
            <ListItemText primary={'Academic Data'} />
          </ListItemButton>
        </ListItem>

        <Collapse in={open['year']} timeout='auto' unmountOnExit>
          <div
            style={
              isMobile
                ? {
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 2fr))',
                    Gap: '1rem',
                    justifyContent: 'center'
                  }
                : {
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '1rem',
                    flexWrap: 'wrap'
                  }
            }
          >
            {Object.keys(academicPermissions)?.map((section, index) => (
              <Button
                key={index}
                sx={{
                  fontSize: '1rem',
                  fontWeight: '500',
                  padding: '0.2rem 0.7rem',
                  margin: '0.2rem',
                  '&.MuiButton-containedSecondary': {
                    backgroundColor: 'transparent' // Remove the background color for selected state
                  }
                }}
                variant={academicPermissions[section] ? 'contained' : 'outlined'}
                color='primary'
                onClick={() => handleacPermissionChange(section)}
              >
                {section === 'administrations' ? 'departs' : section}
              </Button>
            ))}
          </div>

          {(academicPermissions[isSelected] || false) && (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <FormGroup
                row
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '0.1rem',
                  alignItems: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: '10px'
                }}
              >
                {permissions['year'][isSelected]?.hasOwnProperty('read') && (
                  <FormControlLabel
                    label={isSelected === 'student' ? 'Take Exam' : 'Read'}
                    sx={{ display: 'flex', flexDirection: 'column' }}
                    control={
                      <Checkbox
                        sx={{ order: 2 }}
                        checked={permissions['year'][isSelected].read}
                        onChange={handleAcademicPermissionChange(isSelected, 'read')}
                        name={`${isSelected}-read`}
                      />
                    }
                  />
                )}

                {permissions['year'][isSelected]?.hasOwnProperty('add') && (
                  <FormControlLabel
                    label='Add'
                    sx={{ display: 'flex', flexDirection: 'column' }}
                    control={
                      <Checkbox
                        sx={{ order: 2 }}
                        checked={permissions['year'][isSelected].add}
                        onChange={handleAcademicPermissionChange(isSelected, 'add')}
                        name={`${isSelected}-add`}
                      />
                    }
                  />
                )}

                {permissions['year'][isSelected]?.hasOwnProperty('edit') && (
                  <FormControlLabel
                    label='Edit'
                    sx={{ display: 'flex', flexDirection: 'column' }}
                    control={
                      <Checkbox
                        sx={{ order: 2 }}
                        checked={permissions['year'][isSelected].edit}
                        onChange={handleAcademicPermissionChange(isSelected, 'edit')}
                        name={`${isSelected}-edit`}
                      />
                    }
                  />
                )}

                {permissions['year'][isSelected]?.hasOwnProperty('delete') && (
                  <FormControlLabel
                    label='Delete'
                    sx={{ display: 'flex', flexDirection: 'column' }}
                    control={
                      <Checkbox
                        sx={{ order: 2 }}
                        checked={permissions['year'][isSelected].delete}
                        onChange={handleAcademicPermissionChange(isSelected, 'delete')}
                        name={`${isSelected}-delete`}
                      />
                    }
                  />
                )}
              </FormGroup>
            </div>
          )}
        </Collapse>
      </List>
      <List component='nav' aria-label='main mailbox' sx={{ padding: 0 }}>
        {['sessions', 'events', 'exams', 'teachers', 'user'].map(section => (
          <>
            <ListItem key={section} disablePadding>
              <ListItemButton onClick={() => handleAccordionToggle(section)}>
                <ListItemText primary={section.charAt(0).toUpperCase() + section.slice(1)} />
              </ListItemButton>
            </ListItem>
            <Collapse key={section} in={open[section]} timeout='auto' unmountOnExit>
              {/* Permission Checkbox Content */}
              <FormGroup
                row
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '0.1rem',
                  alignItems: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: '10px'
                }}
              >
                <FormControlLabel
                  label={section === 'user' ? 'Self Edit' : 'Read'}
                  sx={{ display: 'flex', flexDirection: 'column' }}
                  control={
                    <Checkbox
                      sx={{ order: 2 }}
                      checked={permissions[section].read}
                      onChange={handlePermissionChange(section, 'read')}
                      name={`${section}-read`}
                    />
                  }
                />
                {section !== 'sessions' && section !== 'user' && (
                  <FormControlLabel
                    label='Add'
                    sx={{ display: 'flex', flexDirection: 'column' }}
                    control={
                      <Checkbox
                        sx={{ order: 2 }}
                        checked={permissions[section].add}
                        onChange={handlePermissionChange(section, 'add')}
                        name={`${section}-add`}
                      />
                    }
                  />
                )}
                {section !== 'exams' && section !== 'user' && (
                  <FormControlLabel
                    label='Edit'
                    sx={{ display: 'flex', flexDirection: 'column' }}
                    control={
                      <Checkbox
                        sx={{ order: 2 }}
                        checked={permissions[section].edit}
                        onChange={handlePermissionChange(section, 'edit')}
                        name={`${section}-edit`}
                      />
                    }
                  />
                )}

                {section !== 'sessions' && section !== 'user' && (
                  <FormControlLabel
                    label='Delete'
                    sx={{ display: 'flex', flexDirection: 'column' }}
                    control={
                      <Checkbox
                        sx={{ order: 2 }}
                        checked={permissions[section].delete}
                        onChange={handlePermissionChange(section, 'delete')}
                        name={`${section}-delete`}
                      />
                    }
                  />
                )}
              </FormGroup>
            </Collapse>
          </>
        ))}
      </List>
      <List component='nav' aria-label='secondary mailbox' sx={{ padding: 0 }}>
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
