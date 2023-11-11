import { memo } from "react";
import Slider from "react-slick";
import ProductItem from "~/components/ProductItem/ProductItem";

const settings = {
  dots: false,
  infinite: true, // Đặt giá trị "true" để Slider di chuyển vô tận
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true, // Đặt giá trị "true" để Slider tự động di chuyển
  autoplaySpeed: 1500 // Đặt thời gian chờ giữa các lần di chuyển (tính bằng milliseconds)
};

const CustomSlider = ({ products, activedTab }) => {
  return (
    <>
      {
        products && <Slider {...settings} className="custom-slider">
          {products?.map((el, index) => (
            <ProductItem
              key={index}
              pid={el.id}
              productData={el}
              isNew={activedTab === 1 ? true : false}
            />
          ))}
        </Slider>
      }
    </>
  )
}

export default memo(CustomSlider)
