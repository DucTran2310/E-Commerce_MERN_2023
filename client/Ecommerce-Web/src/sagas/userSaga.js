import { call, delay, put, takeLatest } from "redux-saga/effects"
import Swal from "sweetalert2"
import { loginAction, registerAction } from "~/actions/userAction"
import { apiLogin, apiRegister } from "~/apis/user"
import { resetStateSignUp, setIsRegister, setUser } from "~/reducers/appReducer"
import { endLoadingCom, loadingCom } from "~/reducers/loadingReducer"
import path from "~/utils/path"

function* registerSaga(action) {
  yield put(loadingCom())
  try {
    const response = yield call(apiRegister, action.payload)
    if (response.error === false) {
      Swal.fire('Congratulation', response.toastMessage, 'success')
      yield delay(1000)
      yield put(setIsRegister(true))
      yield put(resetStateSignUp())
    } else {
      Swal.fire('Opps!', response.toastMessage, 'error')
    }
    yield put(endLoadingCom())
  } catch (error) {
    yield put(endLoadingCom())
    console.log('ERROR: ', error)
  }
}

function* loginSaga(action) {
  yield put(loadingCom())
  try {
    const response = yield call(apiLogin, action.payload)
    if (response.error === false) {
      yield put(setUser({isLoggedIn: true, token: response.accessToken, userData: response.userData }))
      window.location.href = `/${path.HOME}`;
      yield put(resetStateSignUp())
    } else {
      Swal.fire('Opps!', response.toastMessage, 'error')
    }
    yield put(endLoadingCom())
  } catch (error) {
    yield put(endLoadingCom())
    console.log('ERROR: ', error)
  }
}

export default function* userSaga() {
  yield takeLatest(registerAction.type, registerSaga)
  yield takeLatest(loginAction.type, loginSaga)
}