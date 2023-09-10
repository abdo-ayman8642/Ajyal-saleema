import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


const baseUrl = 'https://edu.kyanlabs.com/edu/api/'


export const setPermission = createAsyncThunk(
  'appSession/setPermission',
  async ({ moduleType, permissionType, id }, { rejectWithValue }) => {
    try {
      console.log(`${baseUrl}${moduleType}/permissions/${permissionType}/${id}`)
      const response = await axios.get(`${baseUrl}${moduleType}/permissions/${permissionType}/${id}`)

      return response
    } catch (err) {
      if (!err.response.ok) {
        throw err
      }

      return rejectWithValue(err.response.data)
    }
  }
)
