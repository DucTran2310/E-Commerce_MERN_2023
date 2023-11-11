import { Outlet } from "react-router-dom"
import { Header, Navigation } from "~/components"
import Footer from "~/components/Footer/Footer"
import TopHeader from "~/components/TopHeader/TopHeader"

const Public = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <TopHeader />
      <Header />
      <Navigation />
      <div className="w-full flex flex-col items-center">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Public
