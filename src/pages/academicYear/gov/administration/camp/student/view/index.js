import React from 'react'
import { useAuth } from 'src/hooks/useAuth'
import StudentLayout from 'src/views/apps/students/studentProfile/Layout'

function StudentProfile() {
  const user = useAuth()
  const role = user?.user?.role

  return (
    <>
      role != 2 ? <StudentLayout /> : <h1 style={{ textAlign: 'center' }}>Don't Have Permission</h1>
    </>
  )
}

export default StudentProfile
