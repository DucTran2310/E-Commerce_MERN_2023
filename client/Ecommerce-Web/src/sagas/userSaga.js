import { call, put, takeLatest } from "redux-saga/effects"
import Swal from "sweetalert2"
import { forgotPasswordAction, loginAction, registerAction } from "~/actions/userAction"
import { apiForgotPassword, apiLogin, apiRegister } from "~/apis/user"
import { alertError } from "~/reducers/alertReducer"
import { resetStateSignUp, setUser } from "~/reducers/appReducer"
import { endLoadingCom, loadingCom } from "~/reducers/loadingReducer"
import path from "~/utils/path"

function* registerSaga(action) {
  yield put(loadingCom())
  try {
    const response = yield call(apiRegister, action.payload)
    if (response.error === false) {
      Swal.fire('Congratulation', response.toastMessage, 'success')
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

function* forgotPasswordSaga(action) {
  yield put(loadingCom())
  try {
    const response = yield call(apiForgotPassword, action.payload)
    if (response.error === false) {
      //
    } else {
      yield put(alertError(response.toastMessage))
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
  yield takeLatest(forgotPasswordAction.type, forgotPasswordSaga)
}