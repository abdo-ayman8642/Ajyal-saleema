import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from 'src/configs/baseUrl'

// ** Fetch Users

export const fetchData = createAsyncThunk('appUsers/fetchData', async (page, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${baseUrl}users?page=${page}`)

    return response
  } catch (err) {
    if (!err.response) {
      throw err
    }

    return rejectWithValue(err.response.data)
  }
})

// ** Add User * /

export const addUser = createAsyncThunk('appUsers/addUser', async ({ data }, { rejectWithValue, dispatch }) => {
  try {
    const response = await axios.post(`${baseUrl}users`, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    dispatch(fetchData())

    return response
  } catch (err) {
    if (!err.response.ok) {
      throw err
    }

    return rejectWithValue(err.response.data)
  }
})

//update permissions
export const updateUser = createAsyncThunk('appUsers/updateUser', async ({ data }, { rejectWithValue, dispatch }) => {
  try {
    console.log(data)

    const response = await axios.post(`${baseUrl}users/permissions`, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    dispatch(fetchData())

    return response
  } catch (err) {
    if (!err.response.ok) {
      throw err
    }

    return rejectWithValue(err.response.data)
  }
})

// ** Delete single User
export const deleteUser = createAsyncThunk('appUsers/deleteUser', async (id, { rejectWithValue, dispatch }) => {
  try {
    const response = await axios.delete(`${baseUrl}users/${id}`)
    dispatch(fetchData())

    return response
  } catch (err) {
    if (!err.response) {
      throw err
    }

    return rejectWithValue(err.response.data)
  }
})

export const deleteMultiUsers = createAsyncThunk('appUser/multiDelete', async (ids, { rejectWithValue, dispatch }) => {
  try {
    const response = await axios.post(`${baseUrl}users/delete`, { ids })
    dispatch(fetchData())

    return response
  } catch (err) {
    if (!err.response) {
      throw err
    }

    return rejectWithValue(err.response.data)
  }
})

export const editUser = createAsyncThunk('appUser/editUser', async ({ data, id }, { rejectWithValue, dispatch }) => {
  try {
    const response = await axios.patch(`${baseUrl}users/${id}`, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    dispatch(fetchData())

    return response
  } catch (err) {
    if (!err.response) {
      throw err
    }

    return rejectWithValue(err.response.data)
  }
})

export const dashboardData = createAsyncThunk('appUser/dashboard', async (params, { rejectWithValue, dispatch }) => {
  try {
    const response = await axios.get(`${baseUrl}dashboard`)

    return response
  } catch (err) {
    if (!err.response) {
      throw err
    }

    return rejectWithValue(err.response.data)
  }
})

export const searchData = createAsyncThunk('appUser/search', async (name, { rejectWithValue, dispatch }) => {
  try {
    const response = await axios.get(`${baseUrl}users/search/${name}`)

    return response
  } catch (err) {
    if (!err.response) {
      throw err
    }

    return rejectWithValue(err.response.data)
  }
})
