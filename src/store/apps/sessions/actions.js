import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const baseUrl = 'https://edu.kyanlabs.com/edu/api/'

export const fetchData = createAsyncThunk('appSession/fetchData', async (page, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${baseUrl}sessions`)
    return response
  } catch (err) {
    if (!err.response) {
      throw err
    }

    return rejectWithValue(err.response.data)
  }
})

export const addSession = createAsyncThunk(
  'appSession/addSSession',
  async ({ data }, { rejectWithValue, dispatch }) => {
    console.log(data)
    try {
      const response = await axios.post(`${baseUrl}sessions`, JSON.stringify(data), {
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
  }
)

export const editSession = createAsyncThunk(
  'appSession/editSession',
  async ({ data, id }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.patch(`${baseUrl}sessions/${id}`, JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      dispatch(fetchData())
      return response
    } catch (err) {
      if (!response.ok) {
        throw err
      }

      return rejectWithValue(err)
    }
  }
)

export const deleteSession = createAsyncThunk(
  'appSession/deleteSession',
  async ({ id }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.delete(`${baseUrl}sessions/${id}`)
      dispatch(fetchData())
      return response
    } catch (err) {
      if (!response.ok) {
        throw err
      }

      return rejectWithValue(err)
    }
  }
)

export const deleteMultiSessions = createAsyncThunk(
  'appSession/deleteSession',
  async (ids, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(`${baseUrl}sessions/delete`, { ids })
      dispatch(fetchData())
      return response
    } catch (err) {
      if (!response.ok) {
        throw err
      }

      return rejectWithValue(err)
    }
  }
)
