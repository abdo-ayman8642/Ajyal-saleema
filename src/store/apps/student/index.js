import {
  fetchData,
  getClass,
  fetchById,
  activeStudentStatus,
  fetchYears,
  fetchGov,
  fetchAdministration,
  fetchSchools,
  fetchGrades,
  fetchClasses,
  getAttendance,
  setAttendance,
  fetchBy,
  searchData,
  fetchAdministrByGov,
  filterBy
} from './actions'
import { createSlice } from '@reduxjs/toolkit'
import { createLoadingReducer } from 'src/helperFunctions/createLoadingReducer'

export const studentSlice = createSlice({
  name: 'student',
  initialState: {
    error: null,
    data: [],
    selectedStudent: null,
    selectedRows: null,
    years: [],
    grades: [],
    govs: [],
    attendanceLoading: null
  },
  reducers: {
    handleSelectedStudent: (state, { payload }) => {
      state.selectedStudent = payload
    },
    resetSearchedStudents: state => {
      state.searchedStudents = null
    },
    handleStudentAnswers: (state, { payload }) => {
      state.examAnswers = [...state.examAnswers, payload]
    }
  },
  extraReducers: {
    ...createLoadingReducer(fetchData.pending, fetchData.fulfilled, fetchData.rejected, 'data'),
    ...createLoadingReducer(fetchById.pending, fetchById.fulfilled, fetchById.rejected, 'singleStudent'),

    ...createLoadingReducer(fetchYears.pending, fetchYears.fulfilled, fetchYears.rejected, 'years'),
    ...createLoadingReducer(fetchGov.pending, fetchGov.fulfilled, fetchGov.rejected, 'gov'),
    ...createLoadingReducer(fetchGrades.pending, fetchGrades.fulfilled, fetchGrades.rejected, 'grades'),
    ...createLoadingReducer(fetchSchools.pending, fetchSchools.fulfilled, fetchSchools.rejected, 'schools'),
    ...createLoadingReducer(fetchClasses.pending, fetchClasses.fulfilled, fetchClasses.rejected, 'classes'),
    ...createLoadingReducer(
      fetchAdministration.pending,
      fetchAdministration.fulfilled,
      fetchAdministration.rejected,
      'administration'
    ),

    ...createLoadingReducer(getClass.pending, getClass.fulfilled, getClass.rejected, 'classes'),
    ...createLoadingReducer(getAttendance.pending, getAttendance.fulfilled, getAttendance.rejected, 'attendance'),
    ...createLoadingReducer(fetchBy.pending, fetchBy.fulfilled, fetchBy.rejected, 'data'),
    ...createLoadingReducer(searchData.pending, searchData.fulfilled, searchData.rejected, 'searchedStudents'),
    ...createLoadingReducer(
      fetchAdministrByGov.pending,
      fetchAdministrByGov.fulfilled,
      fetchAdministrByGov,
      'administration'
    ),
    ...createLoadingReducer(filterBy.pending, filterBy.fulfilled, filterBy.rejected, 'searchedStudents')
  }
})

export const { handleSelectedStudent, resetSearchedStudents } = studentSlice.actions

export default studentSlice.reducer
