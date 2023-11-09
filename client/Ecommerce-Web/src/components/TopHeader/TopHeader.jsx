import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getCurrentUserAction } from "~/actions/userAction"
import path from "~/utils/path"
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { logOutUser } from "~/reducers/appReducer"

const TopHeader = () => {

  const dispatch = useDispatch()

  const { isLoggedIn, current } = useSelector(state => state.appReducer)

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getCurrentUserAction({}))
    }
  }, [dispatch, isLoggedIn])

  const handleLogout = () => {
    dispatch(logOutUser())
  }

  return (
    <div className="h-[38px] w-full bg-main flex items-center justify-center">
      <div className="w-main flex items-center justify-between text-xs text-gray-800">
        <span>ORDER ONLINE OR CALL US (+1800) 000 8808</span>
        {
          isLoggedIn ?
            <small>
              {`Welcome, ${current?.lastName} ${current?.firstName}`}
              <ExitToAppOutlinedIcon
                small
                className="cursor-pointer text-black hover:text-purple-500 font-normal"
                onClick={handleLogout}
              />
            </small>
            : <Link className="hover:text-white" to={`/${path.LOGIN}`}>Sign In or Create Account</Link>
        }
      </div>
    </div>
  )
}

export default TopHeader
