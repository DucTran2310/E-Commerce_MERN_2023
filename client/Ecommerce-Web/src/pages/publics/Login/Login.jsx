import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerAction } from '~/actions/userAction';
import img from '~/assets/images/bannerLogin.png';
import LoginComponent from '~/components/LoginComponent/LoginComponent';
import Register from '~/components/Register/Register';
import { resetStateSignUp, setEmail, setIsRegister } from '~/reducers/appReducer';
import { isValidEmail } from '~/utils/helpers';
import { useLocation } from 'react-router-dom'
import { apiForgotPassword } from '~/apis/user';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const Login = () => {

  const location = useLocation()

  const {
    stateSignUpAndSignIn
  } = useSelector(state => state.appReducer)

  const dispatch = useDispatch()

  const [showPassword, setShowPassword] = useState(false)
  const [isForgotPass, setIsForgotPass] = useState(false)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleChangeEmailForgot = (e) => {
    const data = {
      value: e.target.value,
      reason: ''
    }
    dispatch(setEmail(data))
  }

  const handleForgotPassword = async () => {
    const data = {
      email: stateSignUpAndSignIn.email
    }
    const response = await apiForgotPassword(data)
  }

  const handleSubmit = (() => {
    if (stateSignUpAndSignIn.isRegister === false) {
      if (isValidEmail(stateSignUpAndSignIn.email)) {
        const data = {
          email: stateSignUpAndSignIn.email,
          password: stateSignUpAndSignIn.password,
          firstName: stateSignUpAndSignIn.firstName,
          lastName: stateSignUpAndSignIn.lastName,
          mobile: stateSignUpAndSignIn.number
        }

        dispatch(registerAction(data))
      } else {
        dispatch(setEmail({ value: stateSignUpAndSignIn.email, reason: 'Email không đúng định dạng' }))
      }
    } else {
      dispatch(setIsRegister(false))
      dispatch(resetStateSignUp())
    }
  })

  return (
    <>
      <div className="min-h-screen py-40 bg-gradient-to-r from-purple-500 to-pink-300 relative">
        {isForgotPass && (
          <div className="fixed top-0 left-0 bottom-0 right-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50 animate-fadeIn duration-500">
            <div className="h-[300px] w-[500px] bg-white p-8 rounded-lg shadow-lg relative">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">Forgot Password</h2>
                <button
                  type="button"
                  className="text-gray-600 hover:text-gray-800 focus:text-gray-800 focus:outline-none"
                  onClick={() => setIsForgotPass(false)}
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
        )}
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row w-10/12 lg:w-full bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
            <div
              className={`w-full lg:w-1/2 flex flex-col items-center justify-center 
            p-12 bg-cover transition-transform duration-500 ease-in-out z-10
            ${stateSignUpAndSignIn.isRegister ? 'transform translate-x-full' : ''}`
              }
              style={{ backgroundImage: `url(${img})` }}
            >
              <h1 className="text-white text-3xl mb-3">Welcome</h1>
              <div>
                <p className="text-white">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean suspendisse aliquam varius rutrum purus
                  maecenas ac <a href="#" className="text-purple-500 font-semibold">Learn more</a>
                </p>
              </div>
            </div>
            <div className={`w-full lg:w-1/2 py-16 px-12 transition-transform duration-500 ease-in-out ${stateSignUpAndSignIn.isRegister ? '-translate-x-full' : ''}`}>
              {!stateSignUpAndSignIn.isRegister && (
                <Register
                  handleSubmit={handleSubmit}
                  showPassword={showPassword}
                  handleClickShowPassword={handleClickShowPassword}
                />
              )}
              {stateSignUpAndSignIn.isRegister && (
                <LoginComponent
                  handleSubmit={handleSubmit}
                  showPassword={showPassword}
                  setIsForgotPass={setIsForgotPass}
                  handleClickShowPassword={handleClickShowPassword}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login