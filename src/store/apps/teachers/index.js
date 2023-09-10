import { createSlice } from '@reduxjs/toolkit'
import { createLoadingReducer } from 'src/helperFunctions/createLoadingReducer'
import { fetchData, addTeacher, deleteTeacher, deleteMultiTeachers, editTeacher } from './actions'

// ********* Reducer ********** //

export const teacherSlice = createSlice({
  name: 'teacher',
  initialState: {
    error: null,
    data: [],
    selectedTeacher: [],
    years: [],
    grades: [],
    governorate: []
  },
  reducers: {
    handleSelectedTeacher: (state, { payload }) => {
      state.selectedTeacher = payload
    }
  },
  extraReducers: {
    ...createLoadingReducer(fetchData.pending, fetchData.fulfilled, fetchData.rejected, 'data')
  }
})

export const { handleSelectedTeacher } = teacherSlice.actions

export default teacherSlice.reducer
