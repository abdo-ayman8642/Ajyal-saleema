import React from 'react'
import { useAuth } from 'src/hooks/useAuth'
import NoPermissionComponent from 'src/views/apps/permissions/noAccess'
import StudentLayout from 'src/views/apps/students/studentProfile/Layout'

function StudentProfile() {
  const user = useAuth()
  const { year } = user?.user?.permissions
  const { read } = year

  return read ? <StudentLayout /> : <NoPermissionComponent featureName='Student View' />
}

export default StudentProfile
