import React, { useLayoutEffect } from 'react'

// mui imports
import Grid from '@mui/material/Grid'

// components import

import { CircularProgress } from '@mui/material'

// hooks
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState, useRef } from 'react'

//redux imports

import DialogEditUserInfo from 'src/views/apps/students/list/DialogEditUserInfo'
import ConfirmDialog from 'src/views/sharedComponents/ConfirmDialog'
import TableHeader from 'src/views/sharedComponents/TableHeader'
import SidebarAddTeachers from 'src/views/apps/teachers/DrawerAdd'
import TeachersList from 'src/views/apps/teachers/Table'
import { deleteMultiTeachers, deleteTeacher, fetchData } from 'src/store/apps/teachers/actions'
import DialogEditForm from 'src/views/apps/teachers/EditDialogForm'
import { useAuth } from 'src/hooks/useAuth'
import { useHistory } from 'react-router-dom'
import NoPermissionComponent from 'src/views/apps/permissions/noAccess'

function Teachers() {
  // main variables
  const [showForm, setShowForm] = useState(false)
  const [currentTeacherData, setcurrentTeacherData] = useState(null)
  const [ShowAssignForm, setShowAssignForm] = useState(false)
  const dispatch = useDispatch()
  const loading = useSelector(state => state.teachers?.dataLoading)
  const [showDialog, setShowDialog] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const selectedTeacher = useSelector(state => state.teachers?.selectedTeacher)
  const [showFileImpExp, setShowFileImpExp] = useState(false)

  const user = useAuth()

  const previousPermissionsRef = useRef(user?.user?.permissions)
  useEffect(() => {
    const checkForPermissionChanges = () => {
      if (JSON.stringify(user?.user?.permissions) !== JSON.stringify(previousPermissionsRef.current)) {
        // Permissions have changed, so reload the page
        window.location.reload()
      }
    }

    // Check for permission changes when the component mounts
    checkForPermissionChanges()

    // Listen for permission changes when the component updates
    const intervalId = setInterval(checkForPermissionChanges, 1000) // Adjust the interval as needed

    return () => {
      clearInterval(intervalId) // Cleanup the interval when the component unmounts
    }
  })
  const { teachers } = user?.user?.permissions

  const { read, add, edit } = teachers
  const deletee = teachers?.['delete']

  const formInputs = [
    {
      name: 'name',
      label: 'Name',
      type: 'text'
    },
    {
      name: 'gender',
      label: 'Gender',
      type: 'select',
      options: [
        {
          value: 'male',
          label: 'Male'
        },
        {
          value: 'female',
          label: 'Female'
        }
      ]
    }
  ]

  useEffect(() => {
    dispatch(fetchData(1))
  }, [dispatch])

  // handle toggle Drawers
  const toggleAddForm = () => {
    setcurrentTeacherData(null)
    setShowForm(!showForm)
  }

  const toggleAssign = (id, name) => {
    setcurrentTeacherData([id, name])
    setShowForm(!showForm)
  }

  // handle show Dialog
  const toggleDialog = () => {
    setShowDialog(!showDialog)
  }

  // handle show Edit
  const toggleEditForm = () => {
    setShowEditForm(!showEditForm)
  }

  const toggleImpExp = () => {
    setShowFileImpExp(!showFileImpExp)
  }

  if (loading) {
    return (
      <Grid container sx={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Grid item>
          <CircularProgress />
        </Grid>
      </Grid>
    )
  }

  return (
    <Grid container direction='column'>
      {read ? (
        <>
          <Grid item>
            <TableHeader
              toggleAdd={toggleAddForm}
              toggleConfirm={toggleDialog}
              dataType={'user'}
              toggleImpExp={toggleImpExp}
              placeholder={'الأعضاء'}
              selected={selectedTeacher}
              permissions={teachers}
            />
          </Grid>
          <TeachersList
            toggleAddForm={toggleAddForm}
            toggleDialog={toggleDialog}
            toggleEditForm={toggleEditForm}
            toggleAssign={toggleAssign}
            permissions={teachers}
          />
        </>
      ) : (
        <NoPermissionComponent featureName='Teachers' />
      )}

      <SidebarAddTeachers open={showForm} toggle={setShowForm} formInputs={formInputs} teacherId={currentTeacherData} />

      <ConfirmDialog
        toggle={toggleDialog}
        open={showDialog}
        confirmationType='الإزالة'
        selected={selectedTeacher}
        deleteSingle={deleteTeacher}
        deleteMulti={deleteMultiTeachers}
      />
      <DialogEditForm open={showEditForm} toggle={toggleEditForm} formInputs={formInputs} />
    </Grid>
  )
}

export default Teachers
