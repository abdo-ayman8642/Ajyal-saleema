import UserViewOverview from 'src/views/apps/user/view/UserViewOverview'
import UserViewLeft from 'src/views/apps/user/view/UserViewLeft'
import React from 'react'
import { useAuth } from 'src/hooks/useAuth'

function UserProfile() {
  const user = useAuth()

  return <UserViewLeft user={user?.user} />
}

export default UserProfile
