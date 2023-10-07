import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const baseUrl = 'https://edu.kyanlabs.com/edu/api/'

export const fetchYears = createAsyncThunk('appAcademicData/fetchYears', async (page, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${baseUrl}years?page=${page}`)

    return response
  } catch (err) {
    if (!err.response) {
      throw err
    }

    return rejectWithValue(err.response.data)
  }
})

export const fetchGovs = createAsyncThunk('appAcademicData/fetchGovs', async (page, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${baseUrl}cities?page=${page}`)

    return response
  } catch (err) {
    if (!err.response) {
      throw err
    }

    return rejectWithValue(err.response.data)
  }
})

export const fetchAdministrations = createAsyncThunk(
  'appAcademicData/fetchAdministration',
  async ({ cityId, yearId, page }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}departs/year/${yearId}/city/${cityId}?page=${page}`)

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
  'appAcademicData/fetchSchools',
  async ({ id, type, page }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}schools/depart/${id}?type=${type}&page=${page}`)

      return response
    } catch (err) {
      if (!err.response) {
        throw err
      }

      return rejectWithValue(err.response.data)
    }
  }
)

export const fetchGrades = createAsyncThunk(
  'appAcademicData/fetchGrades',
  async ({ id, page }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}grades?page=${page}&school_id=${id}`)

      return response
    } catch (err) {
      if (!err.response) {
        throw err
      }

      return rejectWithValue(err.response.data)
    }
  }
)

export const fetchClasses = createAsyncThunk(
  'appAcademicData/fetchClasses',
  async ({ schoolId, gradeId, page }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}classes/school/${schoolId}/grade/${gradeId}?page=${page}`)
      return response
    } catch (err) {
      if (!err.response) {
        throw err
      }

      return rejectWithValue(err.response.data)
    }
  }
)

