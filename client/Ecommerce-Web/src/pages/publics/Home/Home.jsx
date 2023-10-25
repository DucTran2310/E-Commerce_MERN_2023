import { useSelector } from "react-redux";
import { Banner, BestSeller, Sidebar } from "~/components";
import CustomSlider from "~/components/CustomSlider/CustomSlider";
import DealDaily from "~/components/DealDaily/DealDaily";
import FeatureProducts from "~/components/FeatureProducts/FeatureProducts";

const Home = () => {

  const {newProducts} = useSelector((state) => state.productReducer)

  return (
    <>
      <div className="w-main flex">
        <div className="flex flex-col gap-5 w-[25%] flex-auto">
          <Sidebar />
          <DealDaily />
        </div>
        <div className="flex flex-col gap-5 pl-5 w-[75%] flex-auto">
          <Banner />
          <BestSeller />
        </div>
      </div>
      <div className="my-8">
        <FeatureProducts />
      </div>
      <div className="my-8 w-full">
        <h3
          className="text-[20px] font-semibold py-[15px] border-b-2 border-main"
        >
          NEW ARRIVALS
        </h3>
        <div className="mt-4 mx-[-10px]">
          <CustomSlider 
            products={newProducts}
          />
        </div>
        <div className="my-8 w-full">
        <h3
          className="text-[20px] font-semibold py-[15px] border-b-2 border-main"
        >
          HOT COLLECTIONS
        </h3>
        </div>
      </div>
      <div className="w-full h-[500px]"></div>
    </>
  )
}

export default Home
