import { memo } from "react";
import Slider from "react-slick";
import brand_apple from '~/assets/images/brand_apple.png'
import brand_htc from '~/assets/images/brand_htc.png'
import brand_LG from '~/assets/images/brand_LG.png'
import brand_microsoft from '~/assets/images/brand_microsoft.png'
import brand_samsung from '~/assets/images/brand_samsung.png'
import brand_sony from '~/assets/images/brand_sony.png'
import brand_vivo from '~/assets/images/brand_vivo.png'
import styles from './SliderBrand.module.css'

// Component tùy chỉnh cho button "Next"
const Custom_Next_Arrow = (props) => {
  const { style, onClick } = props;
  return (
    <button
      className={styles['custom-next-arrow']}
      style={{ ...style }}
      onClick={onClick}
    />
  );
};

// Component tùy chỉnh cho button "Prev"
const Custom_Prev_Arrow = (props) => {
  const { style, onClick } = props;
  return (
    <button
      className={styles['custom-prev-arrow']}
      style={{ ...style }}
      onClick={onClick}
    />
  );
};

const settings = {
  dots: false,
  infinite: true, // Đặt giá trị "true" để Slider di chuyển vô tận
  speed: 1000,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true, // Đặt giá trị "true" để Slider tự động di chuyển
  autoplaySpeed: 2000, // Đặt thời gian chờ giữa các lần di chuyển (tính bằng milliseconds)
  nextArrow: <Custom_Next_Arrow />,
  prevArrow: <Custom_Prev_Arrow />,
};

const listBrands = [
  brand_apple,
  brand_htc,
  brand_LG,
  brand_microsoft,
  brand_samsung,
  brand_sony,
  brand_vivo
]

const SliderBrand = () => {
  return (
    <div className="w-main">
      {
        listBrands && <Slider {...settings} className={styles['slick-slider']}>
          {listBrands?.map((el, index) => (
            <div key={index} className="w-full text-base px-[10px]">
              <img alt="" src={el} />
            </div>
          ))}
        </Slider>
      }
    </div>
  )
}

export default memo(SliderBrand)