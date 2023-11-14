import { memo } from "react"

const SelectQuantity = (props) => {

  const {
    quantity,
    handleQuantity,
    handleChangeQuantity
  } = props

  return (
    <div className="flex items-center">
      <span
        onClick={() => handleChangeQuantity('minus')}
        className="p-2 cursor-pointer border-r border-black bg-[#f7f7f6]">
        -
      </span>
      <input
        type="text"
        className="py-2 outline-none w-[30px] text-center text-black bg-[#f7f7f6]"
        value={quantity}
        onChange={(e) => handleQuantity(e.target.value)}
      />
      <span
        onClick={() => handleChangeQuantity('plus')}
        className="p-2 cursor-pointer border-l border-black bg-[#f7f7f6]"
      >
        +
      </span>
    </div>
  )
}

export default memo(SelectQuantity)