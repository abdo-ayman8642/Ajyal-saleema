import { useContext } from 'react'
import { SettingsContext } from 'src/@core/context/settingsContext'


// gives context for settings 
export const useSettings = () => useContext(SettingsContext)
