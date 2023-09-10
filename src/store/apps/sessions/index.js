import { fetchData, addSession, editSession, deleteSession, deleteMultiSessions } from './actions'
import { createSlice } from '@reduxjs/toolkit'
import { createLoadingReducer } from 'src/helperFunctions/createLoadingReducer'

export const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    error: null,
    data: [],
    selectedSession: null
  },

  reducers: {
    handleSelectedSession: (state, { payload }) => {
      state.selectedSession = payload
    }
  },

  extraReducers: {
    ...createLoadingReducer(fetchData.pending, fetchData.fulfilled, fetchData.rejected, 'data')
  }
})

export const { handleSelectedSession } = sessionSlice.actions

export default sessionSlice.reducer
