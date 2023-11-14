import { memo } from "react"

const ProductExtraInfo = (props) => {

  const {
    icon, sub, title
  } = props

  return (
    <div className="flex items-center p-3 gap-4 mb-[10px] border">
      <span className="p-2 bg-gray-700 rounded-full flex items-center text-white">{icon}</span>
      <div className="flex flex-col text-sm text-gray-500">
        <span className="font-medium">{title}</span>
        <span className="text-xs">{sub}</span>
      </div>
    </div>
  )
}

export default memo(ProductExtraInfo)