export const addYear = createAsyncThunk('appAcademicData/addYear', async ({ data }, { rejectWithValue, dispatch }) => {
  try {
    const response = await axios.post(`${baseUrl}years`, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    dispatch(fetchYears(1))

    return response
  } catch (err) {
    if (!err.response.ok) {
      throw err
    }

    return rejectWithValue(err.response.data)
  }
})

export const addGov = createAsyncThunk('appAcademicData/addGov', async ({ data }, { rejectWithValue, dispatch }) => {
  try {
    const response = await axios.post(`${baseUrl}cities`, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    dispatch(fetchGovs(1))
    return response
  } catch (err) {
    if (!err.response.ok) {
      throw err
    }

    return rejectWithValue(err.response.data)
  }
})

export const addAdministration = createAsyncThunk(
  'appAcademicData/addAdministration',
  async ({ data }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(`${baseUrl}departs`, JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      dispatch(fetchAdministrations({ page: 1, cityId: data.city_id, yearId: data.year_id }))

      return response
    } catch (err) {
      if (!err.response.ok) {
        throw err
      }

      return rejectWithValue(err.response.data)
    }
  }
)

export const addSchool = createAsyncThunk(
  'appAcademicData/addschool',
  async ({ data, id }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(`${baseUrl}schools`, JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (data.type === 'school') {
        dispatch(fetchSchools({ id: data.department_id, type: 'school' }))
      } else if (data.type === 'camp') {
        dispatch(getCampsByAdministration({ id: data.department_id, type: 'camp' }))
      }
      return response
    } catch (err) {
      if (!err.response.ok) {
        throw err
      }

      return rejectWithValue(err.response.data)
    }
  }
)

export const addGrade = createAsyncThunk(
  'appAcademicData/addGrade',
  async ({ data }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(`${baseUrl}grades`, JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      dispatch(fetchGrades(1))

      return response
    } catch (err) {
      if (!err.response.ok) {
        throw err
      }

      return rejectWithValue(err.response.data)
    }
  }
)

export const addClass = createAsyncThunk(
  'appAcademicData/addClass',
  async ({ data, id }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(`${baseUrl}classes`, JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      dispatch(fetchClasses({ page: 1, gradeId: data.level_id, schoolId: data.school_id }))
      return response
    } catch (err) {
      if (!err.response.ok) {
        throw err
      }

      return rejectWithValue(err.response.data)
    }
  }
)

export const editYear = createAsyncThunk(
  'appAcademicData/editYear',
  async ({ data, id }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.patch(`${baseUrl}years/${id}`, JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      dispatch(fetchYears(1))

      return response
    } catch (err) {
      if (!response.ok) {
        throw err
      }

      return rejectWithValue(err)
    }
  }
)

export const editGov = createAsyncThunk(
  'appAcademicData/editGov',
  async ({ data, id }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.patch(`${baseUrl}cities/${id}`, JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      dispatch(fetchGovs(1))

      return response
    } catch (err) {
      if (!response.ok) {
        throw err
      }

      return rejectWithValue(err)
    }
  }
)

export const editAdministration = createAsyncThunk(
  'appAcademicData/editAdministration',
  async ({ data, id }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.patch(`${baseUrl}departs/${id}`, JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      dispatch(fetchAdministrations({ page: 1, cityId: data.city_id, yearId: data.year_id }))

      return response
    } catch (err) {
      if (!response.ok) {
        throw err
      }

      return rejectWithValue(err)
    }
  }
)

export const editSchool = createAsyncThunk(
  'appAcademicData/editSchool',
  async ({ data, id }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.patch(`${baseUrl}schools/${id}`, JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (data.type === 'school') {
        dispatch(fetchSchools({ id: data.department_id, type: 'school' }))
      } else if (data.type === 'camp') {
        dispatch(getCampsByAdministration({ id: data.department_id, type: 'camp' }))
      }

      return response
    } catch (err) {
      if (!response.ok) {
        throw err
      }

      return rejectWithValue(err)
    }
  }
)

export const editGrade = createAsyncThunk(
  'appAcademicData/editGrade',
  async ({ data, id }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.patch(`${baseUrl}grades/${id}`, JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      dispatch(fetchGrades(1))

      return response
    } catch (err) {
      if (!response.ok) {
        throw err
      }

      return rejectWithValue(err)
    }
  }
)

export const editClass = createAsyncThunk(
  'appAcademicData/editClass',
  async ({ data, id }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.patch(`${baseUrl}classes/${id}`, JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      dispatch(fetchClasses({ page: 1, schoolId: data.school_id, gradeId: data.level_id }))

      return response
    } catch (err) {
      if (!response.ok) {
        throw err
      }

      return rejectWithValue(err)
    }
  }
)

export const deleteYear = createAsyncThunk(
  'appAcademicData/deleteYear',
  async ({ id }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.delete(`${baseUrl}years/${id}`)
      dispatch(fetchYears(1))

      return response
    } catch (err) {
      if (!response.ok) {
        throw err
      }

      return rejectWithValue(err)
    }
  }
)

export const deleteGov = createAsyncThunk(
  'appAcademicData/deleteGov',
  async ({ id, data }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.delete(`${baseUrl}cities/${id}`)
      dispatch(fetchGovs(1))

      return response
    } catch (err) {
      if (!response.ok) {
        throw err
      }

      return rejectWithValue(err)
    }
  }
)

export const deleteAdministration = createAsyncThunk(
  'appAcademicData/deleteAdministration',
  async ({ id, data }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.delete(`${baseUrl}departs/${id}`)
      dispatch(fetchAdministrations({ page: 1, cityId: data.city_id, yearId: data.year_id }))
      return response
    } catch (err) {
      if (!response.ok) {
        throw err
      }
      return rejectWithValue(err)
    }
  }
)

