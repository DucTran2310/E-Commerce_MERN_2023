import { call, put, takeLatest } from "redux-saga/effects"
import { getCategoriesAction } from "~/actions/appActions"
import { apiGetCategories } from "~/apis"
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
    console.log('ERROR: ', error)
  }
}

export default function* categoriesSaga() {
  yield takeLatest(getCategoriesAction.type, getListCategoriesSaga)
}