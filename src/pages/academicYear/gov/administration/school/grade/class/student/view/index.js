import React from 'react'
import { useAuth } from 'src/hooks/useAuth'
import StudentLayout from 'src/views/apps/students/studentProfile/Layout'
import NoPermissionComponent from 'src/views/apps/permissions/noAccess'

function StudentProfile() {
  const user = useAuth()
  const { year } = user?.user?.permissions
  const { read } = year

  return read ? <StudentLayout /> : <NoPermissionComponent featureName='Student View' />
}

export default StudentProfile
