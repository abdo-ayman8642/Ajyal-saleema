import { createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios imports
import axios from 'axios'

const baseUrl = 'https://edu.kyanlabs.com/edu/api/'

/******************** Handle Multi Delete ??$$%%%  *********************/

// ******************* Actions ********************* //
// https://edu.kyanlabs.com/edu/api/students
// fetch students
export const fetchData = createAsyncThunk('appStudent/fetchData', async (page, { rejectWithValue }) => {
  try {
    const response = await axios.get(`https://edu.kyanlabs.com/edu/api/students?page=${page}`)

    return response
  } catch (err) {
    if (!err.response) {
      throw err
    }

    return rejectWithValue(err.response.data)
  }
})

// get by Id
export const fetchById = createAsyncThunk('appStudent/fetchById', async (id, { rejectWithValue }) => {
  try {
    const response = axios.get(`${baseUrl}students/${id}`)

    return response
  } catch (err) {
    if (err.response.status === 404) {
      return null
    }

    return rejectWithValue(err.response.data)
  }
})

export const addStudent = createAsyncThunk('appStudent/addStudent', async ({ data }, { rejectWithValue, dispatch }) => {
  try {
    const response = await axios.post(`${baseUrl}students`, JSON.stringify(data), {
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

export const editStudent = createAsyncThunk(
  'appStudent/editStudent',
  async ({ id, data }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.patch(`${baseUrl}students/${id}`, JSON.stringify(data), {
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

export const deleteStudent = createAsyncThunk('appStudent/deleteStudent', async (id, { rejectWithValue, dispatch }) => {
  try {
    const response = await axios.delete(`${baseUrl}students/${id}`)
    dispatch(fetchData())

    return response
  } catch (err) {
    if (!response.ok) {
      throw err
    }

    return rejectWithValue(err)
  }
})

export const deleteMultiStudents = createAsyncThunk(
  'appStudent/multiDelete',
  async (ids, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(`${baseUrl}students/delete`, { ids })
      dispatch(fetchData())

      return response
    } catch (err) {
      if (!err.response) {
        throw err
      }

      return rejectWithValue(err.response.data)
    }
  }
)

/**************** active has exam and camp  ****************/
export const activeStudentStatus = createAsyncThunk(
  'appStudent/activeStudentStatus',
  async ({ type, id }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(`https://edu.kyanlabs.com/edu/api/students/exmp/has${type}/${id}`)
      dispatch(fetchData())

      return response
    } catch (err) {
      if (!response.ok) {
        throw err
      }

      rejectWithValue(err.response.data)
    }
  }
)

/**************** active has exam and camp  ****************/

export const deactiveStudentStatus = createAsyncThunk(
  'appStudent/deactiveStudentStatus',
  async ({ type, id }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(`https://edu.kyanlabs.com/edu/api/students/exmp/hasNot${type}/${id}`, {})
      dispatch(fetchData())

      return response
    } catch (err) {
      if (!response.ok) {
        throw err
      }

      rejectWithValue(err.response.data)
    }
  }
)

export const fetchYears = createAsyncThunk('appStudent/fetchYear', async (params, { rejectWithValue, dispatch }) => {
  try {
    const response = await axios.get('https://edu.kyanlabs.com/edu/api/years', {
      params
    })

    return response
  } catch (err) {
    if (!err.response) {
      throw err
    }

    return rejectWithValue(err.response.data)
  }
})

export const fetchGov = createAsyncThunk('appStudent/fetchGov', async (params, { rejectWithValue, dispatch }) => {
  try {
    const response = await axios.get(`https://edu.kyanlabs.com/edu/api/cities`)

    return response
  } catch (err) {
    if (!err.response) {
      throw err
    }

    return rejectWithValue(err.response.data)
  }
})

export const fetchAdministration = createAsyncThunk(
  'appStudent/fetchAdministration',
  async ({ yearId, cityId }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(`https://edu.kyanlabs.com/edu/api/departs/year/${yearId}/city/${cityId}`)

      return response
    } catch (err) {
      if (!err.response) {
        throw err
      }

      return rejectWithValue(err.response.data)
    }
  }
)

export const fetchSchools = createAsyncThunk(
  'appStudent/fetchSchools',
  async ({ id }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(`https://edu.kyanlabs.com/edu/api/schools/depart/${id}`)

      return response
    } catch (err) {
      if (!err.response) {
        throw err
      }

      return rejectWithValue(err.response.data)
    }
  }
)

export const fetchGrades = createAsyncThunk('appStudent/fetchGrades', async (params, { rejectWithValue, dispatch }) => {
  try {
    const response = await axios.get(`https://edu.kyanlabs.com/edu/api/grades`)

    return response
  } catch (err) {
    if (!err.response) {
      throw err
    }

    return rejectWithValue(err.response.data)
  }
})

export const fetchClasses = createAsyncThunk(
  'appStudent/fetchClasses',
  async ({ id }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(`https://edu.kyanlabs.com/edu/api/classes/school/${id}`)

      return response
    } catch (err) {
      if (!err.response) {
        throw err
      }

      return rejectWithValue(err.response.data)
    }
  }
)

export const getClass = createAsyncThunk('appStudent/fetchClasses', async (degree, { rejectWithValue, dispatch }) => {
  try {
    const response = await axios.get(`https://edu.kyanlabs.com/edu/api/class/${degree}`)

    return response
  } catch (err) {
    if (!err.response) {
      throw err
    }

    return rejectWithValue(err.response.data)
  }
})

export const setAttendance = createAsyncThunk(
  'appStudent/sessionAttendance',
  async ({ sessionId, studentId }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(
        `https://edu.kyanlabs.com/edu/api/students/${studentId}/sessions/${sessionId}/attend`
      )

      return response
    } catch (err) {
      if (!err.response) {
        throw err
      }

      return rejectWithValue(err.response.data)
    }
  }
)

export const setAbsence = createAsyncThunk(
  'appStudent/sessionAbsence',
  async ({ sessionId, studentId }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(
        `https://edu.kyanlabs.com/edu/api/students/${studentId}/sessions/${sessionId}/absent`
      )

      return response
    } catch (err) {
      if (!err.response) {
        throw err
      }

      return rejectWithValue(err.response.data)
    }
  }
)

export const getAttendance = createAsyncThunk('appStudent/getAttendance', async (id, { rejectWithValue, dispatch }) => {
  try {
    const response = await axios.get(`${baseUrl}sessions/student/${id}`)

    return response
  } catch (err) {
    if (!err.response) {
      throw err
    }

    return rejectWithValue(err.response.data)
  }
})

export const fetchBy = createAsyncThunk(
  'appStudent/fetchBy',

  async ({ page, value, query }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(`${baseUrl}/students/filter/by?${query}=${value}?page=${page}`)

      return response
    } catch (err) {
      if (!err.response) {
        throw err
      }

      return rejectWithValue(err.response.data)
    }
  }
)

export const searchData = createAsyncThunk('appStudent/search', async (name, { rejectWithValue, dispatch }) => {
  try {
    const response = await axios.get(`${baseUrl}students/search/${name}`)

    return response
  } catch (err) {
    if (!err.response) {
      throw err
    }

    return rejectWithValue(err.response.data)
  }
})

export const fetchAdministrByGov = createAsyncThunk(
  'appStudent/departsByGov',
  async ({ yearId, cityId }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(`${baseUrl}departs/year/${yearId}/city/${cityId}`)

      return response
    } catch (err) {
      if (!err.response) {
        throw err
      }

      return rejectWithValue(err.response.data)
    }
  }
)

export const filterBy = createAsyncThunk(
  'appStudent/filterBy',
  async ({ query, value }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(`${baseUrl}students/filter/by?${query}=${value}`)

      return response
    } catch (err) {
      if (!err.response) {
        throw err
      }

      return rejectWithValue(err.response.data)
    }
  }
)

export const handleImport = createAsyncThunk(
  'appStudent/studentImport',
  async (formData, { rejectWithValue, dispatch }) => {
    console.log(formData)
    try {
      const response = await axios.post(`${baseUrl}student/import`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
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
