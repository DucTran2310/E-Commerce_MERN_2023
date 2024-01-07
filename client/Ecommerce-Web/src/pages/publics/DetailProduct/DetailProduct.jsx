import { Button } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import ReactImageMagnify from "react-image-magnify";
import { useParams } from "react-router";
import Slider from "react-slick";
import { apiGetDetailProduct, apiGetProducts } from "~/apis/product";
import { ProductRating } from "~/components";
import Breadcrumb from "~/components/Breadcrumb/Breadcrumb";
import ProductExtraInfoItem from "~/components/ProductExtraInfoItem/ProductExtraInfoItem";
import SelectQuantity from "~/components/SelectQuantity/SelectQuantity";
import { formatMoney } from "~/utils/helpers";
import { FaShieldAlt, FaTruck } from "react-icons/fa";
import { AiFillGift } from "react-icons/ai";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { BsFillTelephoneInboundFill } from "react-icons/bs";
import ProductInformation from "~/components/ProductInformation/ProductInformation";
import CustomSlider from "~/components/CustomSlider/CustomSlider";

const settings = {
  dots: false,
  infinite: true, // Đặt giá trị "true" để Slider di chuyển vô tận
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: false, // Đặt giá trị "true" để Slider tự động di chuyển
  //autoplaySpeed: 1500 // Đặt thời gian chờ giữa các lần di chuyển (tính bằng milliseconds)
};

const productExtraInformation = [
  {
    id: 1,
    title: 'Guarantee',
    sub: 'Quality Checked',
    icon: <FaShieldAlt />
  },
  {
    id: 2,
    title: 'Free Shipping',
    sub: 'Free On All Products',
    icon: <FaTruck />
  },
  {
    id: 3,
    title: 'Special Gift Cards',
    sub: 'Special Gift Cards',
    icon: <AiFillGift />
  },
  {
    id: 4,
    title: 'Free Return',
    sub: 'Within 7 Days',
    icon: <IoReturnUpBackOutline />
  },
  {
    id: 5,
    title: 'Consultancy',
    sub: 'Lifetime 24/7/356',
    icon: <BsFillTelephoneInboundFill />
  }
]

const DetailProduct = () => {

  const { pid, title, category } = useParams()

  const [currentImage, setCurrentImage] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [product, setProduct] = useState(null)
  const [productRelated, setProductRelated] = useState(null)

  const fetchProductData = async () => {
    const rs = await apiGetDetailProduct(pid)
    if (!rs.error) {
      setProduct(rs.object)
      setCurrentImage(rs.object?.thumb)
    }
  }

  const fetchProducts = async () => {
    const rs = await apiGetProducts({ category })
    if (!rs.error) {
      setProductRelated(rs.object)
    }
  }

  useEffect(() => {
    if (pid) {
      fetchProductData()
      fetchProducts()
    }
    window.scrollTo(0,0)
  }, [pid])

  const handleQuantity = useCallback((number) => {
    if (!Number(number) || Number(number) < 1) {
      return
    } else {
      setQuantity(number)
    }
  }, [quantity])

  const handleChangeQuantity = useCallback((flag) => {
    if (flag === 'minus' && quantity > 1) {
      setQuantity(prev => +prev - 1);
    }
    if (flag === 'plus') {
      setQuantity(prev => +prev + 1);
    }
  }, [quantity])

  const handleClickImage = (imageThumb) => {
    setCurrentImage(imageThumb)
  }

  return (
    <div className="w-full">
      <div className="h-[81px] flex justify-center items-center bg-gray-100">
        <div className="w-main">
          <h3 className="font-semibold">{title}</h3>
          <Breadcrumb title={title} category={category} />
        </div>
      </div>
      {
        product &&
        <div className="w-main m-auto mt-4 flex">
          <div className="flex flex-col gap-4 w-2/5">
            <div className="h-[458px] w-[458px] border overflow-hidden">
              <ReactImageMagnify {...{
                smallImage: {
                  alt: 'Image original',
                  isFluidWidth: true,
                  src: currentImage
                },
                largeImage: {
                  src: currentImage,
                  width: 1800,
                  height: 1500
                }
              }} />
            </div>
            <div className="w-[458px]">
              <Slider {...settings} className="image-slider flex gap-2 justify-between">
                {
                  product?.images?.map((el, index) => (
                    <div key={index} className="flex-1">
                      <img onClick={() => handleClickImage(el)} src={el} alt="sub-product"
                        className="w-[143px] h-[143px] border object-cover cursor-pointer"
                      />
                    </div>
                  ))
                }
              </Slider>
            </div>
          </div>
          <div className="w-2/5 pr-[24px] flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-[30px] font-semibold">{`${formatMoney(product.price)} VND`}</h2>
              <span className="text-sm text-main">{`Kho: ${product?.quantity}`}</span>
            </div>
            <div className="flex items-center gap-1">
              <ProductRating rating={product?.totalRatings} size={'small'} />
              <span className="text-sm text-main italic">{`(Đã bán: ${product?.sold} cái)`}</span>
            </div>
            <ul className="list-item text-sm text-gray-500 pl-4">
              {
                product?.description?.map(el => (
                  <li key={el} className="leading-6 list-square">{el}</li>
                ))
              }
            </ul>
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-4">
                <span className="font-semibold">Quantity</span>
                <SelectQuantity quantity={quantity} handleQuantity={handleQuantity} handleChangeQuantity={handleChangeQuantity} />
              </div>
              <Button
                fullWidth
                variant="contained"
                style={{ backgroundColor: '#ee3131' }}
              >
                Add to cart
              </Button>
            </div>
          </div>
          <div className="w-1/5">
            {
              productExtraInformation?.map(el => (
                <ProductExtraInfoItem key={el.id} sub={el.sub} title={el.title} icon={el.icon} />
              ))
            }
          </div>
        </div>
      }
      <div className="w-main m-auto mt-8">
        <ProductInformation totalRatings={product?.totalRatings} totalCount={18} nameProduct={product?.title}/>
      </div>
      <div className="w-main m-auto mt-8">
        <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">OTHER CUSTOMER ALSO LIKE</h3>
        <CustomSlider
          products={productRelated}
        />
      </div>
      <div className="w-full h-[500px]"></div>
    </div>
  )

}

export default DetailProduct
