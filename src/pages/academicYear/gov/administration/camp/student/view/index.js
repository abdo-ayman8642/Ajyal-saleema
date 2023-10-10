import React from 'react'
import { useAuth } from 'src/hooks/useAuth'
import NoPermissionComponent from 'src/views/apps/permissions/noAccess'
import StudentLayout from 'src/views/apps/students/studentProfile/Layout'

function StudentProfile() {
  const user = useAuth()
  const { read } = user?.user?.permissions?.year?.student
  const { academic: view } = user?.user?.permissions?.nav

  return read && view ? <StudentLayout /> : <NoPermissionComponent featureName='Student View' />
}

export default StudentProfile
