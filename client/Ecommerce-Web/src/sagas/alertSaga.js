import { put, takeLatest } from 'redux-saga/effects'
import {
  endAlertCom,
  startAlertError,
  startAlertSuccess
} from '~/actions/alertAction'
import { alertError, alertSuccess, endAlert } from '~/reducers/alertReducer'

function* notifyAlertError(action) {
  const value = action.payload
  yield put(alertError(value))
}

function* notifyAlertSuccess(action) {
  const value = action.payload
  yield put(alertSuccess(value))
}

function* endNotifyAlert(action) {
  const value = action.payload
  yield put(endAlert(value))
}

export default function* alertSaga() {
  yield takeLatest(startAlertError.type, notifyAlertError)
  yield takeLatest(startAlertSuccess.type, notifyAlertSuccess)
  yield takeLatest(endAlertCom.type, endNotifyAlert)
}
