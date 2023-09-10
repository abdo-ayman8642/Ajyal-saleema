import {
  fetchAdministrations,
  filterBy,
  fetchClasses,
  fetchGovs,
  fetchGrades,
  fetchSchools,
  fetchYears,
  getSchoolById,
  getGradesById,
  getAdministrationById,
  getCampsByAdministration,
  searchData,
  fetchCampStudents
} from './actions'
import { createSlice } from '@reduxjs/toolkit'
import { createLoadingReducer } from 'src/helperFunctions/createLoadingReducer'

export const academicDataSlice = createSlice({
  name: 'academicData',
  initialState: {
    data: {},
    loading: true
  },

  reducers: {
    handleSelectedData: (state, { payload }) => {
      state.selectedData = payload
    },
    handlePastRoute: (state, { payload }) => {
      state.pastRouteId = payload
    },
    resetSearchedData: state => {
      state.searchedData = null
      state.searchedQuery = null
    },
    handleSearchedQuery: (state, { payload }) => {
      state.searchedQuery = payload
    }
  },
  extraReducers: {
    ...createLoadingReducer(fetchYears.pending, fetchYears.fulfilled, fetchYears.rejected, 'years'),
    ...createLoadingReducer(fetchGovs.pending, fetchGovs.fulfilled, fetchGovs.rejected, 'govs'),
    ...createLoadingReducer(
      fetchAdministrations.pending,
      fetchAdministrations.fulfilled,
      fetchAdministrations.rejected,
      'administrations'
    ),
    ...createLoadingReducer(fetchSchools.pending, fetchSchools.fulfilled, fetchSchools.rejected, 'schools'),
    ...createLoadingReducer(fetchGrades.pending, fetchGrades.fulfilled, fetchGrades.rejected, 'grades'),
    ...createLoadingReducer(fetchClasses.pending, fetchClasses.fulfilled, fetchClasses.rejected, 'classes'),
    ...createLoadingReducer(filterBy.pending, filterBy.fulfilled, filterBy.rejected, 'students'),
    ...createLoadingReducer(getSchoolById.pending, getSchoolById.fulfilled, getSchoolById.rejected, 'singleSchool'),
    ...createLoadingReducer(
      getAdministrationById.pending,
      getAdministrationById.fulfilled,
      getAdministrationById.rejected,
      'singleAdministration'
    ),
    ...createLoadingReducer(
      getCampsByAdministration.pending,
      getCampsByAdministration.fulfilled,
      getCampsByAdministration.rejected,
      'camps'
    ),
    ...createLoadingReducer(searchData.pending, searchData.fulfilled, searchData.rejected, 'searchedData')
  }
})

export const { handleSelectedData, handlePastRoute, resetSearchedData, handleSearchedQuery } = academicDataSlice.actions

export default academicDataSlice.reducer
