import { combineReducers, configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import alertReducer from '~/reducers/alertReducer'
import appReducer from '~/reducers/appReducer'
import mainSaga from '~/sagas/saga'

const rootReducer = combineReducers({
  alertReducer,
  appReducer
})

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware]
})

sagaMiddleware.run(mainSaga)

export default store
