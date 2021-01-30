import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import adviceReducer from './advice.slice'

export default configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    advice: adviceReducer,
  },
})
