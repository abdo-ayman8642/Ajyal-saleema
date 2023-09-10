// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'

// ** Icons Imports
import DotsVertical from 'mdi-material-ui/DotsVertical'
import StatusSwitch from './StatusSwitch'

/** redux import */

const ITEM_HEIGHT = 48

const MenuMaxHeight = ({ camp, exam, id }) => {
  // ** State
  const [anchorEl, setAnchorEl] = useState(null)
  const options = [{ enName: 'Exam', status: exam, arName: 'اختبار' }]

  /** Functions */
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = e => {
    e.preventDefault()
    setAnchorEl(null)
  }

  return (
    <div>
      <IconButton aria-label='more' aria-controls='long-menu' aria-haspopup='true' onClick={handleClick}>
        <DotsVertical />
      </IconButton>
      <Menu
        // keepMounted
        id='long-menu'
        anchorEl={anchorEl}
        onClose={handleClose}
        open={Boolean(anchorEl)}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5
          }
        }}
      >
        {options.map(option => (
          <MenuItem key={option}>
            <StatusSwitch option={option} id={id} />
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}

export default MenuMaxHeight
