import { useEffect, useState } from "react"
import { apiGetProducts } from "~/apis/product"
import bannerDELL from '~/assets/banner-laptop-dell.png'
import bannerMAC from '~/assets/banner2.png'
import CustomSlider from "../CustomSlider/CustomSlider";
import { useDispatch, useSelector } from "react-redux";
import { getNewProductsAction } from "~/actions/productAction";


const tabs = [
  { id: 1, name: 'best seller' },
  { id: 2, name: 'new arrivals' }
]

const BestSeller = () => {

  const dispatch = useDispatch()
  const {newProducts} = useSelector((state) => state.productReducer)

  const [bestSellers, setBestSellers] = useState(null)
  const [activedTab, setActivedTab] = useState(1)
  const [products, setProducts] = useState(null)

  const fetchProducts = async () => {
    const response = await Promise.all([apiGetProducts({ sort: '-sold' })])
    if (response[0]?.success) {
      setBestSellers(response[0].object)
      setProducts(response[0].object)
    }
  }

  useEffect(() => {
    fetchProducts()
    dispatch(getNewProductsAction())
  }, [])

  useEffect(() => {
    if(activedTab === 1) setProducts(bestSellers)
    if(activedTab === 2) setProducts(newProducts)
  }, [activedTab])

  return (
    <div>
      <div className="flex text-[20px] ml-[-32px]">
        {
          tabs.map(el => (
            <span
              key={el.id}
              className={`
                font-semibold uppercase px-8 border-r 
                cursor-pointer
                ${activedTab === el.id ? 'text-black' : 'text-gray-400'}
              `}
              onClick={() => setActivedTab(el.id)}
            >
              {el.name}
            </span>
          ))
        }
      </div>
      <div className="mt-4 border-t-2 border-main pt-4">
        {/* content */}
        <CustomSlider
          products={products}
          activedTab={activedTab}
        />
      </div>
      <div className="w-full flex gap-4 mt-4">
        <img 
          src={bannerDELL}
          alt="banner"
          className="flex-1 object-contain"
        />
        <img 
          src={bannerMAC}
          alt="banner"
          className="flex-1 object-contain"
        />
      </div>
    </div>
  )
}

export default BestSeller
