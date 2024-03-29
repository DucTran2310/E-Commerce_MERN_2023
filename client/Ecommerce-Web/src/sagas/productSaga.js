import { call, put, takeLatest } from "redux-saga/effects"
import { getNewProductsAction } from "~/actions/productAction"
import { apiGetProducts } from "~/apis/product"
import { alertError } from "~/reducers/alertReducer"
import { endLoadingCom, loadingCom } from "~/reducers/loadingReducer"
import { setProducts } from "~/reducers/productReducer"

function* getNewProductsSaga() {
  yield put(loadingCom())
  try {
    const response = yield call(apiGetProducts, { sort: '-createdAt' })

    if (response.error === false) {
      yield put(setProducts(response.object))
    } else {
      yield put(setProducts([]))
    }
    yield put(endLoadingCom())
  } catch (error) {
    yield put(endLoadingCom())
    yield put(alertError('Vui lòng thử lại hoặc liên hệ IT để được hỗ trợ'))
  }
}

export default function* productsSaga() {
  yield takeLatest(getNewProductsAction.type, getNewProductsSaga)
}