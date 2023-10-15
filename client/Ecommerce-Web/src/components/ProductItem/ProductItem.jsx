import { AiFillHeart } from "react-icons/ai"
import { BiMenu } from "react-icons/bi"
import { BsEyeFill } from "react-icons/bs"
import { formatMoney } from "~/utils/helpers"
import ProductLabel from "../ProductLabel/ProductLabel"
import ProductRating from "../ProductRating/ProductRating"
import SelectOption from "../SelectOption/SelectOption"
import { useState } from "react"

const ProductItem = (props) => {

  // new, trending, deal, best
  // giá giảm: deal
  // totalRatings = 5: best
  // createdAt mới nhất là new
  // 

  const { productData, isNew } = props

  const [isShowOption, setIsShowOption] = useState(false)

  return (
    <div className="w-full text-base px-[10px]">
      <div
        className="w-full border p-[15px] flex flex-col items-center relative"
        onMouseEnter={
          e => {
            e.stopPropagation()
            setIsShowOption(true)
          }
        }
        onMouseLeave={
          e => {
            e.stopPropagation()
            setIsShowOption(false)
          }
        }
      >
        <div className="w-full relative">
          <ProductLabel isNew={isNew} />
          {
            isShowOption &&
            <div
              className="absolute bottom-[-10px] left-0 right-0 flex justify-center gap-2 animate-slide-top"
            >
              <SelectOption icon={<AiFillHeart />} />
              <SelectOption icon={<BiMenu />} />
              <SelectOption icon={<BsEyeFill />} />
            </div>
          }
          <img
            src={productData?.thumb || ''}
            alt=""
            className="w-[247px] h-[247px] object-cover"
          />
        </div>
        <div className="flex flex-col items-start w-full gap-1 mt-[15px]">
          <span className="line-clamp-1 text-transform capitalize">{productData?.title}</span>
          <span><ProductRating rating={productData?.totalRatings} /></span>
          <span>{`${formatMoney(productData?.price)} VND`}</span>
        </div>
      </div>
    </div>
  )
}

export default ProductItem