import { useDispatch, useSelector } from 'react-redux';
import mailbox from '~/assets/images/mailbox.jpg';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { resetStateSignUp, setIsModalSendEmail } from '~/reducers/appReducer';

const ModalCheckEmail = () => {

  const dispatch = useDispatch()

  const {
    stateSignUpAndSignIn
  } = useSelector(state => state.appReducer);

  const handleCloseModal = () => {
    dispatch(setIsModalSendEmail(false))
    dispatch(resetStateSignUp())
  }

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50 animate-fadeIn duration-500">
      <div className="h-[300px] w-[500px] bg-white p-8 rounded-lg shadow-lg relative">
        <button onClick={handleCloseModal} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 cursor-pointer">
        <CloseOutlinedIcon />
        </button>
        <div className="flex items-center justify-center">
          <img src={mailbox} alt="mail-box" className="w-20 h-20 mr-4" />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Check Your Email</h2>
            <p>We have sent a password reset link to:</p>
            <p className="font-semibold text-blue-500">{stateSignUpAndSignIn.email}</p>
            <p className='mt-8'>If you don&apos;t receive the email soon, please check your spam folder or</p>
            <p>click <span className="text-blue-500 cursor-pointer" onClick={handleCloseModal }>here</span> to send the email again.</p>
            <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600">
              Back to Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCheckEmail;
