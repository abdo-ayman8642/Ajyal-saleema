// ** React Imports
import { useState, Fragment } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

import LogoutVariant from 'mdi-material-ui/LogoutVariant'
import PersonIcon from '@mui/icons-material/Person'

// ** Context
import { useAuth } from 'src/hooks/useAuth'

// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const UserDropdown = props => {
  // ** Props
  const { settings } = props

  // ** States
  const [anchorEl, setAnchorEl] = useState(null)

  // ** Hooks
  const router = useRouter()
  const { logout, user } = useAuth()

  // ** Vars
  const { direction } = settings

  const handleDropdownOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = url => {
    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }

  const handleLogout = () => {
    logout()
    handleDropdownClose()
  }

  const styles = {
    py: 2,
    px: 4,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: 'text.primary',
    textDecoration: 'none',
    '& svg': {
      fontSize: '1.375rem',
      color: 'text.secondary'
    }
  }

  const renderRole = ({ role }) => {
    switch (role) {
      case '0':
        return 'مسئول مميز'
      case '1':
        return 'مسئول'
      case '2':
        return 'متطوع'
    }
  }

  const renderAvatarPath = ({ role, gender }) => {
    if (role === '0') {
      if (gender === 'male') return '/images/avatars/1.png'

      return '/images/avatars/2.png'
    }
    if (role === '1') {
      if (gender === 'male') return '/images/avatars/3.png'

      return '/images/avatars/4.png'
    }
    if (gender === 'male') return '/images/avatars/5.png'

    return '/images/avatars/6.png'
  }

  return (
    <Fragment>
      <Badge
        overlap='circular'
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: 'pointer' }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
      >
        <Avatar
          alt={user?.name}
          onClick={handleDropdownOpen}
          sx={{ width: 40, height: 40 }}
          src={renderAvatarPath(user)}
        />
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ '& .MuiMenu-paper': { width: 230, marginTop: 4 } }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: direction === 'ltr' ? 'right' : 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: direction === 'ltr' ? 'right' : 'left'
        }}
      >
        <Box sx={{ pt: 2, pb: 3, px: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Badge
              overlap='circular'
              badgeContent={<BadgeContentSpan />}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
            >
              <Avatar alt={user?.name} src={renderAvatarPath(user)} sx={{ width: '2.5rem', height: '2.5rem' }} />
            </Badge>
            <Box
              sx={{
                display: 'flex',
                marginLeft: 3,
                alignItems: 'flex-start',
                flexDirection: 'column'
              }}
            >
              <Typography sx={{ fontWeight: 600 }}>{user.name}</Typography>
              <Typography variant='body2' sx={{ fontSize: '0.8rem', color: 'text.disabled' }}>
                {renderRole(user)}
              </Typography>
            </Box>
          </Box>
        </Box>
        <MenuItem
          sx={{ py: 2 }}
          onClick={() => {
            router.push('/profile')
          }}
        >
          <PersonIcon
            sx={{
              marginRight: 2,
              fontSize: '1.375rem',
              color: 'text.secondary'
            }}
          />
          ملف تعريفي للمستخدم
        </MenuItem>
        <Divider sx={{ mt: 0, mb: 1 }} />
        <MenuItem sx={{ py: 2 }} onClick={handleLogout}>
          <LogoutVariant
            sx={{
              marginRight: 2,
              fontSize: '1.375rem',
              color: 'text.secondary'
            }}
          />
          تسجيل خروج
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export default UserDropdown
