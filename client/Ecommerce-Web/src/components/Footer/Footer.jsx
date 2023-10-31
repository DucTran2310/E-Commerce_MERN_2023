import { memo } from "react"
import { MdEmail } from "react-icons/md"

const Footer = () => {
  return (
    <div className="w-full">
      <div className="h-[103px] w-full bg-main flex items-center justify-center">
        <div className="w-main flex items-center justify-between">
          <div className="flex flex-col flex-1  ">
            <span className="text-[20px] text-gray-100">SIGN UP TO NEWSLETTER</span>
            <small className="text-[13px] text-gray-200">Subscribe now and receive weekly newsletter</small>
          </div>
          <div className="flex-1 flex items-center">
            <input 
              className="p-4 pr-0 rounded-l-full w-full bg-[#F04646] outline-none text-gray-100
              placeholder:text-sm placeholder:text-gray-200 placeholder:italic placeholder:opacity-50"
              type="text"
              placeholder="Email address"
            />
            <div className="h-[56px] w-[56px] bg-[#F04646] rounded-r-full flex items-center
              justify-center text-white
            ">
              <MdEmail size={18} />
            </div>
          </div>
        </div>
      </div>
      <div className="h-[407px] w-full bg-gray-800 flex items-center justify-center">
        <div className="w-main">copyright</div>
      </div>
    </div>
  )
}

export default memo(Footer)
