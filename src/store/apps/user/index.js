import { createSlice } from '@reduxjs/toolkit'
import { createLoadingReducer } from 'src/helperFunctions/createLoadingReducer'
import { fetchData, addUser, deleteUser, deleteMultiUsers, editUser, dashboardData, searchData } from './actions'

// ********* Reducer ********** //

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    error: null,
    selectedUser: [],

  },
  reducers: {
    handleSelectedUser: (state, { payload }) => {
      state.selectedUser = payload
    },
    resetSearchedUsers: (state) => {
      state.searchedUsers = null
    }
  },
  extraReducers: {
    ...createLoadingReducer(fetchData.pending, fetchData.fulfilled, fetchData.rejected, 'data'),
    ...createLoadingReducer(dashboardData.pending, dashboardData.fulfilled, dashboardData.rejected, 'dashboard'),
    ...createLoadingReducer(searchData.pending, searchData.fulfilled, searchData.rejected, 'searchedUsers'),
  }
})

export const { resetSearchedUsers, handleSelectedUser } = userSlice.actions

export default userSlice.reducer
