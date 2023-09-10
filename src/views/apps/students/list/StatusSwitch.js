// ** React Imports

/** hooks */
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'


// ** MUI Imports
import Switch from '@mui/material/Switch'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'


/** import from redux */
import { activeStudentStatus, deactiveStudentStatus, fetchData } from 'src/store/apps/student/actions'

const StatusSwitch = ({ option, id }) => {


  // ** State && variables  
  
  const [checked, setChecked] = useState(false)
  const dispatch = useDispatch()
  const loading  = useSelector(state => state.student.loading)
  
  

  useEffect(() => {
    if(option.status) {
      setChecked(true)
    }
  },[])




/** Functions */
const handleChange = event => {
  setChecked(event.target.checked)
  const currChecked = event.target.checked
    if (currChecked) {
      dispatch(activeStudentStatus({ type: option.enName, id: id }));
    } else {
      dispatch(deactiveStudentStatus({ type: option.enName, id: id }));
    }
}



  return (

      <FormControlLabel label={option.arName} control={<Switch name={option.arName} checked={checked} onChange={handleChange} />}  labelPlacement="start" />
   
   
  )
}

export default StatusSwitch
