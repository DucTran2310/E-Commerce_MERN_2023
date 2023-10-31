import { memo } from "react"
import { AiFillLinkedin, AiOutlineTwitter } from "react-icons/ai"
import { BiLogoFacebook, BiLogoFlickrSquare, BiLogoGooglePlus } from "react-icons/bi"
import { BsPinterest, BsTelephoneFill } from "react-icons/bs"
import { IoMail } from "react-icons/io5"
import { MdEmail, MdLocationPin } from "react-icons/md"

const Footer = () => {
  const socialMediaIcons = [
    { icon: <BiLogoFacebook />, href: "#" },
    { icon: <AiOutlineTwitter />, href: "#" },
    { icon: <BsPinterest />, href: "#" },
    { icon: <BiLogoGooglePlus />, href: "#" },
    { icon: <AiFillLinkedin />, href: "#" },
    { icon: <BiLogoFlickrSquare />, href: "#" },
  ];

  const informationLinks = [
    "Typography",
    "Gallery",
    "Store Location",
    "Today's Deals",
    "Contact",
  ];

  const whoWeAreLinks = [
    "Help",
    "Free Shipping",
    "FAQs",
    "Return & Exchange",
    "Testimonials",
  ];

  const listProductTags = [
    "10-20",
    "100-200",
    "20-50",
    "200-300",
    "300-400",
    "400-500",
    "50-100",
    "500-600",
    "600-700",
    "700-800",
    "800-900",
    "900-1000",
    "Accessories",
    "Acer"
  ]

  return (
    <div className="w-full">
      <div className="h-[103px] w-full bg-main flex items-center justify-center">
        <div className="w-main flex items-center justify-between">
          <div className="flex flex-col flex-1">
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
      <div className="h-[407px] w-full bg-gray-900 flex flex-col items-center justify-center gap-10 text-white text-[13px]">
        <div className="w-main flex items-start">
          <div className="flex-2 flex flex-col gap-[10px]">
            <h3 className="mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]">ABOUT US</h3>
            <span className="flex items-center gap-2 ">
              <MdLocationPin />
              <span>Address: </span>
              <span className="opacity-70">474 Ontario St Toronto, ON M4X 1M7 Canada</span>
            </span>
            <span className="flex items-center gap-2 ">
              <BsTelephoneFill />
              <span>Phone: </span>
              <span className="opacity-70">(+1234)56789xxx</span>
            </span>
            <span className="flex items-center gap-2 ">
              <IoMail />
              <span>Mail: </span>
              <span className="opacity-70">tadathemes@gmail.com</span>
            </span>
            <div className="flex items-center">
              {socialMediaIcons.map((icon, index) => (
                <a key={index} href={icon.href} className="flex items-center justify-center w-9 h-9 text-white rounded-md bg-[#323232] text-lg mr-3">
                  {icon.icon}
                </a>
              ))}
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-2 mb-[10px]">
            <h3 className="mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]">INFORMATION</h3>
            {informationLinks.map((link, index) => (
              <span key={index} className="opacity-70 cursor-pointer hover:opacity-100">{link}</span>
            ))}
          </div>
          <div className="flex-1 flex flex-col gap-2 mb-[10px]">
            <h3 className="mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]">WHO WE ARE</h3>
            {whoWeAreLinks.map((link, index) => (
              <span key={index} className="opacity-70 cursor-pointer hover:opacity-100">{link}</span>
            ))}
          </div>
          <div className="flex-1">
            <h3 className="mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]">#ADSTAR_TRAN</h3>
          </div>
        </div>
        <div className="w-main flex flex-col items-start">
          <h3 className="mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]">PRODUCT TAGS</h3>
          <ul className="w-main flex flex-wrap items-center gap-2">
            {listProductTags.map((tag, index) => (
              <li
                key={index}
                className={`opacity-70 cursor-pointer ${index === 0 ? '' : 'pl-4 ml-3 border-l border-gray-400'}`}
              >
                <span className="opacity-70 hover:opacity-100">{tag}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default memo(Footer)
