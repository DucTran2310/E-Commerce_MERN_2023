import { Visibility, VisibilityOff } from "@mui/icons-material";
import DoneIcon from '@mui/icons-material/Done';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { resetPasswordAction } from "~/actions/userAction";
import Input from "~/components/Input/Input";
import { setPassword, setPasswordConfirm } from "~/reducers/appReducer";

const ResetPassword = () => {
  const { stateSignUpAndSignIn } = useSelector(state => state.appReducer);
  const dispatch = useDispatch();
  const {token} = useParams()

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [isInit, setIsInit] = useState(true);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowPasswordConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  const handleChangePassword = (e) => {
    dispatch(setPassword(e.target.value));
  };

  const handleChangePasswordConfirm = (e) => {
    setIsInit(false);
    dispatch(setPasswordConfirm(e.target.value));
  };

  const handleResetPass = async () => {
    const data = {
      password: stateSignUpAndSignIn.password,
      token: token
    }

    dispatch(resetPasswordAction(data))
  }

  const isPasswordMatching = stateSignUpAndSignIn.password === stateSignUpAndSignIn.passwordConfirm;

  return (
    <div className="absolute animate-fadeIn top-0 right-0 bottom-0 left-0 bg-gray-100 flex flex-col items-center py-8 z-50">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Reset Password</h2>
        <p className="text-gray-600 text-center mb-4">Enter a new password below to change your password</p>
        <div className="mt-4">
          <label htmlFor="password" className="text-gray-800 mb-2 block">New password:</label>
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            value={stateSignUpAndSignIn.password}
            error={stateSignUpAndSignIn.errorPassword}
            errorReason={stateSignUpAndSignIn.errorPassword ? 'Password không được để trống' : ''}
            placeholder="Password"
            className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
            variant="outlined"
            handleClickShowPassword={handleClickShowPassword}
            iconEnd={showPassword ? <VisibilityOff /> : <Visibility />}
            handleChange={handleChangePassword}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="confirmPassword" className="text-gray-800 mb-2 block">Confirm password:</label>
          <Input
            id="confirmPassword"
            type={showPasswordConfirm ? "text" : "password"}
            value={stateSignUpAndSignIn.passwordConfirm}
            error={stateSignUpAndSignIn.errorPasswordConfirm || !isPasswordMatching}
            errorReason={stateSignUpAndSignIn.errorPasswordConfirm ? 'Password không được để trống' : !isPasswordMatching ? 'Passwords không khớp' : ''}
            placeholder="Confirm Password"
            className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
            variant="outlined"
            handleClickShowPassword={handleClickShowPasswordConfirm}
            iconEnd={isInit ? '' : (isPasswordMatching ? <DoneIcon className="text-green-500" /> : '')}
            handleChange={handleChangePasswordConfirm}
          />
        </div>
        <button 
        onClick={handleResetPass}
        className="bg-blue-500 text-white px-4 py-2 mt-8 rounded hover:bg-blue-600 w-full"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
