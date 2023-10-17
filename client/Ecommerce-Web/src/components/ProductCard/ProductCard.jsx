import { formatMoney } from "~/utils/helpers"
import ProductRating from "../ProductRating/ProductRating"

const ProductCard = (props) => {

  const {
    image,
    title,
    totalRatings,
    price
  } = props

  return (
    <div className="w-1/3 flex-auto px-[10px] mb-[20px]">
      <div className="flex w-full border">
        <img
          src={image}
          alt="product"
          className="w-[120px] object-contain p-4"
        />
        <div className="flex flex-col mt-[15px] items-start gap-1 w-full text-xs">
          <span className="line-clamp-1 capitalize text-sm">{title?.toLowerCase()}</span>
          <span><ProductRating rating={totalRatings} size={'small'} /></span>
          <span>{`${formatMoney(price)} VND`}</span>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
