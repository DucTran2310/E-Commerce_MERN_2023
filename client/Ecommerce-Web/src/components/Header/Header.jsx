import logo from '@assets/images/logo.png'
import { Link } from 'react-router-dom'
import icons from '~/utils/icons'
import path from '~/utils/path'

const { BsFillTelephoneFill, MdEmail, BsHandbagFill, FaUserCircle } = icons

const Header = () => {
  return (
    <div className="w-main flex justify-between h-[110px] py-[35px]">
      <Link to={`/${path.HOME}`}>
        <img src={logo} alt='logo' className='w-[234px] object-contain' />
      </Link>
      <div className='flex text-[13px]'>
        <div className='flex flex-col items-center px-6 border-r'>
          <span className='flex gap-4 items-center'>
            <BsFillTelephoneFill color='red' />
            <span className='font-semibold'>0961355136</span>
          </span>
          <span>Mon-Sat 9:00AM - 8:00PM</span>
        </div>
        <div className='flex flex-col items-center px-6 border-r'>
          <span className='flex gap-4 items-center'>
            <MdEmail color='red' />
            <span className='font-semibold uppercase'>support@tadathemes.com</span>
          </span>
          <span>Online Support 24/7</span>
        </div>
        <div className='flex items-center justify-center gap-2 px-6 border-r'>
          <BsHandbagFill color='red' />
          <span>0 item(s)</span>
        </div>
        <div className='flex items-center justify-center px-6'>
          <FaUserCircle size={24} />
        </div>
      </div>
    </div>
  )
}

export default Header