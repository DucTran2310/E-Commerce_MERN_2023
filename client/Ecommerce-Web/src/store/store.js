import { combineReducers, configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import alertReducer from '~/reducers/alertReducer'
import mainSaga from '~/sagas/saga'

const rootReducer = combineReducers({
  alertReducer
})

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware]
})

sagaMiddleware.run(mainSaga)

export default store
