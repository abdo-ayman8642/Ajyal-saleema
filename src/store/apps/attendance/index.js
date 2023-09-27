import { createSlice, configureStore } from '@reduxjs/toolkit'
const getCheckedIds = obj => {
  const idList = []
  for (const key in obj) {
    if (obj[key][1]) {
      idList.push(Number(obj[key][0]))
    }
  }
  return idList
}

export const attendanceDataSlice = createSlice({
  name: 'attendanceData',
  initialState: {
    formData: [
      {
        fieldName: 'Year',
        endpoint: 'year',
        items: [],
        currValue: '',
        helperText: '',
        disabledAtt: false
      },
      {
        fieldName: 'Governorate',
        endpoint: 'city',
        items: [],
        currValue: '',
        helperText: '',
        disabledAtt: true
      },
      {
        fieldName: 'Administration',
        endpoint: 'depart',
        items: [],
        currValue: '',
        helperText: '',
        disabledAtt: true
      },
      {
        fieldName: 'School',
        endpoint: 'school',
        items: [],
        currValue: '',
        helperText: '',
        disabledAtt: true
      },
      {
        fieldName: 'Grade',
        endpoint: 'grade',
        items: [],
        currValue: '',
        helperText: '',
        disabledAtt: true
      },
      {
        fieldName: 'Class',
        endpoint: 'class',
        items: [],
        currValue: '',
        helperText: '',
        disabledAtt: true
      }
    ],
    sessionsList: [],
    currentInput: [0, '']
  },

  reducers: {
    handleCheckBoxes: (state, { payload }) => {
      const currentState = { ...state.checkBoxesState, [payload.id]: [payload.session_id, payload.value] }
      state.checkBoxesState = currentState
      state.sessionsList = getCheckedIds(currentState)
    },
    setFormData: (state, { payload }) => {
      state.formData = payload
    },
    setField: (state, { payload }) => {
      state.formData[payload.index][payload.field] = payload.value
    },
    setCurrentInput: (state, { payload }) => {
      state.currentInput = payload.value
    },
    resetFromIndexToLast: (state, { payload }) => {
      for (let i = payload.index + 1; i < state.formData.length; i++) {
        state.formData[i].disabledAtt = true
        state.formData[i].currValue = ''
        state.formData[i].items = []
      }
    }
  }
})

export const { handleCheckBoxes, setFormData, setField, resetFromIndexToLast, setCurrentInput } =
  attendanceDataSlice.actions
export default attendanceDataSlice.reducer
