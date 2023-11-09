import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPasswordAction, registerAction } from '~/actions/userAction';
import img from '~/assets/images/bannerLogin.png';
import LoginComponent from '~/components/LoginComponent/LoginComponent';
import ModalCheckEmail from '~/components/ModalCheckEmail/ModalCheckEmail';
import ModalForgotPass from '~/components/ModalForgotPass/ModalForgotPass';
import Register from '~/components/Register/Register';
import { resetStateSignUp, setEmail, setIsRegister } from '~/reducers/appReducer';
import { isValidEmail } from '~/utils/helpers';

const Login = () => {

  const {
    stateSignUpAndSignIn,
    isForgotPass,
    isModalSendEmail
  } = useSelector(state => state.appReducer)

  const dispatch = useDispatch()

  const [showPassword, setShowPassword] = useState(false)

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
    dispatch(forgotPasswordAction(data))
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
        {isForgotPass &&
          (
            <ModalForgotPass
              handleChangeEmailForgot={handleChangeEmailForgot}
              handleForgotPassword={handleForgotPassword}
            />
          )
        }
        {
          isModalSendEmail && <ModalCheckEmail />
        }
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