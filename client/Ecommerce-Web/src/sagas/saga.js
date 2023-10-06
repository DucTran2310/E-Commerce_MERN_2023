import { all } from 'redux-saga/effects'
import alertSaga from './alertSaga'

export default function* mainSaga() {
    yield all([
      alertSaga()
    ])
}
