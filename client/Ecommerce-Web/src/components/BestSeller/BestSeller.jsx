import { useEffect, useState } from "react"
import { apiGetProducts } from "~/apis/product"
import Slider from "react-slick"
import ProductItem from "../ProductItem/ProductItem";
import bannerDELL from '~/assets/banner-laptop-dell.png'
import bannerMAC from '~/assets/banner2.png'


const tabs = [
  { id: 1, name: 'best seller' },
  { id: 2, name: 'new arrivals' }
]

const settings = {
  dots: false,
  infinite: true, // Đặt giá trị "true" để Slider di chuyển vô tận
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true, // Đặt giá trị "true" để Slider tự động di chuyển
  autoplaySpeed: 1500 // Đặt thời gian chờ giữa các lần di chuyển (tính bằng milliseconds)
};

const BestSeller = () => {

  const [bestSellers, setBestSellers] = useState(null)
  const [newProducts, setNewProducts] = useState(null)
  const [activedTab, setActivedTab] = useState(1)
  const [products, setProducts] = useState(null)

  const fetchProducts = async () => {
    const response = await Promise.all([apiGetProducts({ sort: '-sold' }), apiGetProducts({ sort: '-createdAt' })])
    if (response[0]?.success) {
      setBestSellers(response[0].object)
      setProducts(response[0].object)
    }
    if (response[1]?.success) setNewProducts(response[1].object)
    setProducts(response[0].object)
  }

  useEffect(() => {
    fetchProducts()
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
                font-semibold capitalize px-8 border-r 
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
        <Slider {...settings}>
          {products?.map((el, index) => (
            <ProductItem 
              key={index}
              pid={el.id}
              productData={el}
              isNew={activedTab === 1 ? true : false}
            />
          ))}
        </Slider>
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
