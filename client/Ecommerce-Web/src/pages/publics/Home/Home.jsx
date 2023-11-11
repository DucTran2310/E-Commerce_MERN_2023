import { useSelector } from "react-redux";
import { Banner, BestSeller, Sidebar } from "~/components";
import CustomSlider from "~/components/CustomSlider/CustomSlider";
import DealDaily from "~/components/DealDaily/DealDaily";
import FeatureProducts from "~/components/FeatureProducts/FeatureProducts";
import { AiOutlineRight } from "react-icons/ai"
import SliderBrand from "~/components/SliderBrand/SliderBrand";

const Home = () => {

  const { newProducts } = useSelector((state) => state.productReducer)
  const { categories } = useSelector((state) => state.appReducer)

  return (
    <>
      <div className="w-main flex mt-6">
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
          <div className="flex flex-wrap gap-4 mt-4">
            {categories?.map(el => (
              <div
                key={el._id}
                className="w-[396px]"
              >
                <div className="border flex p-4 gap-4 min-h-[202px]">
                  <img src={el?.image} alt="" className="w-[144px] flex-1 h-[129px] object-cover" />
                  <div className="flex-1 text-gray-700">
                    <h4 className="font-semibold uppercase">{el.title}</h4>
                    <ul className="text-sm">
                      {
                        el?.brand?.map(item => (
                          <span className="flex gap-1 items-center text-gray-500" key={item}>
                            <AiOutlineRight size={14} />
                            <li key={item}>{item}</li>
                          </span>
                        ))
                      }
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="my-8 w-full">
          <h3
            className="text-[20px] font-semibold py-[15px] border-b-2 border-main"
          >
            BLOG POSTS
          </h3>
        </div>
        <SliderBrand />
      </div>
    </>
  )
}

export default Home
