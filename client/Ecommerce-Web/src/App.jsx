import { Home, Login, Public } from "@pages/publics"
import path from "@utils/path"
import { Route, Routes } from "react-router-dom"
import Blogs from "./pages/publics/Blogs/Blogs"
import DetailProduct from "./pages/publics/DetailProduct/DetailProduct"
import FAQ from "./pages/publics/FAQ/FAQ"
import Services from "./pages/publics/Services/Services"
import Products from "./pages/publics/Products/Products"

function App() {

  return (
    <div className="min-h-screen font-main">
      <Routes>
        <Route path={path.PUBLIC} element={<Public />} >
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.BLOGS} element={<Blogs />} />
          <Route path={path.PRODUCTS} element={<Products />} />
          <Route path={path.DETAIL_PRODUCT__PID__TITLE} element={<DetailProduct />} />
          <Route path={path.FAQ} element={<FAQ />} />
          <Route path={path.OUR_SERVICES} element={<Services />} />
        </Route>
        <Route path={path.LOGIN} element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
