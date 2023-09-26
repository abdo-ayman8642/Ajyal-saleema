import { createSlice } from '@reduxjs/toolkit'
import { addDepartment, deleteDepartment, editDepartment, getDepartments } from './actions'

const initialState = {
  departments: [],
  loading: false,
  error: null,
  success: true
}

const departmentSlice = createSlice({
  name: 'departments',
  initialState,
  reducers: {},
  extraReducers: {
    //Show departments
    [getDepartments.pending]: state => {
      state.loading = true
    },
    [getDepartments.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.departments = payload.data
    },
    [getDepartments.rejected]: state => {
      state.loading = false
    },

    //add department
    [addDepartment.pending]: state => {
      state.saveLoading = true
    },
    [addDepartment.fulfilled]: (state, { payload }) => {
      state.saveLoading = false

      if (payload.status) {
        state.departments.push(payload.data)
      }

      if (!payload.status) {
        toast.error(payload.msg)
      }
    },
    [addDepartment.rejected]: (state, action) => {
      state.saveLoading = false
    },

    //edit department
    [editDepartment.pending]: state => {
      state.saveLoading = true
    },
    [editDepartment.fulfilled]: (state, { payload }) => {
      state.saveLoading = false
      if (payload.status) {
        state.departments = state.departments.map(item => (item.id === payload.data.id ? payload.data : item))
      } else {
        toast.error(payload.msg)
      }
    },
    [editDepartment.rejected]: state => {
      state.saveLoading = false
    },

    //delete department
    [deleteDepartment.pending]: state => {
      state.deleteloading = true
    },
    [deleteDepartment.fulfilled]: (state, { payload }) => {
      state.deleteloading = false

      if (payload.data.status) {
        state.departments = state.departments.filter(item => item.id !== payload.id)
      }

      if (!payload.data.status) {
      }
    },
    [deleteDepartment.rejected]: state => {
      state.deleteloading = false
    }
  }
})

export default departmentSlice.reducer
