import toast from 'react-hot-toast'

export const createLoadingReducer = (pendingAction, fulfilledAction, rejectedAction, dataName) => ({
  [pendingAction]: state => {
    state[`${dataName}Loading`] = true
  },
  [fulfilledAction]: (state, { payload }) => {
    state[`${dataName}Loading`] = false
    if (payload.status) {
      state[dataName] = payload.data
    } else {
      if (payload.validation_error?.length) {
        toast.error(payload.validation_error.join('.'))
      } else {
        toast.error(payload.msg)
      }
    }
  },
  [rejectedAction]: state => {
    state[`${dataName}Loading`] = false
    toast.error('حدث خطأ')
  }
})
