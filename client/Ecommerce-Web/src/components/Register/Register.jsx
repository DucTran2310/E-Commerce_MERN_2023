import { Visibility, VisibilityOff } from "@mui/icons-material";
import DoneIcon from '@mui/icons-material/Done';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import { useEffect, useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setEmail, setFirstName, setLastName, setNumber, setPassword, setPasswordConfirm } from "~/reducers/appReducer";
import Input from "../Input/Input";
import { isValidNumberInput } from "~/utils/helpers";

const Register = (props) => {

  const {
    handleSubmit,
    showPassword,
    handleClickShowPassword
  } = props

  const {
    stateSignUpAndSignIn
  } = useSelector(state => state.appReducer)

  const dispatch = useDispatch()

  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)
  const [initState, setInitState] = useState(false)

  useEffect(() => {
    setInitState(true)
  }, [])

  const handleChangeFirstName = (e) => {
    dispatch(setFirstName(e.target.value))
  }

  const handleChangeLastName = (e) => {
    dispatch(setLastName(e.target.value))
  }

  const handleChangeEmail = (e) => {
    const data = {
      value: e.target.value,
      reason: ''
    }
    dispatch(setEmail(data))
  }

  const handleChangeNumber = (e) => {
    const inputValue = e.target.value;

    if (isValidNumberInput(inputValue)) {
      dispatch(setNumber(inputValue))
    }
  }

  const handleChangePassword = (e) => {
    dispatch(setPassword(e.target.value))
  }

  const handleChangePasswordConfirm = (e) => {
    setInitState(false)
    dispatch(setPasswordConfirm(e.target.value))
  }

  const handleClickShowPasswordConfirm = () => {
    setShowPasswordConfirm(!stateSignUpAndSignIn.passwordConfirm)
  }

  return (
    <div className="w-full py-16 px-12">
      <h2 className="text-3xl mb-4">Register</h2>
      <p className="mb-4">
        Create your account. Its free and only takes a minute.
      </p>
      <form action="#">
        <div className="grid grid-cols-2 gap-5">
          <div>
            <Input
              type={"text"}
              value={stateSignUpAndSignIn.firstName}
              error={stateSignUpAndSignIn.errorFirstName}
              errorReason={'First Name không được để trống'}
              placeholder="First Name"
              className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
              variant={'outlined'}
              handleChange={handleChangeFirstName}
            />
          </div>
          <div>
            <Input
              type={"text"}
              value={stateSignUpAndSignIn.lastName}
              error={stateSignUpAndSignIn.errorLastName}
              errorReason={'Last Name không được để trống'}
              placeholder="Last Name"
              className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
              variant={'outlined'}
              handleChange={handleChangeLastName}
            />
          </div>
        </div>
        <div className="mt-5">
          <Input
            type={"text"}
            value={stateSignUpAndSignIn.email}
            error={stateSignUpAndSignIn.errorEmail}
            errorReason={stateSignUpAndSignIn.errorReasonEmail !== '' ? stateSignUpAndSignIn.errorReasonEmail : 'Email không được để trống'}
            placeholder="Email"
            className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
            variant={'outlined'}
            iconEnd={<FaEnvelope />}
            handleChange={handleChangeEmail}
          />
        </div>
        <div className="mt-5">
          <Input
            type={"text"}
            value={stateSignUpAndSignIn.number}
            error={stateSignUpAndSignIn.errorNumber}
            errorReason={'Phone number không được để trống'}
            placeholder="Phone number"
            className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
            variant={'outlined'}
            iconEnd={<PhoneEnabledIcon />}
            handleChange={handleChangeNumber}
          />
        </div>
        <div className="mt-5">
          <Input
            type={showPassword ? "text" : "password"}
            value={stateSignUpAndSignIn.password}
            error={stateSignUpAndSignIn.errorPassword}
            errorReason={'Password không được để trống'}
            placeholder="Password"
            className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
            variant={'outlined'}
            handleClickShowPassword={handleClickShowPassword}
            iconEnd={showPassword ? <VisibilityOff /> : <Visibility />}
            handleChange={handleChangePassword}
          />
        </div>
        <div className="mt-5">
          <Input
            type={showPasswordConfirm ? "text" : "password"}
            value={stateSignUpAndSignIn.passwordConfirm}
            error={stateSignUpAndSignIn.errorPasswordConfirm}
            errorReason={stateSignUpAndSignIn.passwordConfirm === '' ? 'Password không được để trống' : stateSignUpAndSignIn.passwordConfirm !== stateSignUpAndSignIn.password ? 'Không trùng password' : ''}
            placeholder="Password"
            className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
            variant={'outlined'}
            handleClickShowPassword={handleClickShowPasswordConfirm}
            iconEnd={initState ? <Visibility /> :
              stateSignUpAndSignIn.passwordConfirm === stateSignUpAndSignIn.password ? <DoneIcon className="text-green-500" /> :
                showPasswordConfirm ? <VisibilityOff /> : <Visibility />
            }
            handleChange={handleChangePasswordConfirm}
          />
        </div>
        <div className="mt-5">
          <button
            onClick={handleSubmit}
            className="w-full bg-purple-500 py-3 text-center text-white rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Register Now
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register