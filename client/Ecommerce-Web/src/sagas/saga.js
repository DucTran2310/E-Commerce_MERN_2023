import { all } from 'redux-saga/effects'
import alertSaga from './alertSaga'
import categoriesSaga from './categoriesSaga'

export default function* mainSaga() {
    yield all([
      alertSaga(),
      categoriesSaga()
    ])
}
