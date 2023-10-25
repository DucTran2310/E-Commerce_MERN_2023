import { combineReducers, configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import alertReducer from '~/reducers/alertReducer'
import productReducer from '~/reducers/productReducer'
import appReducer from '~/reducers/appReducer'
import mainSaga from '~/sagas/saga'

const rootReducer = combineReducers({
  alertReducer,
  productReducer,
  appReducer,
})

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware]
})

sagaMiddleware.run(mainSaga)

export default store
