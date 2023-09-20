import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const baseUrl = 'https://edu.kyanlabs.com/edu/api/'

export const fetchData = createAsyncThunk('appEvent/fetchData', async (page, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${baseUrl}events`)
    return response
  } catch (err) {
    if (!err.response) {
      throw err
    }

    return rejectWithValue(err.response.data)
  }
})

export const addEvent = createAsyncThunk('appEvent/addEvent', async ({ data }, { rejectWithValue, dispatch }) => {
  try {
    const response = await axios.post(`${baseUrl}events`, JSON.stringify(data), {
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

export const editEvent = createAsyncThunk('appEvent/editEvent', async ({ data, id }, { rejectWithValue, dispatch }) => {
  try {
    const response = await axios.patch(`${baseUrl}events/${id}`, JSON.stringify(data), {
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
})

export const deleteEvent = createAsyncThunk('appEvent/deleteEvent', async ({ id }, { rejectWithValue, dispatch }) => {
  try {
    const response = await axios.delete(`${baseUrl}events/${id}`)
    dispatch(fetchData())
    return response
  } catch (err) {
    if (!response.ok) {
      throw err
    }

    return rejectWithValue(err)
  }
})

export const deleteMultiEvents = createAsyncThunk(
  'appEvent/deleteEvent',
  async (ids, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(`${baseUrl}events/delete`, { ids })
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
