import React from 'react'
import { useAuth } from 'src/hooks/useAuth'
import StudentLayout from 'src/views/apps/students/studentProfile/Layout'
import NoPermissionComponent from 'src/views/apps/permissions/noAccess'

function StudentProfile() {
  const user = useAuth()
  const { read } = user?.user?.permissions?.year?.students || {}
  const { academic: view } = user?.user?.permissions?.nav || {}

  return read && view ? <StudentLayout /> : <NoPermissionComponent featureName='Student View' />
}

export default StudentProfile
