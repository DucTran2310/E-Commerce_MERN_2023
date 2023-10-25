import { call, put, takeLatest } from "redux-saga/effects"
import { getNewProductsAction } from "~/actions/productAction"
import { apiGetProducts } from "~/apis/product"
import { setProducts } from "~/reducers/productReducer"

function* getNewProductsSaga() {
  try {
      const response = yield call(apiGetProducts, {sort: '-createdAt'})

      if (response.error === false) {
          yield put(setProducts(response.object))
      } else {
          yield put(setProducts([]))
      }
  } catch (error) {
      console.log('ERROR: ', error)
  }
}

export default function* productsSaga() {
  yield takeLatest(getNewProductsAction.type, getNewProductsSaga)
}