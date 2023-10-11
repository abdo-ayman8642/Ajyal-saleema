import React from 'react'
import { useState, useEffect } from 'react'

// Mui imports
import Grid from '@mui/material/Grid'

// redux imports'
import { useDispatch, useSelector } from 'react-redux'
import { deleteMultiUsers, deleteUser, fetchData, searchData } from 'src/store/apps/user/actions'

// materialize components import
import { CircularProgress } from '@mui/material'

// helper functions import
import { handleSearch } from 'src/helperFunctions/search'

//** import components  */

import DialogEditUserInfo from 'src/views/apps/user/list/DialogEditUserInfo'
import ConfirmDialog from 'src/views/sharedComponents/ConfirmDialog'
import TableHeader from 'src/views/sharedComponents/TableHeader'
import Permissions from 'src/views/apps/user/list/Permissions'
import SidebarAddUser from 'src/views/apps/user/list/AddUserDrawer'
import UserList from 'src/views/apps/user/list/Table'
import { resetSearchedUsers } from 'src/store/apps/user'
import PageHeader from 'src/views/apps/academicYear/PageHeader'
import { useAuth } from 'src/hooks/useAuth'
import NoPermissionComponent from 'src/views/apps/permissions/noAccess'

function Users() {
  // main variables
  const [showForm, setShowForm] = useState(false)
  const dispatch = useDispatch()
  const loading = useSelector(state => state.user.dataLoading)
  const [showDialog, setShowDialog] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const selectedUser = useSelector(state => state.user?.selectedUser)
  const [showFileImpExp, setShowFileImpExp] = useState(false)
  const [showAcl, setShowAcl] = useState(false)
  const user = useAuth()
  const role = user?.user?.role

  const formInputs = [
    {
      name: 'name',
      label: 'الإسم',
      type: 'text'
    },
    {
      name: 'email',
      label: 'البريد الإلكتروني',
      type: 'email'
    },
    {
      name: 'password',
      label: 'كلمة المرور',
      type: 'password'
    },
    {
      name: 'role',
      label: 'الوظيفة',
      type: 'select',
      options: [
        {
          value: 'volunteer',
          label: 'متطوع'
        },
        {
          value: 'admin',
          label: 'مسئول'
        }
      ]
    },
    {
      name: 'gender',
      label: 'الجنس',
      type: 'select',
      options: [
        {
          value: 'male',
          label: 'ذكر'
        },
        {
          value: 'female',
          label: 'انثي'
        }
      ]
    },
    {
      name: 'phone',
      label: 'رقم الهاتف',
      type: 'text'
    }
  ]

  useEffect(() => {
    dispatch(fetchData(1))
  }, [dispatch])

  // handle toggle Drawers
  const toggleAddForm = () => {
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

  const handlePageChange = nextPage => {
    dispatch(fetchData(nextPage))
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
      {role != 2 ? (
        <>
          <Grid item>
            <TableHeader
              toggleAdd={toggleAddForm}
              toggleConfirm={toggleDialog}
              handleFilter={handleSearch}
              dataType={'user'}
              toggleImpExp={toggleImpExp}
              placeholder={'الأعضاء'}
              selected={selectedUser}
              searchData={searchData}
              fetchData={fetchData}
              resetSearched={resetSearchedUsers}
            />
          </Grid>
          <Grid item>
            <UserList
              dataType={'user'}
              toggleAddForm={toggleAddForm}
              toggleDialog={toggleDialog}
              toggleEditForm={toggleEditForm}
              handlePageChange={handlePageChange}
              role={role}
            />
          </Grid>
          <SidebarAddUser open={showForm} toggle={setShowForm} formInputs={formInputs} />

          <ConfirmDialog
            toggle={toggleDialog}
            open={showDialog}
            confirmationType='الإزالة'
            selected={selectedUser}
            deleteSingle={deleteUser}
            deleteMulti={deleteMultiUsers}
          />

          {showEditForm && (
            <DialogEditUserInfo toggle={toggleEditForm} showEditForm={showEditForm} formInputs={formInputs} />
          )}
        </>
      ) : (
        <NoPermissionComponent featureName='Users' />
      )}
    </Grid>
  )
}

export default Users
