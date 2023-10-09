import { createSlice } from '@reduxjs/toolkit'
import { fetchData, fetchExamAnalysis, fetchQuestions } from './actions'
import { createLoadingReducer } from 'src/helperFunctions/createLoadingReducer'

export const examSlice = createSlice({
  name: 'exam',
  initialState: {
    loading: false,
    error: null,
    data: [],
    selectedQuestion: null
  },

  reducers: {
    handleSelectedQuestion: (state, { payload }) => {
      state.selectedQuestion = payload
    }
  },

  extraReducers: {
    ...createLoadingReducer(fetchData.pending, fetchData.fulfilled, fetchData.rejected, 'data'),
    ...createLoadingReducer(fetchQuestions.pending, fetchQuestions.fulfilled, fetchQuestions.rejected, 'questions'),
    ...createLoadingReducer(fetchExamAnalysis.pending, fetchExamAnalysis.fulfilled, fetchExamAnalysis, 'examAnalysis')
  }
})

export default examSlice.reducer
