import { call, put, takeLatest } from "redux-saga/effects"
import { getCategoriesAction } from "~/actions/appActions"
import { apiGetCategories } from "~/apis"
import { alertError } from "~/reducers/alertReducer"
import { setCategories } from "~/reducers/appReducer"
import { endLoadingCom, loadingCom } from "~/reducers/loadingReducer"

function* getListCategoriesSaga() {
  yield put(loadingCom())
  try {
    const response = yield call(apiGetCategories)

    if (response.error === false) {
      yield put(setCategories(response.object))
    } else {
      yield put(setCategories([]))
    }
    yield put(endLoadingCom())
  } catch (error) {
    yield put(endLoadingCom())
    yield put(alertError('Vui lòng thử lại hoặc liên hệ IT để được hỗ trợ'))
  }
}

export default function* categoriesSaga() {
  yield takeLatest(getCategoriesAction.type, getListCategoriesSaga)
}