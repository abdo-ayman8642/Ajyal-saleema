import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'

const baseUrl = 'https://edu.kyanlabs.com/edu/api/'

// ** Fetch Teachers
export const fetchData = createAsyncThunk('appTeachers/fetchData', async (page, { rejectWithValue }) => {
    try{
      const response = await axios.get(`${baseUrl}teachers`)

    return response
    }catch(err) {
      if(!err.response){
          throw err
      }
      
      return rejectWithValue(err.response.data)
  
    }
  })

  // ** Add Teacher * /
  
  export const addTeacher = createAsyncThunk('appTeacher/addTeacher', async ({ data }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(`${baseUrl}teachers`, JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      dispatch(fetchData());
  
      return response;
    } catch (err) {
      if (!err.response.ok) {
        throw err;
      }
  
      return rejectWithValue(err.response.data);
    }
  });

  // ** Delete single Teacher
  export const deleteTeacher = createAsyncThunk('appTeacher/deleteTeacher', async (id, { rejectWithValue, dispatch }) => {
    console.log(id)
    try{
      const response = await axios.delete(`${baseUrl}teachers/${id}`)
      dispatch(fetchData())
  
    return response
    }catch(err){
      if(!err.response){
        throw err
      }

      return rejectWithValue(err.response.data)
    }

  })
  
  
  export const deleteMultiTeachers = createAsyncThunk('appTeacher/multiDelete', async(ids, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(`${baseUrl}techers/delete`, { ids })
      dispatch(fetchData())

      return response
    }catch(err){
      if(!err.response){
        throw err
      }

      return rejectWithValue(err.response.data)
    }
  })


  export const editTeacher = createAsyncThunk('appTeacher/editTeacher', async({ data, id }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.patch(`${baseUrl}teachers/${id}`, JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      dispatch(fetchData())
      
      return response
    }catch(err){
      if(!err.response){
        throw err
      }

      return rejectWithValue(err.response.data)
    }
  })
  