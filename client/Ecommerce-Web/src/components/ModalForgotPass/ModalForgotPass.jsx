import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { setIsForgotPass } from '~/reducers/appReducer';

const ModalForgotPass = (props) => {

  const {
    handleChangeEmailForgot,
    handleForgotPassword
  } = props

  const {
    stateSignUpAndSignIn
  } = useSelector(state => state.appReducer)

  const dispatch = useDispatch()

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50 animate-fadeIn duration-500">
      <div className="h-[300px] w-[500px] bg-white p-8 rounded-lg shadow-lg relative">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Forgot Password</h2>
          <button
            type="button"
            className="text-gray-600 hover:text-gray-800 focus:text-gray-800 focus:outline-none"
            onClick={() => dispatch(setIsForgotPass(false))}
          >
            <CloseOutlinedIcon />
          </button>
        </div>
        <label htmlFor="email" className="text-lg font-semibold text-gray-800">
          Enter your email:
        </label>
        <div className="flex items-center border-b border-gray-300 mb-12 mt-4">
          <input
            type="text"
            id="email"
            className="w-full px-4 py-2 border-0 outline-none placeholder-gray-400 text-gray-800"
            placeholder="e.g., email@gmail.com"
            value={stateSignUpAndSignIn.email}
            onChange={handleChangeEmailForgot}
          />
        </div>
        <button
          type="button"
          className="w-full px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:bg-purple-600 focus:outline-none"
          onClick={handleForgotPassword}
        >
          Submit
        </button>
      </div>
    </div>
  )
}

export default ModalForgotPass
