import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FaEnvelope, FaFacebook } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '~/actions/userAction';
import Input from '~/components/Input/Input';
import { setEmail, setPassword } from '~/reducers/appReducer';

const LoginComponent = (props) => {
  const {
    handleSubmit,
    showPassword,
    handleClickShowPassword
  } = props;

  const dispatch = useDispatch();

  const { stateSignUpAndSignIn } = useSelector(state => state.appReducer);

  const handleChangeEmail = (e) => {
    const data = {
      value: e.target.value,
      reason: ''
    }
    dispatch(setEmail(data))
  };

  const handleChangePassword = (e) => {
    dispatch(setPassword(e.target.value));
  };

  const handleLogin = () => {

    const data = {
      email: stateSignUpAndSignIn.email,
      password: stateSignUpAndSignIn.password
    }

    dispatch(loginAction(data))
  }

  const handleForgotPassword = () => {
    // Handle forgot password logic here
  };

  return (
    <div className="w-full py-16 px-12">
      <h2 className="text-3xl mb-4">Login</h2>
      <p className="mb-4">
        Log in to your account. It’s quick and secure.
      </p>
      <form action="#">
        <div className="mt-5">
          <Input
            type="text"
            value={stateSignUpAndSignIn.email}
            error={stateSignUpAndSignIn.errorEmail}
            errorReason={stateSignUpAndSignIn.errorReasonEmail !== '' ? stateSignUpAndSignIn.errorReasonEmail : 'Email không được để trống'}
            placeholder="Email"
            className="py-2 px-4 focus:outline-none w-full"
            variant="outlined"
            iconEnd={<FaEnvelope />}
            handleChange={handleChangeEmail}
          />
        </div>
        <div className="mt-5">
          <Input
            type={showPassword ? "text" : "password"}
            value={stateSignUpAndSignIn.password}
            error={stateSignUpAndSignIn.errorPassword}
            errorReason="Password không được để trống"
            placeholder="Password"
            className="py-2 px-4 focus:outline-none w-full"
            variant="outlined"
            handleClickShowPassword={handleClickShowPassword}
            iconEnd={showPassword ? <VisibilityOff /> : <Visibility />}
            handleChange={handleChangePassword}
          />
        </div>
        <div className="mt-5">
          <button
            onClick={handleLogin}
            className="w-full bg-purple-500 py-3 text-center text-white rounded-md">Login</button>
        </div>
        <div className="mt-5 flex items-center justify-center">
          <button className="flex items-center justify-center bg-blue-500 py-3 px-4 text-white rounded-md">
            <FaFacebook className="mr-2" />
            Login with Facebook
          </button>
          <button className="flex items-center justify-center ml-4 bg-red-500 py-3 px-4 text-white rounded-md">
            <FaEnvelope className="mr-2" />
            Login with Gmail
          </button>
        </div>
        <div className="mt-5 text-center">
          <a href="#" onClick={handleForgotPassword} className="text-purple-500 font-normal hover:underline">Forgot password?</a>
        </div>
        <div className="mt-5 text-center">
          <span>Dont have an account? </span>
          <a href="#" onClick={handleSubmit} className="text-purple-500 font-normal hover:underline">Create account</a>
        </div>
      </form>
    </div>
  );
};

export default LoginComponent;