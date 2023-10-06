import { Banner, Sidebar } from "~/components"

const Home = () => {
  return (
    <div className="w-main">
      <div className="flex flex-col gap-5">
        <Sidebar />
        <span>Deal Daily</span>
      </div>
      <div className="flex flex-col gap-5 pl-5">
        <Banner />
        <span>Best seller</span>
      </div>
    </div>
  )
}

export default Home
