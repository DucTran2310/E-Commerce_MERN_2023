import { call, delay, put, takeLatest } from "redux-saga/effects"
import Swal from "sweetalert2"
import { forgotPasswordAction, getCurrentUserAction, loginAction, registerAction, resetPasswordAction } from "~/actions/userAction"
import { apiFinalRegister, apiForgotPassword, apiGetCurrent, apiLogin, apiRegister, apiResetPassword } from "~/apis/user"
import { alertError } from "~/reducers/alertReducer"
import { resetStateSignUp, setCurrentUser, setIsForgotPass, setIsModalSendEmail, setUser } from "~/reducers/appReducer"
import { endLoadingCom, loadingCom } from "~/reducers/loadingReducer"
import path from "~/utils/path"

function* registerSaga(action) {
  yield put(loadingCom())
  try {
    const response = yield call(apiRegister, action.payload)
    if (response.error === false) {
      yield put(resetStateSignUp())

      Swal.fire({
        title: "We sent a code to your email. Please check your email and enter your code",
        input: "text",
        inputAttributes: {
          autocapitalize: "off"
        },
        showCancelButton: true,
        confirmButtonText: "Submit",
        showLoaderOnConfirm: true,
        preConfirm: async (token) => {
          try {
            const response = await apiFinalRegister(token)
            if (response.error === false) {
              Swal.fire('Congratulation', response.toastMessage, 'success')
            } else {
              throw new Error(response.toastMessage);
            }
          } catch (error) {
            Swal.showValidationMessage(`
              Error: ${error}
            `);
          }
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.value.error === false) {
          Swal.fire('Congratulation', response.toastMessage, 'success')
        }
      });
    } else {
      Swal.fire('Opps!', response.toastMessage, 'error')
    }
    yield put(endLoadingCom())
  } catch (error) {
    yield put(endLoadingCom())
    yield put(alertError('Vui lòng thử lại hoặc liên hệ IT để được hỗ trợ'))
  }
}

function* loginSaga(action) {
  yield put(loadingCom())
  try {
    const response = yield call(apiLogin, action.payload)
    if (response.error === false) {
      yield put(setUser({ isLoggedIn: true, token: response.accessToken, userData: response.userData }))
      window.location.href = `/${path.HOME}`;
      yield put(resetStateSignUp())
    } else {
      Swal.fire('Opps!', response.toastMessage, 'error')
    }
    yield put(endLoadingCom())
  } catch (error) {
    yield put(endLoadingCom())
    yield put(alertError('Vui lòng thử lại hoặc liên hệ IT để được hỗ trợ'))
  }
}

function* forgotPasswordSaga(action) {
  yield put(loadingCom())
  try {
    const response = yield call(apiForgotPassword, action.payload)
    if (response.error === false) {
      yield put(setIsForgotPass(false))
      yield put(setIsModalSendEmail(true))
    } else {
      yield put(alertError(response.toastMessage))
    }
    yield put(endLoadingCom())
  } catch (error) {
    yield put(endLoadingCom())
    yield put(alertError('Vui lòng thử lại hoặc liên hệ IT để được hỗ trợ'))
  }
}

function* resetPasswordSaga(action) {
  yield put(loadingCom())
  try {
    const response = yield call(apiResetPassword, action.payload)
    if (response.error === false) {
      Swal.fire('Congratulation', 'change password successfully', 'success')
      yield delay(1500)
      window.location.href = `/${path.LOGIN}`
      yield put(resetStateSignUp())
    } else {
      yield put(alertError(response.toastMessage))
    }
    yield put(endLoadingCom())
  } catch (error) {
    yield put(endLoadingCom())
    yield put(alertError('Vui lòng thử lại hoặc liên hệ IT để được hỗ trợ'))
  }
}

function* getCurrentSaga(action) {
  yield put(loadingCom())
  try {
    const response = yield call(apiGetCurrent, action.payload)
    if (response.error === false) {
      yield put(setCurrentUser(response.object))
    } else {
      yield put(alertError(response.toastMessage))
    }
    yield put(endLoadingCom())
  } catch (error) {
    yield put(endLoadingCom())
    yield put(alertError('Vui lòng thử lại hoặc liên hệ IT để được hỗ trợ'))
  }
}

export default function* userSaga() {
  yield takeLatest(registerAction.type, registerSaga)
  yield takeLatest(loginAction.type, loginSaga)
  yield takeLatest(forgotPasswordAction.type, forgotPasswordSaga)
  yield takeLatest(resetPasswordAction.type, resetPasswordSaga)
  yield takeLatest(getCurrentUserAction.type, getCurrentSaga)
}