export const deleteSchool = createAsyncThunk(
  'appAcademicData/deleteSchool',
  async ({ id, data }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.delete(`${baseUrl}schools/${id}`)
      if (data.type === 'school') {
        dispatch(fetchSchools({ id: data.department_id, type: 'school' }))
      } else if (data.type === 'camp') {
        dispatch(getCampsByAdministration({ id: data.department_id, type: 'camp' }))
      }
      return response
    } catch (err) {
      if (!response.ok) {
        throw err
      }

      return rejectWithValue(err)
    }
  }
)

export const deleteGrade = createAsyncThunk(
  'appAcademicData/deleteGrade',
  async ({ id }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.delete(`${baseUrl}grades/${id}`)

      dispatch(fetchGrades(1))
      return response
    } catch (err) {
      if (!response.ok) {
        throw err
      }

      return rejectWithValue(err)
    }
  }
)

export const deleteClass = createAsyncThunk(
  'appAcademicData/deleteClass',
  async ({ id, data }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.delete(`${baseUrl}classes/${id}`)
      dispatch(fetchClasses({ page: 1, gradeId: data.level_id, schoolId: data.school_id }))
      return response
    } catch (err) {
      if (!response.ok) {
        throw err
      }

      return rejectWithValue(err)
    }
  }
)

export const filterBy = createAsyncThunk(
  'appAcademicData/fetchBy',

  async ({ page, value, query }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(`${baseUrl}students/filter/by?${query}=${value}&page=${page}`)

      return response
    } catch (err) {
      if (!err.response) {
        throw err
      }

      return rejectWithValue(err.response.data)
    }
  }
)

export const addStudent = createAsyncThunk('appStudent/addStudent', async ({ data }, { rejectWithValue, dispatch }) => {
  try {
    const response = await axios.post(`${baseUrl}students`, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    dispatch(filterBy({ page: 1, query: data.query, value: data.urlId }))

    return response
  } catch (err) {
    if (!err.response.ok) {
      throw err
    }

    return rejectWithValue(err.response.data)
  }
})

export const editStudent = createAsyncThunk(
  'appAcademicData/editStudent',
  async ({ id, data }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.patch(`${baseUrl}students/${id}`, JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      dispatch(filterBy({ page: 1, query: data.query, value: data.urlId }))

      return response
    } catch (err) {
      if (!response.ok) {
        throw err
      }

      return rejectWithValue(err)
    }
  }
)

export const deleteStudent = createAsyncThunk(
  'appAcademicData/deleteStudent',
  async ({ data, id }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.delete(`${baseUrl}students/${id}`)
      dispatch(filterBy({ page: 1, query: data.query, value: data.urlId }))

      return response
    } catch (err) {
      if (!response.ok) {
        throw err
      }

      return rejectWithValue(err)
    }
  }
)

export const getSchoolById = createAsyncThunk(
  'appAcademicData/getSchoolById',

  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(`${baseUrl}schools/${id}`)

      return response
    } catch (err) {
      if (!err.response) {
        throw err
      }

      return rejectWithValue(err.response.data)
    }
  }
)

export const getAdministrationById = createAsyncThunk(
  'appAcademicData/getGradesById',

  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(`${baseUrl}departs/${id}`)

      return response
    } catch (err) {
      if (!err.response) {
        throw err
      }

      return rejectWithValue(err.response.data)
    }
  }
)

export const getCampsByAdministration = createAsyncThunk(
  'appAcademicData/getCampsByAdministration',

  async ({ id, type, page }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(`${baseUrl}schools/depart/${id}?type=${type}&page=${page}`)

      return response
    } catch (err) {
      if (!err.response) {
        throw err
      }

      return rejectWithValue(err.response.data)
    }
  }
)

export const searchData = createAsyncThunk(
  'appAcademicData/searchData',

  async ({ page, query, searched }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(`${baseUrl}${searched}/search?q=${query}&page=${page}`)

      return response
    } catch (err) {
      if (!err.response) {
        throw err
      }

      return rejectWithValue(err.response.data)
    }
  }
)
