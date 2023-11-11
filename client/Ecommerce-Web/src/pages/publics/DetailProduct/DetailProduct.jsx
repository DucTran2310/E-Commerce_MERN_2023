import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Slider from "react-slick";
import { apiGetDetailProduct } from "~/apis/product";
import Breadcrumb from "~/components/Breadcrumb/Breadcrumb";
import ReactImageMagnify from "react-image-magnify";

const settings = {
  dots: false,
  infinite: true, // Đặt giá trị "true" để Slider di chuyển vô tận
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: false, // Đặt giá trị "true" để Slider tự động di chuyển
  //autoplaySpeed: 1500 // Đặt thời gian chờ giữa các lần di chuyển (tính bằng milliseconds)
};

const DetailProduct = () => {

  const { pid, title, category } = useParams()

  const [product, setProduct] = useState(null)

  const fetchProductData = async () => {
    const rs = await apiGetDetailProduct(pid)
    if (!rs.error) {
      setProduct(rs.object)
    }
  }

  useEffect(() => {
    if (pid) {
      fetchProductData()
    }
  }, [pid])

  return (
    <div className="w-full">
      <div className="h-[81px] flex justify-center items-center bg-gray-100">
        <div className="w-main">
          <h3>{title}</h3>
          <Breadcrumb title={title} category={category} />
        </div>
      </div>
      {
        product &&
        <div className="w-main m-auto mt-4 flex">
          <div className="flex flex-col gap-4 w-2/5">
            <div className="h-[458px] w-[458px] border">
              <ReactImageMagnify {...{
                smallImage: {
                  alt: 'Image original',
                  isFluidWidth: true,
                  src: product?.thumb
                },
                largeImage: {
                  src: product?.thumb,
                  width: 1800,
                  height: 1500
                }
              }}/>
            </div>
            <div className="w-[458px]">
              <Slider {...settings} className="image-slider">
                {
                  product?.images?.map((el, index) => (
                    <div key={index} className="flex w-full gap-2">
                      <img src={el} alt="sub-product" className="w-[143px] h-[143px] border object-cover" />
                    </div>
                  ))
                }
              </Slider>
            </div>
          </div>
          <div className="border border-red-300 w-2/5">
            price
          </div>
          <div className="border border-green-300 w-1/5">
            information
          </div>
        </div>
      }
      <div className="w-full h-[500px]"></div>
    </div>
  )
}

export default DetailProduct
