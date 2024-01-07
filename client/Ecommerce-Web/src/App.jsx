import { Home, Login, Public } from "@pages/publics"
import path from "@utils/path"
import { Route, Routes } from "react-router-dom"
import Blogs from "./pages/publics/Blogs/Blogs"
import DetailProduct from "./pages/publics/DetailProduct/DetailProduct"
import FAQ from "./pages/publics/FAQ/FAQ"
import Products from "./pages/publics/Products/Products"
import Services from "./pages/publics/Services/Services"
import { useDispatch, useSelector } from "react-redux"
import Loading from "./components/Loading/Loading"
import NotifySnackbar from "./components/NotifySnackbar/NotifySnackbar"
import { endAlertCom } from "./actions/alertAction"
import FinalRegister from "./pages/publics/FinalRegister/FinalRegister"
import ResetPassword from "./pages/publics/ResetPassword/ResetPassword"
import Modal from "./components/Modal/Modal"
import { useEffect } from "react"
import { getCategoriesAction } from "./actions/appActions"

function App() {

  const { loadingCom } = useSelector((state) => state.loadingReducer)
  const { notifyEventCom } = useSelector((state) => state.alertReducer)
  const { modalChildren, isShowModal } = useSelector((state) => state.appReducer)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCategoriesAction())
  }, [])

  return (
    <div className="font-main relative">
      {
        isShowModal && <Modal>{modalChildren}</Modal>
      }
      <Routes>
        <Route path={path.PUBLIC} element={<Public />} >
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.BLOGS} element={<Blogs />} />
          <Route path={path.PRODUCTS} element={<Products />} />
          <Route path={path.DETAIL_PRODUCT__CATEGORY__PID__TITLE} element={<DetailProduct />} />
          <Route path={path.FAQ} element={<FAQ />} />
          <Route path={path.OUR_SERVICES} element={<Services />} />
          <Route path={path.PRODUCTS} element={<Products />} />
        </Route>
        <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />
        <Route path={path.FINAL_REGISTER} element={<FinalRegister />} />
        <Route path={path.LOGIN} element={<Login />} />
      </Routes>
      {loadingCom === true ? <Loading /> : ''}
      <NotifySnackbar
        open={notifyEventCom.isOpen}
        onClosedListener={() => {
          dispatch(endAlertCom())
        }}
        notifyType={notifyEventCom.notifyType}
        content={notifyEventCom.notifyContent}
      />
    </div>
  )
}

export default App
