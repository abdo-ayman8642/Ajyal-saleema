import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from 'src/configs/baseUrl'

/** import axios */

export const fetchData = createAsyncThunk('appExams/fetchData', async (params, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${baseUrl}exams`)

    return response
  } catch (err) {
    if (!err.response) {
      throw err
    }
  }

  return rejectWithValue(err.response.data)
})

export const fetchQuestions = createAsyncThunk(
  'appExams/fetchQuestions',
  async ({ id, page }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(`${baseUrl}exams/view/${id}?page=${page}`)

      return response
    } catch (err) {
      if (!err.response) {
        throw err
      }
    }

    return rejectWithValue(err.response.data)
  }
)

export const fetchExamAnalysis = createAsyncThunk(
  'appExams/examAnalysis',
  async ({ examId, questionId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}exams/analysis/${examId}/${questionId}`)

      return response
    } catch (err) {
      if (!err.response) {
        throw err
      }
    }

    return rejectWithValue(err.response.data)
  }
)

export const addQuestion = createAsyncThunk(
  'appExams/addQuestions',
  async ({ data }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(`${baseUrl}questions`, JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' }
      })
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

export const addExam = createAsyncThunk('appExams/addExam', async ({ data }, { rejectWithValue, dispatch }) => {
  try {
    const response = await axios.post(`${baseUrl}exams`, JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' }
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

export const resetExam = createAsyncThunk('appExams/resetExam', async (data, { rejectWithValue, dispatch }) => {
  const { examId } = data
  try {
    const response = await axios.get(`${baseUrl}exams/reset/${examId}`)
    dispatch(fetchData())

    return response
  } catch (err) {
    if (!err.response) {
      throw err
    }

    return rejectWithValue(err.response.data)
  }
})

export const deleteQuestion = createAsyncThunk('appExam/deleteQuestion', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${baseUrl}questions/${id}`)

    return response
  } catch (err) {
    if (err.response) {
      throw err
    }

    return rejectWithValue(err.response.data)
  }
})

export const deleteExam = createAsyncThunk('appExam/deleteExam', async (id, { rejectWithValue, dispatch }) => {
  try {
    const response = await axios.delete(`${baseUrl}exams/${id}`)
    dispatch(fetchData())

    return response
  } catch (err) {
    if (err.response) {
      throw err
    }

    return rejectWithValue(err.response.data)
  }
})

export const editExam = createAsyncThunk('appExam/editExam', async ({ id, data }, { rejectWithValue, dispatch }) => {
  try {
    const response = await axios.patch(`${baseUrl}exams/${id}`, JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' }
    })
    dispatch(fetchData())

    return response
  } catch (err) {
    if (err.response) {
      throw err
    }

    return rejectWithValue(err.response.data)
  }
})

export const submitAnswers = createAsyncThunk(
  'appExam/submitAnswers',
  async ({ data }, { rejectWithValue, dispatch }) => {
    const multiChoiceGroups = new Map()

    // Create an array to hold the grouped answers
    const groupedAnswers = []

    data.answers.forEach(answer => {
      if (answer.hasOwnProperty('content')) {
        answer.type = 'text'
        groupedAnswers.push(answer)
      } else if (answer.hasOwnProperty('choice_id')) {
        answer.type = 'choice'

        if (!multiChoiceGroups.has(answer.question_id)) {
          multiChoiceGroups.set(answer.question_id, [])
        }

        multiChoiceGroups.get(answer.question_id).push(answer.choice_id)
      }
    })

    // Add grouped multi-choice answers to groupedAnswers
    multiChoiceGroups.forEach((choiceIds, questionId) => {
      if (choiceIds.length === 1) {
        groupedAnswers.push({
          question_id: questionId,
          type: 'choice',
          choice_id: choiceIds[0] // Convert to a single string
        })
      } else {
        groupedAnswers.push({
          question_id: questionId,
          type: 'choice',
          choice_id: choiceIds
        })
      }
    })

    // Update data.answers with the grouped and typed answers
    data.answers = groupedAnswers

    try {
      const response = await axios.post(`${baseUrl}exam/answers/submit`, JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' }
      })
      dispatch(fetchData())

      return response
    } catch (err) {
      if (err.response) {
        throw err
      }

      return rejectWithValue(err.response.data)
    }
  }
)
