import { fetchData, addEvent, editEvent, deleteEvent, deleteMultiEvents } from './actions'
import { createSlice } from '@reduxjs/toolkit'
import { createLoadingReducer } from 'src/helperFunctions/createLoadingReducer'

export const eventSlice = createSlice({
  name: 'event',
  initialState: {
    error: null,
    data: [],
    selectedEvents: null
  },

  reducers: {
    handleSelectedEvents: (state, { payload }) => {
      state.selectedEvents = payload
    }
  },

  extraReducers: {
    ...createLoadingReducer(fetchData.pending, fetchData.fulfilled, fetchData.rejected, 'data')
  }
})

export const { handleSelectedEvents } = eventSlice.actions

export default eventSlice.reducer
