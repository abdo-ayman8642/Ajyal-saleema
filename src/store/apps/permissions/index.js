// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'
import { setPermission } from './actions'

export const permissionsSlice = createSlice({
  name: 'permissions',
  initialState: {
    permissionLoading: null
  },

  reducers: {},
  extraReducers: {
    [setPermission.pending]: state => {
      state.permissionLoading = true
    },
    [setPermission.fulfilled]: state => {
      state.permissionLoading = false
    },
    [setPermission.rejected]: state => {
      state.permissionLoading = false
    },
  }
})

export default permissionsSlice.reducer
