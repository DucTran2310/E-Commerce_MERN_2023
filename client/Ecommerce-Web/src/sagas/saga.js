import { all } from 'redux-saga/effects'
import alertSaga from './alertSaga'
import categoriesSaga from './categoriesSaga'
import productsSaga from './productSaga'
import userSaga from './userSaga'

export default function* mainSaga() {
    yield all([
      alertSaga(),
      categoriesSaga(),
      productsSaga(),
      userSaga()
    ])
}
