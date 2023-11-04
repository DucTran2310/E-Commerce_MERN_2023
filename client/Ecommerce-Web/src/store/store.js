import { combineReducers, configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import alertReducer from '~/reducers/alertReducer'
import appReducer from '~/reducers/appReducer'
import loadingReducer from '~/reducers/loadingReducer'
import productReducer from '~/reducers/productReducer'
import mainSaga from '~/sagas/saga'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'

const commonConfig = {
  key: 'shop/user',
  storage
}

const userConfig = {
  ...commonConfig,
  whitelist: ['isLoggedIn', 'token']
}

const rootReducer = combineReducers({
  alertReducer,
  productReducer,
  // appReducer,
  loadingReducer,
  appReducer: persistReducer(userConfig, appReducer)
})

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware]
})

sagaMiddleware.run(mainSaga)

export const persistor =  persistStore(store)
